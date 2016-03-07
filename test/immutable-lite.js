/*global describe, it*/
var assert = require('assert');
var immutable = require('../src/immutable-lite');
var should = require('chai').should();

describe('Basic update tests', function () {
    it('should push correctly', function () {
        immutable.update([0], { $push: [1, 2, 3] }).should.deep.equal([0, 1, 2, 3]);
    });
    it('should set correctly', function () {
        immutable.update({ name: 'replaceme', age: 32 }, { name: { $set: 'Pete' } }).should.deep.equal({ name: 'Pete', age: 32 });
    });
    it('should apply correctly', function () {
        immutable.update({ name: 'Pet', age: 32 }, { name: { $apply: function (v) { return v + 'e'; } } }).should.deep.equal({ name: 'Pete', age: 32 });
    });
});

describe('Basic *In method tests', function () {
    it('should pushIn correctly', function () {
        immutable.pushIn([0], [], [1, 2, 3]).should.deep.equal([0, 1, 2, 3]);
    });
    it('should setIn correctly', function () {
        immutable.setIn({ name: 'replaceme', age: 32 }, ['name'], 'Pete').should.deep.equal({ name: 'Pete', age: 32 });
    });
    it('should applyIn correctly', function () {
        immutable.updateIn({ name: 'Pet', age: 32 }, ['name'], function (v) { return v + 'e'; }).should.deep.equal({ name: 'Pete', age: 32 });
    });
});

describe("Deep update tests", function () {
    it("Should deeply set properly", function () {
        immutable.update({ children: [{ id: 1, name: '1' }, { id: 2, name: '2' }] },
            { children: { 0: { tag: { $set: 'first' } } } }).should.deep.equal(
                { children: [{ id: 1, name: '1', tag: 'first' }, { id: 2, name: '2' }] }
                );
    });
    it("Should deeply set-in properly", function () {
        immutable.setIn({ children: [{ id: 1, name: '1' }, { id: 2, name: '2' }] }, ['children', 0, 'tag'], 'first').should.deep.equal(
                { children: [{ id: 1, name: '1', tag: 'first' }, { id: 2, name: '2' }] }
                );
    });
});

describe("Spec merging", function() {
    it("should merge correctly", function() {
        immutable.mergeSpecs([{}, {}]).should.deep.equal({});
        immutable.mergeSpecs([{name: "1"}, {name: "2"}]).should.deep.equal({name: "2"});
        immutable.mergeSpecs([{list: []}, {name: "2", list: [1, 2, 3]}]).should.deep.equal({name: "2", list: [1, 2, 3]});
    });
    it("should merge specs correctly with appropriate results", function() {
        var spec1 = immutable.setInSpec(['children', 0, 'name'], 'New name');
        var spec2 = immutable.pushInSpec(['children'], [{name: 'Another new name'}]);
        immutable.update({children: [{name: 'Old name'}]}, immutable.mergeSpecs([spec1, spec2])).should.deep.equal(
            {children: [{name: 'New name'}, {name: 'Another new name'}]}
        );
        
        immutable.update({name: "A"}, immutable.mergeSpecs([immutable.setInSpec(['name'], 'B'), immutable.setInSpec(['name'], 'C')])).should.deep.equal(
            {name: 'C'}
        );
    });
});