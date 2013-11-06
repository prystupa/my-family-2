/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/7/13
 * Time: 1:08 AM
 */
define(function (require, exports, module) {
    "use strict";

    require('$.jgrowl');

    module.exports = function () {
        return {
            link: function ($scope, $element) {
                $scope.$on('show-alert', function (event, message, options) {
                    $element.jGrowl(message, options);
                });

                $scope.$on('reset-alert', function (event, group) {
                    $element.find('.' + group).trigger('jGrowl.close').remove();
                });
            }
        };
    };
});
