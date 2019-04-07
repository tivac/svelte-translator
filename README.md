# svelte-translator

Use svelte 2 features inside svelte 3, and use svelte 3 features inside svelte 2. Because sometimes there's no amount of automated component rewriting that will make things work but you want to start a gradual transition.

## Features

| Feature | Svelte 3 in 2 | Svelte 2 in 3 |
| ---: | :---: | :---: |
| Stores | ✔ | 💭 |
| Components | ✔ | 💭 |
| Rollup Bundling | 💭 | 💭 |

**Legend**

- ✔ feature exists and works
- 💭 feature is planned
- 🤔 feature isn't planned

## Installation

```
$> npm install svelte-translator
```

You'll also need to use `npm@6.9.0` or higher so that you can install svelte2 and svelte3 side-by-side.

```
$> npm install svelte2@npm:svelte@2
$> npm install svelte3@npm:svelte@3.0.0-beta.22
```

⚠ Make sure you update any existing references to `svelte` to point to `svelte2` or `svelte3` depending on which you were using previously! ⚠

## Usage

### Svelte3-in-Svelte2

#### Components

Wrap up a svelte3 component so it can be included within a svelte2 component.

```html
<Wrapper {component} />

<script>
import Component from "your-svelte3-component.svelte";

export default {
    components : {
        Wrapper : "svelte-translator/3in2/component.html",
    },

    data : () => ({
        component : Component,
    }),
};
```

| Data | Usage |
| --- | --- |
| `component` | The svelte 3 component to wrap up |
| `props` | Any props to pass to the svelte 3 component. Will cause the component to re-render if they're changed |
| `attrs` | Any DOM attribute you want to attach to the `<div>` injected by the wrapper (so the svelte3 component has a node to attach to) |

#### Stores

A small svelte2 store that expects to be passed either a `readable` or `writable` svelte3 store and will make the value of the svelte3 store available to components using the standard APIs.

```js
import { readable } from "svelte3/store";
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
