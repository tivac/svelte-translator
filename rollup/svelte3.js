const { compile, preprocess } = require("svelte/compiler.js");
const { createFilter } = require("rollup-pluginutils");

const sanitize = require("./sanitize.js");

const defaults = {
    include    : [ /\.svelte$/ ],
    exclude    : [ "**/node_modules/**" ],
    preprocess : [],
    options    : {
        format     : "esm",
        sveltePath : "svelte",
    },
};

module.exports = (args = {}) => {
    const options = {
        ...defaults,
        ...args,
    };

    const filter = createFilter(options.include, options.exclude);

    return {
        name : "svelte-translator-rollup-svelte3",

        async transform(code, filename) {
            if(!filter(filename)) {
                return null;
            }

            const { code : processed, dependencies } = await preprocess(code, options.preprocess, { filename });

            dependencies.forEach((dep) => this.addWatchFile(dep));

            const { js, warnings } = compile(processed, {
                ...defaults.options,
                ...(args.options || {}),

                filename,
                name : sanitize(filename),
            });

            warnings.forEach((warning) => this.warn(warning));

            return js;
        },
    };
};
