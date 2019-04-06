/**
 * @jest-environment jsdom
 */

const fs = require("fs");

const svelte2 = require("svelte2");
const svelte3 = require("svelte3/compiler.js");
const load = require("require-from-string");

const html = require.resolve("../component.html");
const raw = fs.readFileSync(html, "utf8");

describe("3in2 component wrapper", () => {
    let Wrapper;
    
    beforeEach(async () => {
        const { js } = svelte2.compile(raw, {
            filename   : html,
            name       : "Wrapper",
            format     : "cjs",
            sveltePath : "svelte3"
        });

        // console.log(js.code);

        Wrapper = load(js.code, html);
    });

    it("should render a svelte3 component inside a svelte2 wrapper", async () => {
        const filename = require.resolve("./specimens/component.svelte");

        const { js } = svelte3.compile(fs.readFileSync(filename, "utf8"), {
            filename,
            name       : "Nested",
            format     : "cjs",
            sveltePath : "svelte3",
        });

        const Component = load(js.code, filename).default;

        console.log(global.document);

        const root = document.createElement("div");

        // TODO: figure out how to load a string from svelte into the current node process that
        // has access to jest globals
        const test = load(`module.exports = () => console.log(global.document);`);

        test();

        // new Wrapper({
        //     target : root,
        // });

        console.log(root.outerHTML);
    });
});
