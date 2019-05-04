import Adapter from "../../store.js";

const simple = new Adapter({
    one : 1,
    two : 2,
});

class ExtendedStore extends Adapter {
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
