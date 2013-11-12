/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/10/13
 * Time: 9:37 PM
 */
define(function (require, exports, module) {
    "use strict";

    var templates = {
        seconds: 'a few seconds ago',
        minute: 'a minute ago',
        minutes: '%d minutes ago',
        hour: 'an hour ago',
        hours: '%d hours ago',
        day: 'a day ago',
        days: '%d days ago',
        month: 'a month ago',
        months: '%d months ago',
        year: 'a year ago',
        years: '%d years ago'
    };

    // replace %d with a value
    function template(name, value) {
        return templates[name].replace(/%d/i, Math.abs(Math.round(value)));
    }

    // generate time ago string
    function getTimeAgo(time) {
        if (!time) return 'Never';

        var now = new Date();
        var seconds = ((now.getTime() - time) * 0.001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        if (seconds < 30) return template('seconds', seconds);
        if (seconds < 90) return template('minute', 1);
        if (minutes < 45) return template('minutes', minutes);
        if (minutes < 90) return template('hour', 1);
        if (hours < 24) return template('hours', hours);
        if (hours < 42) return template('day', 1);
        if (days < 30) return template('days', days);
        if (days < 45) return template('month', 1);
        if (days < 365) return template('months', days / 30);
        if (years < 1.5) return template('year', 1);
        return template('years', years);
    }

    module.exports = function () {

        return {
            restrict: 'E',
            replace: true,
            template: '<time datetime="{{time}}" title="{{time|date:\'medium\'}}">{{timeago}}</time>',
            scope: {
                time: "="
            },
            controller: function ($scope, $interval) {
                function update() {
                    $scope.timeago = getTimeAgo($scope.time);
                }

                $scope.$watch('time', update);
                var promise = $interval(update, 5000);
                $scope.$on('$destroy', function () {
                    $interval.cancel(promise);
                });

                update();
            }
        };
    };
});