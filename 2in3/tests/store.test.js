"use strict";
import { tick } from "svelte";

import { simple, extended } from "./specimens/store.js";

describe("2in3 store adapter", () => {
    const { default : Simple } = require("./specimens/simple.svelte");
    const { default : Extended } = require("./specimens/extended.svelte");
    const { default : Derived } = require("./specimens/derived.svelte");
    const { default : Reactive } = require("./specimens/reactive.svelte");
    
    let root;

    beforeEach(() => {
        root = document.createElement("div");
    });

    afterEach(() => {
        simple.set({
            one : 1,
            two : 2,
        });
        
        extended.set({
            one : 1,
            two : 2,
        });
    });

    it("should render simple store values", async () => {
        new Simple({
            target : root
        });
        
        expect(root.innerHTML).toMatchSnapshot();
        
        simple.set({
            two : 3
        });

        await tick();
        
        expect(root.innerHTML).toMatchSnapshot();
    });
    
    it("should render extended store values", async () => {
        new Extended({
            target : root
        });
        
        expect(root.innerHTML).toMatchSnapshot();
        
        extended.set({
            two : 3
        });

        await tick();
        
        expect(root.innerHTML).toMatchSnapshot();
    });

    it("should render derived store values", async () => {
        new Derived({
            target : root
        });
        
        expect(root.innerHTML).toMatchSnapshot();
        
        simple.set({
            two : 3
        });

        await tick();
        
        expect(root.innerHTML).toMatchSnapshot();
    });
    
    it("should be able to reactively update from store values", async () => {
        new Reactive({
            target : root
        });
        
        expect(root.innerHTML).toMatchSnapshot();
        
        simple.set({
            two : 3
        });

        await tick();
        
        expect(root.innerHTML).toMatchSnapshot();
    });
});
