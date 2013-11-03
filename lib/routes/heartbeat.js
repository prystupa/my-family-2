/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/3/13
 * Time: 10:17 AM
 */

module.exports = function (socket) {
    "use strict";

    var interval = setInterval(function () {
        socket.emit('data');
    }, 5000);
    socket.on('disconnect', function () {
        clearInterval(interval);
    });
};
