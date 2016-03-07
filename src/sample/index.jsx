var React = require('react');
var ReactDOM = require('react-dom');

var redux = require('../redux-lite');

var createStore = require('./store');
var components = require('./components');

// Connect store to root component
var ConnectedSportPage = redux.connect(components.SportPage, createStore(true));

ReactDOM.render(
    <ConnectedSportPage title="My sports page"/>,
    document.getElementById('container')
);