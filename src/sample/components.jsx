var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

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
                <button onClick={this.addFootball}>Add football</button>
                <button onClick={this.yellFirstEvent}>Yell event</button>
            </div>
        );
    },
    addFootball: function () {
        var sports = this.props.state.children;
        this.props.dispatch({
            type: 'ADD_SPORT',
            data: {
                id: sports.length,
                name: "Football " + sports.length,
                children: [{
                    id: 1,
                    name: "Major League",
                    children: [{
                        id: 1,
                        name: "Netherlands vs Poland"
                    }]
                }]
            }
        });
    },
    yellFirstEvent: function () {
        this.props.dispatch({
            type: 'YELL_EVENT'
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

module.exports = {
    SportPage: SportPage
};