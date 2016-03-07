var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var connect = require('./redux-lite').connect;
var Store = require('./redux-lite').Store;
var pushIn = require('./immutable-lite').pushIn;
var updateIn = require('./immutable-lite').updateIn;

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

function randomId() {
    return Math.floor(Math.random() * 1000);
}

function rootReducer(oldState, action) {
    switch(action.type) {
    case 'ADD_SPORT':
        return pushIn(oldState, ['children'], [{
            id: randomId(),
            name: "Football " + randomId(),
            children: [{
                id: randomId(),
                name: "Major League " + randomId(),
                children: [{
                    id: randomId(),
                    name: "Netherlands vs Poland" + randomId()
                }]
            }]
        }]);
    case 'UPDATE_SPORT':
        return updateIn(oldState, ['children', 0, 'children', 0, 'children', 0, 'name'],
                  function (v) { return v + "!!!!"; });
    }
}

// Store
var store = new Store(initialState, rootReducer, true);

// Components
var SportPage = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        var sports = this.props.state.children;
        console.log("Rerendering whole page");
        return (
            <div className="sportList">
                <h1>{this.props.title}</h1>
                {sports.map(sport => (
                    <Sport sport={sport} key={sport.id}/>
                ))}
                <button onClick={this.addSport}>Add sport</button>
                <button onClick={this.updateSport}>Update sport</button>
            </div>
        );
    },
    addSport: function() {
        this.props.dispatch({
            type: 'ADD_SPORT'
        });
    },
    updateSport: function() {
        this.props.dispatch({
            type: 'UPDATE_SPORT'
        });
    }
});

var Sport = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        var sport = this.props.sport,
            tournaments = sport.children;
        console.log("Rerendering sport", sport);
        return (
            <div className="sport">
                <div>Sport: {sport.name}</div>
                {tournaments.map(tournament => (
                    <Tournament tournament={tournament} key={tournament.id}/>
                ))}
            </div>
        )
    }
});

var Tournament = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        var tournament = this.props.tournament,
            events = tournament.children;
        console.log("Rerendering tournament", tournament);
        return (
            <div className="tournament">
                Tournament: {tournament.name}
                {events.map(event => (
                    <Event event={event} key={event.id}/>
                ))}
            </div>
        );
    }
});

var Event = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        var event = this.props.event;
        console.log("Rerendering event", event);
        return (
            <div className="event">
                Event: {event.name}
            </div>
        );
    }
});

// Connect store to root component
var RootComponent = connect(SportPage, store);

ReactDOM.render(
    <RootComponent title="My sports page"/>,
    document.getElementById('container')
);