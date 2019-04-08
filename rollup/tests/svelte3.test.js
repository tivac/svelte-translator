const { rollup } = require("rollup");

const svelte3 = require("../svelte3.js");

describe("svelte3 rollup plugin", () => {
    it("should compile svelte components", async () => {
        const bundle = await rollup({
            input : "svelte3.js",

            plugins : [
                require("rollup-plugin-hypothetical")({
                    cwd   : __dirname,
                    files : {
                        "./svelte3.js" : `
                            import component from "./specimens/component.svelte";

                            console.log(component);
                        `,
                    },

                    allowFallthrough : true,
                }),

                require("rollup-plugin-node-resolve")(),

                svelte3(),
            ],
        });

        const { output } = await bundle.generate({
            format : "es"
        });

        const [{ code }] = output;

        expect(code).toMatch("console.log(Component);");
    });
    
    it("should support preprocessors & dependency-tracking", async () => {
        const bundle = await rollup({
            input : "svelte3.js",

            plugins : [
                require("rollup-plugin-hypothetical")({
                    cwd   : __dirname,
                    files : {
                        "./svelte3.js" : `
                            import component from "./specimens/component.svelte";

                            console.log(component);
                        `,
                    },

                    allowFallthrough : true,
                }),

                require("rollup-plugin-node-resolve")(),

                svelte3({
                    preprocess : [{
                        script({ content }) {
                            return {
                                code : content.replace("a mystery", 42),
                                
                                // Can't test this, but we can at least make sure it doesn't error
                                dependencies : [
                                    "./fake.file"
                                ],
                            };
                        },
                    }],
                }),
            ],
        });

        const { output } = await bundle.generate({
            format : "es"
        });

        const [{ code }] = output;

        expect(code).toMatch(`let { answer = "42" }`);
    });
});
