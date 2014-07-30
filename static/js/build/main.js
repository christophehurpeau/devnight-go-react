/** @jsx React.DOM */
var TweetList = React.createClass({displayName: 'TweetList',
    render: function() {
        var url = 'https://twitter.com/' + this.props.username;
        var widgetId = '';

        return (
            React.DOM.a({class: "twitter-timeline", width: "300", height: "500", href: url, 'data-widget-id': widgetId}, "Tweets by @", this.props.username)
        );
    }


});

var UserList = React.createClass({displayName: 'UserList',
    render: function() {
        var userNodes = this.props.usernames.split(',').map(function(username) {
            return (
                TweetList({username: username})
            );
        });
        return (
            React.DOM.div({className: "userList"}, 
                userNodes
            )
        );
    },
    componentDidMount: function() {
        if (window.twttr) {
            twttr.widgets.load()
        }
    }
});
