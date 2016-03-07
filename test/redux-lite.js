/*global describe, it*/
var assert = require('assert');
var redux = require('../src/redux-lite');
var immutable = require('../src/immutable-lite');
var should = require('chai').should();

describe("Stores", function () {
    it("Should successfully reduce", function () {
        function reducer(oldState, action) {
            switch(action.type) {
                case 'TEST':
                    return immutable.setIn(oldState, ['name'], 'B');
                case 'INC':
                    return immutable.applyIn(oldState, ['counter'], function(v) {
                        return v + action.n;
                    });
                default:
                    throw Error("Unknown action", action.type);
            }
        }
        var store = new redux.Store({ name: 'A', counter: 0 }, reducer);
        store.getState().should.deep.equal({name: 'A', counter: 0});
        store.dispatch({type: 'TEST'});
        store.getState().should.deep.equal({name: 'B', counter: 0});
        store.dispatch({type: 'INC', n: 5});
        store.getState().should.deep.equal({name: 'B', counter: 5});
    });

})