const svelte3 = require("svelte/compiler");

module.exports = {
    process(src, filename) {
        const { js : { code } } = svelte3.compile(
            src,
            {
                filename,
                format     : "cjs",
                sveltePath : "svelte",
            }
        );

        return code;
    },
};
