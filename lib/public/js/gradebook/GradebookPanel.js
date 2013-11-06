/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/6/13
 * Time: 10:25 PM
 */
define(function (require, exports, module) {
    "use strict";

    var template = require('text!./GradebookPanel.html');

    module.exports = function () {
        return {
            template: template
        };
    };
});
