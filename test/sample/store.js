
/*global describe, it*/
var createStore = require('../../src/sample/store');
var assert = require('assert');
var should = require('chai').should();

describe('Sample store reducers', function () {
    it('initial state', function() {
        var store = createStore();
        store.getState().should.deep.equal(store._initialStateForTesting);
    });
    it('Adding a sport should work', function() {
        var store = createStore();
        store.dispatch({type: 'ADD_SPORT', data: {id: 10, name: 'Football'}});
        store.getState().children[1].should.deep.equal({id: 10, name: 'Football'});
        store.dispatch({type: 'ADD_SPORT', data: {id: 11, name: 'Tennis'}});
        store.getState().children[2].should.deep.equal({id: 11, name: 'Tennis'});
    });
    it('Yelling should work', function() {
        var store = createStore();
        store.dispatch({type: 'YELL_EVENT'});
        store.getState().children[0].children[0].children[0].name.should.equal("Lakers vs Chicago Bulls!!!");
    })
});