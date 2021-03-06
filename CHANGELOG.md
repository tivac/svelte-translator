## [4.0.1](https://github.com/tivac/svelte-translator/compare/v4.0.0...v4.0.1) (2019-08-28)


### Bug Fixes

* Handle Map/Set correctly ([#52](https://github.com/tivac/svelte-translator/issues/52)) ([ae6277d](https://github.com/tivac/svelte-translator/commit/ae6277d))



# [4.0.0](https://github.com/tivac/svelte-translator/compare/v3.1.4...v4.0.0) (2019-07-01)


### Features

* Split props out into a separate field ([#35](https://github.com/tivac/svelte-translator/issues/35)) ([774acd6](https://github.com/tivac/svelte-translator/commit/774acd6))


### BREAKING CHANGES

* Props for the svelte3 component must now be passed to the wrapped as `props` instead of the entire state of the wrapper being passed along. This prevents warnings from svelte3 components and is generally cleaner overall.



## [3.1.4](https://github.com/tivac/svelte-translator/compare/v3.1.3...v3.1.4) (2019-05-29)


### Features

* **rollup:** dependency tracking for svelte2 ([98ede4c](https://github.com/tivac/svelte-translator/commit/98ede4c))



## [3.1.3](https://github.com/tivac/svelte-translator/compare/v3.1.2...v3.1.3) (2019-05-17)


### Bug Fixes

* **rollup:** Given components reasonable names ([4ca036e](https://github.com/tivac/svelte-translator/commit/4ca036e))



## [3.1.2](https://github.com/tivac/svelte-translator/compare/v3.1.1...v3.1.2) (2019-05-09)


### Bug Fixes

* **3in2:** smarter diff check for component values ([cff84bf](https://github.com/tivac/svelte-translator/commit/cff84bf))



## [3.1.1](https://github.com/tivac/svelte-translator/compare/v3.1.0...v3.1.1) (2019-05-04)



# [3.1.0](https://github.com/tivac/svelte-translator/compare/v3.0.0...v3.1.0) (2019-05-04)


### Features

* **2in3:** Add store adapter for 2in3 ([6eabc7a](https://github.com/tivac/svelte-translator/commit/6eabc7a))



# [3.0.0](https://github.com/tivac/svelte-translator/compare/v2.1.0...v3.0.0) (2019-05-03)


### Features

* **3in2:** No object spread, and no <div> wrapper ([ddb2795](https://github.com/tivac/svelte-translator/commit/ddb2795))
* **3in2:** pass props along transparently ([371a370](https://github.com/tivac/svelte-translator/commit/371a370))


### BREAKING CHANGES

* **3in2:** Instead of inserting a `<div>` that contaiins the svelte3 component now a `<span>` will be injected and used as an anchor point so that the svelte3 component is in the correct place in the DOM hierarchy without an extra wrapping element.
* **3in2:** Previously props to be passed to the svelte3 component would be set in a `props` object, now they live alongside the special `component` and `attrs` properties. This facilitates easier porting of code since the wrapper component can be instantiated & have updated props passed to it exactly like the svelte2 component did previously.



# [2.1.0](https://github.com/tivac/svelte-translator/compare/v2.0.1...v2.1.0) (2019-05-02)


### Bug Fixes

* **rollup:** use correct preprocessor args ([550ca5d](https://github.com/tivac/svelte-translator/commit/550ca5d))


### Features

* **rollup:** pass params to svelte compilers ([94ec5ae](https://github.com/tivac/svelte-translator/commit/94ec5ae))



## [2.0.1](https://github.com/tivac/svelte-translator/compare/v2.0.0...v2.0.1) (2019-04-22)



# [2.0.0](https://github.com/tivac/svelte-translator/compare/v1.2.0...v2.0.0) (2019-04-22)



# [1.2.0](https://github.com/tivac/svelte-translator/compare/v1.1.0...v1.2.0) (2019-04-22)


### Features

* **3in2:** add component swapping support ([80f19cf](https://github.com/tivac/svelte-translator/commit/80f19cf))



# [1.1.0](https://github.com/tivac/svelte-translator/compare/v1.0.0...v1.1.0) (2019-04-08)


### Bug Fixes

* more complete svelte3 component cleanup ([1365315](https://github.com/tivac/svelte-translator/commit/1365315))


### Features

* add svelte2 rollup loader ([d45a4fb](https://github.com/tivac/svelte-translator/commit/d45a4fb))
* get svelte3 rollup loader functional ([a81008e](https://github.com/tivac/svelte-translator/commit/a81008e))



# [1.0.0](https://github.com/tivac/svelte-translator/compare/43e380b...v1.0.0) (2019-04-07)


### Bug Fixes

* properly :skull: on missing svelte3 component ([24ab520](https://github.com/tivac/svelte-translator/commit/24ab520))


### Features

* first pass at some basic functionality ([43e380b](https://github.com/tivac/svelte-translator/commit/43e380b))
* flesh out 3in2 store adapter & tests ([c90ea72](https://github.com/tivac/svelte-translator/commit/c90ea72))



