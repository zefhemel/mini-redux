var React = require('react');

function Store(initialState, rootReducer, debug) {
    this._state = initialState;
    this._reducer = rootReducer;
    this._debug = debug;
    this._listeners = [];
}

Store.prototype = {
    getState: function () {
        return this._state;
    },
    dispatch: function (action) {
        var oldState = this._state;
        this._state = this._reducer(oldState, action);
        for (var i = 0; i < this._listeners.length; i++) {
            this._listeners[i](this._state);

        }
        if (this._debug) {
            console.log("[DEBUG] State changed from", oldState, "to", this._state);
        }
    },
    subscribe: function(listener) {
        this._listeners.push(listener);
    },
    unsubscribe: function(listener) {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
    }
};

function connect(RootComponent, store) {
    return React.createClass({
        componentWillMount: function () {
            store.subscribe(this.stateChanged);
        },
        componentWillUnmount: function () {
            store.unsubscribe(this.stateChanged);
        },
        stateChanged: function (newState) {
            this.setState({
                state: newState
            });
        },
        getInitialState: function () {
            return {
                state: store.getState()
            };
        },
        render: function () {
            var state = this.state.state;
            var props = {
                state: state,
                dispatch: store.dispatch.bind(store),
            };
            for (var p in this.props) {
                if (this.props.hasOwnProperty(p)) {
                    props[p] = this.props[p];
                }
            }
            return React.createElement(RootComponent, props);
        }
    });
}

module.exports = {
    Store: Store,
    connect: connect
};