const svelte2 = require("svelte2");

module.exports = {
    process(src, filename) {
        const { js : { code } } = svelte2.compile(
            src,
            {
                filename,
                format : "cjs",
            }
        );

        return code;
    },
};
