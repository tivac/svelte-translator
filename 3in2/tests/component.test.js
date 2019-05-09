"use strict";

const wait = require("p-immediate");

describe("3in2 component wrapper", () => {
    const Wrapper = require("../component.html");
    const { default : ComponentA } = require("./specimens/component-a.svelte");
    const { default : ComponentB } = require("./specimens/component-b.svelte");

    let root;

    beforeEach(() => {
        root = document.createElement("div");
    });

    it("should render a svelte3 component", async () => {
        new Wrapper({
            target : root,

            data : {
                component : ComponentA,
            },
        });

        expect(root.innerHTML).toMatchSnapshot();
    });

    it("should throw if not given a svelte3 component", async () => {
        expect(() => new Wrapper({
            target : root,
            data   : {
                component : true
            },
        })).toThrowErrorMatchingSnapshot();
    });

    it("should destroy the svelte3 component when the wrapper is destroyed", async () => {
        const wrapper = new Wrapper({
            target : root,

            data : {
                component : ComponentA,
            },
        });

        wrapper.destroy();

        expect(wrapper.instance).toBeNull();
    });

    it("should render a svelte3 component w/ props", async () => {
        new Wrapper({
            target : root,

            data : {
                component : ComponentA,

                a : "A",
            },
        });

        expect(root.innerHTML).toMatchSnapshot();
    });

    it("should update the svelte3 component when props change", async () => {
        const wrapper = new Wrapper({
            target : root,

            data : {
                component : ComponentA,

                a : "A",
            },
        });

        expect(root.innerHTML).toMatchSnapshot();

        wrapper.set({
            a : "A2",
        });

        await wait();

        expect(root.innerHTML).toMatchSnapshot();
    });

    it("shouldn't recreate the svelte3 component when props change", async () => {
        const wrapper = new Wrapper({
            target : root,

            data : {
                component : ComponentA,

                a : "A",
            },
        });

        const child = wrapper.instance;

        wrapper.set({
            component : ComponentA,
            a : "A2",
        });

        await wait();

        expect(child).toBe(wrapper.instance);
    });

    it("should support swapping out the svelte3 component", async () => {
        const wrapper = new Wrapper({
            target : root,

            data : {
                component : ComponentA,

                a : "A",
            },
        });

        expect(root.innerHTML).toMatchSnapshot();

        wrapper.set({
            component : ComponentB,
        });

        await wait();

        expect(root.innerHTML).toMatchSnapshot();
    });

    it("should support creation without a component", async () => {
        const wrapper = new Wrapper({
            target : root,
        });

        expect(root.innerHTML).toMatchSnapshot();

        wrapper.set({
            component : ComponentB,
        });

        await wait();

        expect(root.innerHTML).toMatchSnapshot();
    });

    it("should set attributes on the wrapper element it creates", async () => {
        new Wrapper({
            target : root,

            data : {
                component : ComponentA,

                attrs : {
                    class      : "class",
                    style      : "color: red;",
                    "data-foo" : "data-foo",
                }
            },
        });

        expect(root.innerHTML).toMatchSnapshot();
    });
});
