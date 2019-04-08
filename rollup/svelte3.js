const svelte = require("svelte3/compiler.js");
const { createFilter } = require("rollup-pluginutils");

const defaults = {
    include    : [ /\.svelte$/ ],
    exclude    : [ "**/node_modules/**" ],
    preprocess : [],
    options    : {
        format     : "esm",
        sveltePath : "svelte3"
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

            const { code : processed, dependencies } = await svelte.preprocess(code, options.preprocess, { filename });

            dependencies.forEach((dep) => this.addWatchFile(dep));

            const { js, warnings } = svelte.compile(processed, {
                ...options.options,
                
                filename,
            });

            warnings.forEach((warning) => this.warn(warning));

            return js;
        },
    };
};
