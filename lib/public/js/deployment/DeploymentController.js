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
        var lastVersion;

        function reload(version) {

            if (lastVersion && lastVersion != version) {
                window.location.reload();
            }
            lastVersion = version;
        }

        var deployment = io.connect("/services/deployment");
        deployment.on('data', function (info) {
            $scope.$emit('show-alert', 'aaa');
            $scope.$apply(function () {
                $scope.appVersion = info;
                reload(info);
            });
        });
    };
});
