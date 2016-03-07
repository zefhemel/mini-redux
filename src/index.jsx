var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var update = require('react-addons-update');

var appState = [{
    id: 2001,
    name: "Basketball",
    tournaments: [{
        id: 1001,
        name: "NBA",
        events: [{
            id: 8001,
            name: "Lakers vs Chicago Bulls"
        }, {
            id: 8002,
            name: "Zef vs Radek"
        }]
    }]
}];

// Wannabe event emitter 
var globalEmitter = {
    callback: null,
    on: function (eventName, callback) {
        this.callback = callback;
    },
    emit: function (eventName, data) {
        this.callback(data);
    }
};

var SportPage = React.createClass({
    getInitialState: function () {
        return {
            sports: appState
        };
    },
    componentWillMount: function () {
        globalEmitter.on("update", (sports) => {
            this.setState({sports: sports});
        });
    },
    render: function () {
        var sports = this.state.sports;
        console.log("Rerendering whole page");
        return (
            <div className="sportList">
                {sports.map(sport => (
                    <Sport sport={sport} key={sport.id}/>
                ))}
            </div>
        );
    }
});

var Sport = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        let sport = this.props.sport,
            tournaments = sport.tournaments;
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
        let tournament = this.props.tournament,
            events = tournament.events;
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
        let event = this.props.event;
        console.log("Rerendering event", event);
        return (
            <div className="event">
                Event: {event.name}
            </div>
        );
    }
});

ReactDOM.render(
    <SportPage/>,
    document.getElementById('container')
);


// Terrible, wannabe websocket data receive thingie
document.getElementById("add-button").onclick = function () {
    function randomId() {
        return Math.floor(Math.random() * 1000);
    }

    appState = update(appState, {
        $push: [{ // Sport
            id: randomId(),
            name: "Football " + randomId(),
            tournaments: [
                {
                    id: randomId(),
                    name: "Major League " + randomId(),
                    events: [
                        {
                            id: randomId(),
                            name: "Netherlands vs Poland" + randomId()
                        },
                    ]
                }
            ]
        }]
    });
    globalEmitter.emit("update", appState);
};

// Terrible, wannabe websocket data receive thingie
document.getElementById("update-button").onclick = function () {
    appState = update(appState, {
        0: {
            tournaments: {
                0: {
                    events: {
                        0: {
                            name: {
                                $apply: function (v) {
                                    return v + "!!!!";
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    globalEmitter.emit("update", appState);
};
