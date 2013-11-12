/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:00 PM
 */
define(function (require) {
    "use strict";

    var ng = require('angular');

    ng.module('utils', [])
        .directive('jgrowlAlerts', require('./utils/jgrowlAlertsDirective'))
        .directive('sparkline', require('./utils/sparklineDirective'))
        .directive('timeago', require('./utils/timeagoDirective'));

    ng.module('deployment', [])
        .controller('DeploymentController', require('./deployment/DeploymentController'));

    ng.module('heartbeat', ['utils'])
        .controller('HeartbeatController', require('./heartbeat/HeartbeatController'));

    ng.module('gradebook', ['utils'])
        .controller("GradebookController", require('./gradebook/GradebookController'))
        .directive("gradebookPanel", require('./gradebook/GradebookPanel'));

    ng.bootstrap(document, ['deployment', 'heartbeat', 'gradebook']);
});
