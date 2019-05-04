<div>
    {$store.one}
    {$store.two}
    {sum}
</div>

<script>
import { simple as store } from "./store.js";

$: sum = $store.one + $store.two;
</script>
