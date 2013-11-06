/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/6/13
 * Time: 10:36 PM
 */
define(function (require, exports, module) {
    "use strict";

    var io = require('socket.io');

    module.exports = function ($scope) {
        var history = {};

        function updateHistory(grade) {
            if (!history[grade.course]) history[grade.course] = [];
            history[grade.course].push(grade.avg);
        }

        function gradeHistory(course) {
            return history[course];
        }

        var gradebook = io.connect('/services/gradebook');

        gradebook.on('connect', function () {
            history = {};
        });

        gradebook.on('data', function (gradelog) {
            $scope.$apply(function () {
                $scope.grades = gradelog.grades;
                gradelog.grades.forEach(updateHistory);
            });
        });

        $scope.history = gradeHistory;
    };
});