const { compile, preprocess } = require("svelte2");
const { createFilter } = require("rollup-pluginutils");

const sanitize = require("./sanitize.js");

const defaults = {
    include    : [ /\.html$/ ],
    exclude    : [ "**/node_modules/**" ],
    preprocess : false,
    options    : {
        format : "es",
    },
};

module.exports = (args = {}) => {
    const options = {
        ...defaults,
        ...args,
    };

    const filter = createFilter(options.include, options.exclude);

    return {
        name : "svelte-translator-rollup-svelte2",

        async transform(code, filename) {
            if(!filter(filename)) {
                return null;
            }

            const dependencies = new Set();
            
            let result;

            if(options.preprocess) {
                // Monkey-patch all potential preprocess tags (style, script, markup)
                // to capture any dependency info they might return
                const facade = Object.create(null);

                facade.filename = filename;

                Object.keys(options.preprocess).forEach((key) => {
                    facade[key] = async (...params) => {
                        const out = await options.preprocess[key](...params);

                        if(out.dependencies) {
                            out.dependencies.forEach((dep) => dependencies.add(dep));
                        }

                        return out;
                    };
                });

                result = await preprocess(code, facade);
            } else {
                result = await Promise.resolve({ toString : () => code });
            }

            const { js } = compile(result.toString(), {
                onwarn : (warning) => this.warn(warning),
                
                ...defaults.options,
                ...(args.options || {}),
                
                filename,
                name : sanitize(filename),
            });

            dependencies.forEach((dep) => this.addWatchFile(dep));

            return js;
        },
    };
};
