import { Store } from "svelte2/store.js";

class Svelte3Store extends Store {
    subscribe(fn) {
        const { cancel } = this.on("state", ({ current }) => fn(current));

        fn(this.get());

        return cancel;
    }

    update(fn) {
        this.set(fn(this.get()));
    }
}

export default Svelte3Store;

