/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:05 PM
 */

require.config({
    baseUrl: "/js",

    paths: {
        "jquery": '/libs/jquery/2.0.3/jquery.min',
        "$.jgrowl": '/libs/jquery-jgrowl/1.2.12/jquery.jgrowl.min',
        "$.sparkline": '/libs/jquery-sparklines/2.1.2/jquery.sparkline.min',
        "lodash": '/libs/lodash.js/2.2.1/lodash.min',
        "text": '/libs/require-text/2.0.10/text.min',
        "socket.io": '/socket.io/socket.io',
        "angular": '/libs/angular.js/1.2.0/angular.min'
    },

    shim: {
        "lodash": {
            exports: '_'
        },

        "$.jgrowl": {
            deps: ['jquery']
        },

        "angular": {
            deps: ['jquery'],
            exports: 'angular'
        }
    },

    deps: ['app']

});
