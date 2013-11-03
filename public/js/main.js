/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:00 PM
 */
define(function (require) {
    "use strict";

    var _ = require('underscore');
    var jGrowl = require('jgrowl');
    var ShellView = require('./views/ShellView');

    var io = require('socket.io');
    var heartbeat = io.connect("/services/heartbeat");

    var shell = new ShellView({
        el: 'body'
    });
    shell.render();

    function heartbeatMessage(message, options) {
        $('#jGrowl').find('.heartbeat').trigger('jGrowl.close');
        jGrowl(message, _.extend({header: 'Heartbeat', group: 'heartbeat'}, options));
    }

    var heartbeatTimeout;

    function unwatchHeartbeat() {
        if (heartbeatTimeout) clearInterval(heartbeatTimeout);
    }

    function watchHeartbeat() {
        unwatchHeartbeat();
        heartbeatTimeout = setTimeout(function () {
            heartbeatMessage("Lost heartbeat with the server", {sticky: true});
        }, 10000);
    }


    watchHeartbeat();

    heartbeat.onmessage = function () {
        watchHeartbeat();
    };

    heartbeat.on('data', function () {
        watchHeartbeat();
    });

    heartbeat.on('disconnect', function () {
        unwatchHeartbeat();
        heartbeatMessage("Lost connection with the server", {sticky: true});
    });

    heartbeat.on('connect', function () {
        watchHeartbeat();
        heartbeatMessage("Established connection with the server");
    });
});

