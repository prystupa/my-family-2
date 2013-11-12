/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/6/13
 * Time: 10:36 PM
 */
define(function (require, exports, module) {
    "use strict";

    var io = require('socket.io');

    function byGradeName(g1, g2) {
        return g1.course.localeCompare(g2.course);
    }

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
                $scope.updated = gradelog.timestamp;
                $scope.grades = gradelog.grades.sort(byGradeName);
                gradelog.grades.forEach(updateHistory);
            });
        });

        $scope.history = gradeHistory;
    };
});