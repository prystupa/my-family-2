/**
 * Module dependencies.
 */

var express = require('express');
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

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var httpServer = http.createServer(app);

var io = require('socket.io').listen(httpServer);
io.of('/services/heartbeat').on('connection', function (socket) {
    var interval = setInterval(function () {
        socket.emit('data');
    }, 5000);
    socket.on('disconnect', function () {
        clearInterval(interval);
    });
});

httpServer.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
