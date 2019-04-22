const { readable, writable } = require("svelte/store");
const Adapter = require("../../store.js");

const noop = () => {};

const writablereadable = (value) => {
    const store = readable(value, (set) => {
        store._write = set;

        return noop;
    });

    return store;
};

exports.readableSimple = new Adapter(writablereadable(0));
exports.writableSimple = new Adapter(writable(0));

exports.readableObject = new Adapter(writablereadable({ fooga : 0, wooga : 0 }));
exports.writableObject = new Adapter(writable({ fooga : 0, wooga : 0 }));
