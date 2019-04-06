const svelte3 = require("svelte3/compiler.js");

module.exports = {
    process(src, filename) {
        const { js : { code } } = svelte3.compile(
            src,
            {
                filename,
                format     : "cjs",
                sveltePath : "svelte3"
            }
        );

        return code;
    },
};
