/** @jsx React.DOM */
var TweetList = React.createClass({
    render: function() {
        var url = 'https://twitter.com/' + this.props.username;
        var widgetId = '';

        return (
            <a class="twitter-timeline" width="300" height="500" href={url} data-widget-id={widgetId}>Tweets by @{this.props.username}</a>
        );
    }


});

var UserList = React.createClass({
    render: function() {
        var userNodes = this.props.usernames.split(',').map(function(username) {
            return (
                <TweetList username={username}></TweetList>
            );
        });
        return (
            <div className="userList">
                {userNodes}
            </div>
        );
    },
    componentDidMount: function() {
        if (window.twttr) {
            twttr.widgets.load()
        }
    }
});
