# svelte-translator [![Build Status](https://img.shields.io/travis/tivac/svelte-translator/master.svg)](https://travis-ci.org/tivac/svelte-translator) [![NPM Version](https://img.shields.io/npm/v/svelte-translator.svg)](https://www.npmjs.com/package/svelte-translator) [![NPM License](https://img.shields.io/npm/l/svelte-translator.svg)](https://www.npmjs.com/package/svelte-translator) [![NPM Downloads](https://img.shields.io/npm/dm/svelte-translator.svg)](https://www.npmjs.com/package/svelte-translator)

Use svelte v2 features inside svelte v3, and use svelte v3 features inside svelte v2. Because sometimes there's no amount of automated component rewriting that will make things work but you want to start a gradual transition.

## Features

| Feature | Svelte 3 in 2 | Svelte 2 in 3 |
| ---: | :---: | :---: |
| Stores | [✔](#stores) | [✔](#stores-1) |
| Components | [✔](#components) | 💭 |
| Rollup Bundling | [✔](#loading-svelte3-components) | [✔](#loading-svelte2-components) |

**Legend**

- ✔ feature exists and works
- 🔧 feature in progress
- 💭 feature is planned

## Installation

```
$> npm install svelte-translator
```

You'll also need to use `npm@6.9.0` or higher so that you can install `svelte@2` and `svelte@3` side-by-side.

```
$> npm install svelte2@npm:svelte@2
$> npm install svelte@latest
```

⚠️ Make sure you **update any existing references** to `svelte` to point to `svelte2` now that svelte v3 is the default

## Usage

### Svelte v3 in Svelte v2

#### Components

Wrap up a v3 component so it can be included within a svelte2 component.

```html
<Wrapper {...props} />

<script>
import Component from "your-svelte3-component.svelte";

export default {
    components : {
        Wrapper : "svelte-translator/3in2/component.html",
    },

    data : () => ({
        component : Component,
    }),

    // This computed is here so that this component can essentially be invisible, it
    // exists solvely to help the transition and can be removed once v2 is gone
    computed : {
        props : (state) => state,
    },
};
```

| Data | Usage |
| --- | --- |
| `component` | The v3 component to wrap |
| `...` | All other props on the component are passed directly to the v3 component |

#### Stores

A small svelte2 store that expects to be passed either a `readable` or `writable` svelte3 store and will make the value of the svelte3 store available to components using the standard APIs.

```js
import { readable } from "svelte/store";
import Adapter from "svelte-translator/3in2/store.js";

const s3r = readable(0);

const s2r = new Adapter(s3r);

// Non-object values are mapped to the "value" key

s2r.get(); // { value : 0 }

const s3w = writable({ fooga : 1, booga : 0 });

const s2w = new Adapater(s3w);

// Object values are splatted into the store

s2w.get(); // { fooga : 1, booga : 0 }

s2w.set({ fooga : 2 });

s3w.subscribe((value) => {
    // { fooga : 2, booga : 0 }
});
```

### Svelte v2 in Svelte v3

#### Stores

`svelte-translator/2in3/store.js` implements the v3 store contract (`.set()` is provided natively by v2 stores, it implements `.subscribe()` & `.update()`) in a class that extends `svelte/store.js` so it can be a drop-in replacement.

Here's an example of how to make v2 stores usable in v3 components.

```diff
- import { Store } from "svelte/store.js";
+ import { Store } from "svelte-translator/2in3/store.js";
```

The `svelte-translator` version is fully functional in v3 components. You can use its values directly within the template, within the component `<script>` block either staticly or in reactive statements, and it can also be used as an input to any `derived` stores.

It also remains a completely valid svelte v2 store that functions just as they always have in your v2 components.

```js
// my-store.js
import { Store } from "svelte-translator/2in3/store.js";

const store = new Store({
    ...
});

export default store;
```

```html
<!-- my-component.html -->
<div>{$store.foo}</div>

<p>
{reactive}
</p>

<span>{$dstore}</span>

<script>
import store from "./my-store.js";
import { derived } from "svelte/store";

$: reactive = $store.foo + "ey";

const dstore = derived(store, ($foo, set) => set(foo + "ey"));
</script>
```

### Rollup bundling of Svelte v2 & Svelte v3

#### Loading Svelte2 Components

```js
require("svelte-translator/rollup/svelte2.js")({
    // Optional preprocessor
    preprocess : { ... },

    // Options for the svelte compiler
    options : {
        dev : true
    },
}),
```

#### Loading Svelte3 Components

```js
require("svelte-translator/rollup/svelte3.js")({
    // Optional preprocessors
    preprocess : [
        { ... },
    ],

    // Options for the svelte compiler
    options : {
        dev : true
    },
}),
```
