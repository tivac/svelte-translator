import { Store as Svelte2Store } from "svelte2/store.js";

class AdapterStore extends Svelte2Store {
    constructor(store) {
        super({});

        this._store = store;

        // Save a reference to the original set before it's overwritten below
        this.__set = this.set;
        
        const unsubscribe = store.subscribe((value) => {
            // Objects are splatted
            if(typeof value === "object" && !Array.isArray(value)) {
                return this.__set(value);
            }

            // Everything else is set to the "value" property
            return this.__set({ value });
        });

        this.unsubscribe = unsubscribe;

        // Provide a guarded .set in case the store isn't writable
        this.set = (args) => {
            if(!this._store.set) {
                throw new Error("Called .set() on a readable store");
            }

            this._store.set(args);
        };
    }
}

export default AdapterStore;
