var immutable = require('../immutable-lite');
var redux = require('../redux-lite');

// Initial state
var initialState = {
    children: [{
        id: 2001,
        name: "Basketball",
        children: [{
            id: 1001,
            name: "NBA",
            children: [{
                id: 8001,
                name: "Lakers vs Chicago Bulls"
            }, {
                    id: 8002,
                    name: "Zef vs Radek"
                }]
        }]
    }]
};

// Reducer
function rootReducer(oldState, action) {
    switch (action.type) {
        case 'ADD_SPORT':
            return immutable.pushIn(oldState, ['children'], [action.data]);
        case 'YELL_EVENT':
            return immutable.updateIn(oldState, ['children', 0, 'children', 0, 'children', 0, 'name'],
                function (v) { return v + "!!!"; });
    }
}

function createStore(debug) {
    var store = new redux.Store(initialState, rootReducer, debug);
    store._initialStateForTesting = initialState;
    return store;
}

module.exports = createStore;