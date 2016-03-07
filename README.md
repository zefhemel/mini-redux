Redux lite
==========

A super simple implementation of [Redux](https://github.com/reactjs/redux),
as well as [ImmutableJS](https://facebook.github.io/immutable-js/).

Code organization
-----------------

* `src/`: Core source files:
    * `immutable-lite.js`: ImmutableJS-like API, but using plain-old JS objects
    * `redux-lite.js`: A simplified version of redux
* `src/sample`: A sample application using these libraries
* `test/`: Tests for core source files:
    * `immutable-lite.js`: tests for immutable-lite
    * `redux-lite`: tests for redux-lite
* `test/sample`: Tests for the sample application
    * `store.js`: Test for the sample store 

To run
------

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