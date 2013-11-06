/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/5/13
 * Time: 11:18 PM
 */
define(function (require, exports, module) {

    var Backbone = require('backbone');
    var io = require('socket.io');

    module.exports = Backbone.View.extend({

        render: function () {
            var self = this;
            var gradebook = io.connect('/services/gradebook');
            gradebook.on('data', function (gradelog) {
                self.$el.text(JSON.stringify(gradelog));
            });
            return this;
        }
    });
});