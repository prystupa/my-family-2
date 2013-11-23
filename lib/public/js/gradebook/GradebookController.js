/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/6/13
 * Time: 10:36 PM
 */
define(function (require, exports, module) {
    "use strict";

    var io = require('socket.io');
    var _ = require('lodash');

    function byGradeName(g1, g2) {
        return g1.course.localeCompare(g2.course);
    }

    module.exports = function ($scope) {
        var history = {};

        function updateHistory(timestamp, grade) {
            if (!history[grade.course]) history[grade.course] = [];
            var avg = grade.avg;
            if (avg !== undefined) {
                history[grade.course].push([timestamp, avg]);
            }
        }

        function gradeHistory(course) {
            return history[course];
        }

        function tooltipFormatter(sparkline, options, fields) {
            return '<span style="color: ' + fields.color + '">&#9679;</span>' +
                ' <span>' + fields.y + '</span>' +
                ' on ' +
                fields.x.toLocaleDateString();
        }

        var gradebook = io.connect('/services/gradebook');

        gradebook.on('connect', function () {
            history = {};
        });

        gradebook.on('data', function (gradelog) {
            $scope.$apply(function () {
                $scope.updated = gradelog.timestamp;
                $scope.grades = gradelog.grades.sort(byGradeName);
                gradelog.grades.forEach(_.bind(updateHistory, null, new Date(gradelog.timestamp)));
            });
        });

        $scope.history = gradeHistory;
        $scope.tooltipFormatter = tooltipFormatter;
    };
});