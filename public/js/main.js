/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:00 PM
 */
define(function (require) {

    var SockJS = require('sockjs');
    var heartbeat = new SockJS('/services/heartbeat');

    heartbeat.onmessage = function(e) {
       console.log(e);
    }
});
