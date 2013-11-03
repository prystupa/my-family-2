/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var heartbeat = require('./routes/heartbeat');
var deployment = require('./routes/deployment');

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

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var httpServer = http.createServer(app);

var io = require('socket.io').listen(httpServer);
io.of('/services/heartbeat').on('connection', heartbeat);
io.of('/services/deployment').on('connection', deployment);

httpServer.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
