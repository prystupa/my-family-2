/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:00 PM
 */
define(function (require) {
    "use strict";

    var ShellView = require('./views/ShellView');

    var shell = new ShellView({
        el: 'body'
    });
    shell.render();
});
