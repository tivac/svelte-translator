const { rollup } = require("rollup");

const svelte2 = require("../svelte2.js");
const svelte3 = require("../svelte3.js");

describe("svelte-translator rollup plugins", () => {
    it("should be possible to use both plugins at once", async () => {
        const bundle = await rollup({
            input : "svelte2and3.js",

            plugins : [
                require("rollup-plugin-hypothetical")({
                    cwd   : __dirname,
                    files : {
                        "./svelte2and3.js" : `
                            import component2 from "./specimens/component.html";
                            import component3 from "./specimens/component.svelte";

                            console.log(component2, component3);
                        `,
                    },

                    allowFallthrough : true,
                }),

                require("rollup-plugin-node-resolve")(),

                svelte2(),
                svelte3(),
            ],
        });

        const { output } = await bundle.generate({
            format : "es",
        });

        const [{ code }] = output;

        expect(code).toMatch("console.log(Component$1, Component);");
    });

    it("should capture all warnings", async () => {
        const warnings = [];

        const bundle = await rollup({
            input : "svelte2and3.js",

            plugins : [
                require("rollup-plugin-hypothetical")({
                    cwd   : __dirname,
                    files : {
                        "./svelte2and3.js" : `
                            import component2 from "./specimens/component-warning.html";
                            import component3 from "./specimens/component-warning.svelte";

                            console.log(component2, component3);
                        `,
                    },

                    allowFallthrough : true,
                }),

                require("rollup-plugin-node-resolve")(),

                svelte2(),
                svelte3(),
            ],

            onwarn : ({ plugin, pluginCode, message }) => warnings.push({ plugin, pluginCode, message }),
        });

        await bundle.generate({
            format : "es",
        });

        warnings.sort(({ plugin : a }, { plugin : b }) => a.localeCompare(b));

        expect(warnings).toMatchSnapshot();
    });
});
