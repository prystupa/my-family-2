/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/10/13
 * Time: 11:03 AM
 */
define(function (require, exports, module) {
    "use strict";

    require("$.sparkline");

    module.exports = function () {
        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.sparkline, function (value) {
                    element.sparkline(value, {
                        normalRangeMin: attrs.normalRangeMin,
                        normalRangeMax: attrs.normalRangeMax
                    });
                });
            }
        };
    };
});