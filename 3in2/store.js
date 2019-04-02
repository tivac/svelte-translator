import { Store as Svelte2Store } from "svelte2/store.js";

export class Store extends Svelte2Store {
    constructor(store) {
        super();

        this._store = store;
        this._set = this.set;
        
        const unsubscribe = store.subscribe((value) => {
            // Objects are splatted
            if(typeof value === "object" && !Array.isArray(value)) {
                return this.set(value);
            }

            // Everything else is set to the "value" property
            this._set({ value });
        });

        this.unsubscribe = unsubscribe;

        this.set = (args) => {
            if(!this._store.set) {
                throw new Error("Called .set() on a readable store");
            }

            this._set(args);
        };
    }
};
