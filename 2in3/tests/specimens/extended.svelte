<div>
    {$store.one}
    {$store.two}
    {JSON.stringify(test)}
</div>

<script>
import { extended as store } from "./store.js";

let test = store.test();
</script>
