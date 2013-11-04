/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:52 PM
 */

define(function (require, exports, module) {
    "use strict";

    var Backbone = require('backbone');
    var template = require('text!./ShellView.html');
    var io = require('socket.io');
    var _ = require('underscore');
//    var $ = require('jquery');
    var jGrowl = require('jgrowl');

    function watchVersion(view) {
        var deployment = io.connect("/services/deployment");
        deployment.on('data', function (info) {
            view.$('.app-version').text(info);
        });
    }


    function watchHeartbeat() {
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

        function heartbeatMessage(message, options) {
            $('#jGrowl').find('.heartbeat').trigger('jGrowl.close');
            jGrowl(message, _.extend({header: 'Heartbeat', group: 'heartbeat'}, options));
        }


        var heartbeat = io.connect("/services/heartbeat");
        heartbeat.on('data', function () {
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
    }

    module.exports = Backbone.View.extend({

        render: function () {
            this.$el.html(template);
            watchVersion(this);
            watchHeartbeat();
            return this;
        }
    });
});
