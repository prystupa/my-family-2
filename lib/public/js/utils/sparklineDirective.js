/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/10/13
 * Time: 11:03 AM
 */
define(function (require, exports, module) {
    "use strict";

    var _ = require('lodash');
    require("$.sparkline");
    
    function nonDirectiveAttrs(key) {
        return key.charAt(0) != "$" && key != 'sparkline';
    }

    module.exports = function () {
        return {
            link: function (scope, element, attrs) {
                var options = _.filter(_.keys(attrs), nonDirectiveAttrs);
                scope.$watch(attrs.sparkline, function (value) {
                    element.sparkline(value, _.pick(attrs, options));
                });
            }
        };
    };
});