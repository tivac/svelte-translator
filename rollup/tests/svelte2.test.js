const { rollup } = require("rollup");

const svelte2 = require("../svelte2.js");

describe("svelte2 rollup plugin", () => {
    it("should compile svelte components", async () => {
        const bundle = await rollup({
            input : "svelte2.js",

            plugins : [
                require("rollup-plugin-hypothetical")({
                    cwd   : __dirname,
                    files : {
                        "./svelte2.js" : `
                            import component from "./specimens/component.html";

                            console.log(component);
                        `,
                    },

                    allowFallthrough : true,
                }),

                require("rollup-plugin-node-resolve")(),

                svelte2(),
            ],
        });

        const { output } = await bundle.generate({
            format : "es",
        });

        const [{ code }] = output;

        expect(code).toMatch("console.log(Component);");
    });

    it("should support preprocessors & dependency-tracking", async () => {
        const bundle = await rollup({
            input : "svelte2.js",

            plugins : [
                require("rollup-plugin-hypothetical")({
                    cwd   : __dirname,
                    files : {
                        "./svelte2.js" : `
                            import component from "./specimens/component.html";

                            console.log(component);
                        `,
                    },

                    allowFallthrough : true,
                }),

                require("rollup-plugin-node-resolve")(),

                svelte2({
                    preprocess : {
                        script({ content }) {
                            return {
                                code : content.replace("a mystery", 42),
                            };
                        },
                    },
                }),
            ],
        });

        const { output } = await bundle.generate({
            format : "es",
        });

        const [{ code }] = output;

        expect(code).toMatch(`answer : \"42\"`);
    });
});
