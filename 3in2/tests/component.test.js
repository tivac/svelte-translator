"use strict";

const wait = require("p-immediate");

describe("3in2 component wrapper", () => {
    const Wrapper = require("../component.html");
    const { default : Component } = require("./specimens/component.svelte");
    
    let root;

    beforeEach(() => {
        root = document.createElement("div");
    });

    it("should render a svelte3 component", async () => {
        new Wrapper({
            target : root,

            data : {
                component : Component,
            },
        });

        expect(root.innerHTML).toMatchSnapshot();
    });

    it("should throw if not given a svelte3 component", async () => {
        expect(() => new Wrapper({ target : root })).toThrowErrorMatchingSnapshot();
    });

    it("should destroy the svelte3 component when the wrapper is destroyed", async () => {
        const wrapper = new Wrapper({
            target : root,

            data : {
                component : Component,
            },
        });

        wrapper.destroy();

        expect(wrapper.instance).toBeNull();
    });
    
    it("should render a svelte3 component w/ props", async () => {
        new Wrapper({
            target : root,

            data : {
                component : Component,

                props : {
                    answer : "42",
                },
            },
        });

        expect(root.innerHTML).toMatchSnapshot();
    });
   
    it("should update the svelte3 component when props change", async () => {
        const wrapper = new Wrapper({
            target : root,

            data : {
                component : Component,

                props : {
                    answer : "42",
                },
            },
        });

        expect(root.innerHTML).toMatchSnapshot();
        
        wrapper.set({
            props : {
                answer : "science",
            },
        });

        await wait();
        
        expect(root.innerHTML).toMatchSnapshot();
    });
    
    it("should set attributes on the wrapper element it creates", async () => {
        new Wrapper({
            target : root,
            
            data : {
                component : Component,

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
