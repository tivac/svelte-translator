import { Store } from "../../store.js";

const simple = new Store({
    one : 1,
    two : 2,
});

class ExtendedStore extends Store {
    test() {
        return this.get();
    }
}

const extended = new ExtendedStore({
    one : 1,
    two : 2,
});

export {
    simple,
    extended,
};
