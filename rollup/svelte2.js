const { compile, preprocess } = require("svelte2");
const { createFilter } = require("rollup-pluginutils");

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

            const result = options.preprocess ?
                await preprocess(code, { ...options.preprocess, filename }) :
                await Promise.resolve({ toString : () => code });

            const { js } = compile(result.toString(), {
                onwarn : (warning) => this.warn(warning),
                
                ...defaults.options,
                ...(args.options || {}),
                
                filename,
            });

            return js;
        },
    };
};
