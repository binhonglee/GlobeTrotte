# @glareshield - GlareShield

Just a library of a bunch generically reusable functions, classes, and scripts. Unlike the rest of the repository, all the code in this folder is under MIT license (instead of AGPLv3).

## @glareshield/e

E is short for Element. Its a class with functions included that are loosely related to vue / HTML elements.

_Note: Currently using `any` as replacement for `Vue` (when upgrading from Vue 2.0) because `CreateComponentPublicInstance` isn't exported. See: https://github.com/vuejs/vue-next/issues/2020_

## @glareshield/h

H is short for HTTP(S) Request. This is mostly an abstract interface for using `axios` than can be easily extended then reused in another project. See [here](https://github.com/binhonglee/GlobeTrotte/blob/main/src/cockpit/shared/HTTPReq.ts#L7) on how its extended and used in this project itself.

## @glareshield/r

R is short for Route so functions included here are loosely related to path routing between views (specifically for `vue-router`). See [here](https://github.com/binhonglee/GlobeTrotte/blob/main/src/cockpit/shared/Routing.ts#L1) on how its extended and used in this project itself.

_Note: Currently, its not very valuable to anyone else since it has an underlying assumption on how your routes are supposed to be setup. You can checkout the [genRouter.ts](https://github.com/binhonglee/GlobeTrotte/blob/main/src/cockpit/scripts/genRouter.ts) script (which I plan to extract and include as part of this package) on what the route assumptions are._
