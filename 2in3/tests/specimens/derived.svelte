<div>
    {$store.one}
    {$store.two}
    {$sum}
</div>

<script>
import { derived } from "svelte/store";
import { simple as store } from "./store.js";

const sum = derived(store, ({ one, two }, set) => {
    set(one + two);
});
</script>
