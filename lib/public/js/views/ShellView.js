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

    module.exports = Backbone.View.extend({
        render: function() {
            this.$el.html(template);
            return this;
        }
    });
});
