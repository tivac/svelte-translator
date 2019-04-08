const svelte = require("svelte2");
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

            // const { code : processed, dependencies } = await options.preprocess ?
            const result = options.preprocess ?
                await svelte.preprocess(code, options.preprocess, { filename }) :
                await Promise.resolve({ toString : () => code });

            const { js } = svelte.compile(result.toString(), {
                onwarn : (warning) => this.warn(warning),
                
                ...options.options,
                
                filename,
            });

            return js;
        },
    };
};
