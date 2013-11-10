/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:00 PM
 */
define(function (require) {
    "use strict";

    var ng = require('angular');
//    require('ui.bootstrap');

    ng.module('alerts', [])
        .directive('jgrowlAlerts', require('./alerts/jgrowlAlertsDirective'));
    ng.module('charting', [])
        .directive('sparkline', require('./charting/sparklineDirective'));

    ng.module('deployment', [])
        .controller('DeploymentController', require('./deployment/DeploymentController'));

    ng.module('heartbeat', ['alerts'])
        .controller('HeartbeatController', require('./heartbeat/HeartbeatController'));

    ng.module('gradebook', ['charting'])
        .controller("GradebookController", require('./gradebook/GradebookController'))
        .directive("gradebookPanel", require('./gradebook/GradebookPanel'));

    ng.bootstrap(document, ['deployment', 'heartbeat', 'gradebook']);
});
