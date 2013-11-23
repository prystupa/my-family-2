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
                var optionKeys = _.filter(_.keys(attrs), nonDirectiveAttrs);
                scope.$watch(attrs.sparkline, function (value) {
                    var options = _.pick(attrs, optionKeys);
                    if (attrs.tooltipFormatter) {
                        options.tooltipFormatter = scope[attrs.tooltipFormatter];
                    }
                    element.sparkline(value, options);
                });
            }
        };
    };
});