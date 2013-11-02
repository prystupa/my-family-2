/**
 * Module dependencies.
 */

var express = require('express');
var sockjs = require('sockjs');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/js/require.js', function (req, res) {
    res.sendfile(path.join(__dirname, '/node_modules/requirejs/require.js'));
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var httpServer = http.createServer(app);

var heartbeat = sockjs.createServer();
heartbeat.installHandlers(httpServer, {prefix: '/services/heartbeat'});
heartbeat.on('connection', function (connection) {

    var interval = setInterval(function() {
        connection.write("heartbeat");
    }, 5000);
    connection.on('close', function () {
        clearInterval(interval);
    });
});


httpServer.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

