/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:52 PM
 */

define(function (require, exports, module) {
    "use strict";

    var io = require('socket.io');
    var _ = require('lodash');

    module.exports = function ($scope) {
        var heartbeatTimeout;
        resetHeartbeatTimeout();

        function resetHeartbeatTimeout() {
            clearHeartbeatTimeout();
            heartbeatTimeout = setTimeout(function () {
                heartbeatMessage("Lost heartbeat with the server", {sticky: true});
            }, 10000);
        }

        function clearHeartbeatTimeout() {
            if (heartbeatTimeout) {
                clearInterval(heartbeatTimeout);
                heartbeatTimeout = undefined;
            }
        }

        function resetHeartbeatMessage() {
            $scope.$emit('reset-alert', 'heartbeat');
        }

        function heartbeatMessage(message, options) {
            resetHeartbeatMessage();
            $scope.$emit('show-alert', message, _.extend({header: 'Heartbeat', group: 'heartbeat'}, options));
        }

        var heartbeat = io.connect("/services/heartbeat");
        heartbeat.on('data', function () {
            resetHeartbeatMessage();
            resetHeartbeatTimeout();
        });

        heartbeat.on('disconnect', function () {
            clearHeartbeatTimeout();
            heartbeatMessage("Lost connection with the server", {sticky: true});
        });

        heartbeat.on('connect', function () {
            resetHeartbeatTimeout();
            heartbeatMessage("Established connection with the server");
        });
    };
});
