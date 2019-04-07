"use strict";

const { writable } = require("svelte3/store");
const Adapter = require("../store.js");

const {
    readableSimple,
    writableSimple,
    readableObject,
    writableObject
} = require("./specimens/store.js");

describe("3in2 store adapter", () => {
    let root;

    beforeEach(() => {
        root = document.createElement("div");
    });

    it("should render readable stores that return a simple value", async () => {
        const Component = require("./specimens/readable-simple.html");
        
        new Component({
            target : root
        });
        
        expect(root.innerHTML).toMatchSnapshot();
        
        readableSimple._store._write(1);
        
        expect(root.innerHTML).toMatchSnapshot();
    });
            
    it("should render readable stores that return an object", async () => {
        const Component = require("./specimens/readable-object.html");

        new Component({
            target : root
        });

        expect(root.innerHTML).toMatchSnapshot();

        readableObject._store._write({ fooga : "fooga", wooga : "wooga" });

        expect(root.innerHTML).toMatchSnapshot();
    });
    
    it("should render writable stores that return a simple value", async () => {
        const Component = require("./specimens/writable-simple.html");
        
        new Component({
            target : root
        });
        
        expect(root.innerHTML).toMatchSnapshot();
        
        writableSimple._store.set(1);
        
        expect(root.innerHTML).toMatchSnapshot();
    });
            
    it("should render writable stores that return an object", async () => {
        const Component = require("./specimens/writable-object.html");

        new Component({
            target : root
        });

        expect(root.innerHTML).toMatchSnapshot();

        writableObject._store.set({ fooga : "fooga", wooga : "wooga" });

        expect(root.innerHTML).toMatchSnapshot();
    });

    it("should update the underlying store when .set() is called", async () => {
        const original = writable(0);
        const store = new Adapter(original);

        store.set(1);

        expect(store.get()).toMatchSnapshot();
        
        const unsubscribe = original.subscribe((value) => expect(value).toMatchSnapshot());

        unsubscribe();
    });

    it("should throw if .set() is called against a readable store", async () => {
        expect(() => readableSimple.set(0)).toThrowErrorMatchingSnapshot();
    });
});
