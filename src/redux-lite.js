var React = require('react');
var EventEmitter = require('event-emitter');

function Store(initialState, rootReducer, debug) {
    this._state = initialState;
    this._reducer = rootReducer;
    this._debug = debug;
    this.events = new EventEmitter();
}

Store.prototype = {
    getState: function () {
        return this._state;
    },
    dispatch: function (action) {
        var oldState = this._state;
        this._state = this._reducer(oldState, action);
        this.events.emit("newState", this._state);
        if (this._debug) {
            console.log("[DEBUG] State changed from", oldState, "to", this._state);
        }
    }
};

function connect(RootComponent, store) {
    return React.createClass({
        componentWillMount: function () {
            store.events.on("newState", this.stateChanged);
        },
        componentWillUnmount: function () {
            store.events.off("newState", this.stateChanged);
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