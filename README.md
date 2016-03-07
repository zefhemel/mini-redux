Redux lite
==========

A super simple implementation of [Redux](https://github.com/reactjs/redux),
as well as [ImmutableJS](https://facebook.github.io/immutable-js/)
(but using POJSOs — Plain Old JavaScript Objects).

Code organization
-----------------
This repo uses [Webpack](https://webpack.github.io/) and
[BabelJS](https://babeljs.io/) to compile JSX + CommonJS modules
to plain JS.

* `src/`: Core source files:
    * `immutable-lite.js`: ImmutableJS-like API, but using plain-old JS objects
    * `redux-lite.js`: A simplified version of redux
* `src/sample`: A sample application using these libraries
* `test/`: Tests for core source files:
    * `immutable-lite.js`: tests for immutable-lite
    * `redux-lite`: tests for redux-lite
* `test/sample`: Tests for the sample application
    * `store.js`: Test for the sample store 

Redux-lite API
--------------

* `Store` one store to rule them all
    * constructor: `new Store(initialState, rootReducer, debug)`
        * `initialState` a POJSO representing the initial application state.
        * `rootReducer` a function taking two arguments: `oldState` and
          `action` and returning a new state object
    * `dispatch(action)`: dispatches an action onto the store
    * `getState()`: retrieves the current application state
* `connect(RootComponent, store)`: returns a new version of the
  `RootComponent`, but attached to the store. The `RootComponent`
  received two extra properties (in `this.props`):
    * `state` containing the current application state
    * `dispatch` a reference to the `dispatch` function to dispatch new actions.

Check `src/sample` for an example.

Immutable-lite API
------------------
This library has no dependencies (no dependency on React add-ons either),
it's 100% self-contained.

* `update`: Implements the [update function described here](https://facebook.github.io/react/docs/update.html)
* The rest of the functions all have two versions:
    1. xSpec: returns a spec to te passed into `update` to work
    2. x: applies the change to the given value
* These functions are:
    * `setIn(o, path, value)` returns a new version of `o` with `value` set under `path`,
       for instance `setIn({person: {name: 'A'}}, ['person', 'name'], 'B')` will return `{person: {name: 'B'}}`.
    * `applyIn(o, path, fn)`
    * `pushIn(o, path, values)`
    * `unshiftIn(o, path, values)`
    * `mergeIn(o, path, value)`
* `mergeSpecs(specs)` can be used to merge multiple update specs and apply them at once though `update`.

To run the sample
-----------------

Clone this repo, then run:

    npm install

Afterwards, to run the development server:

    npm run dev
    
Then open http://localhost:8080/sample/

Or, to build the sample into `out/`:

    npm run build

To build a production-ready minified version into `out/`:

    npm run build:production

To run unit tests:

    npm test