/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/6/13
 * Time: 2:30 PM
 */
define(function (require, exports, module) {
    "use strict";

    var io = require('socket.io');

    module.exports = function ($scope) {
        var deployment = io.connect("/services/deployment");
        deployment.on('data', function (info) {
            $scope.$apply(function () {
                $scope.appVersion = info;
            });
        });
    };
});
