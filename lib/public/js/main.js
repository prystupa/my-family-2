/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/2/13
 * Time: 7:00 PM
 */
define(function (require) {
    "use strict";

    var ShellView = require('./views/ShellView');
    var GradebookView = require('./views/GradebookView');

    var shell = new ShellView({
        el: 'body'
    });
    shell.render();

    var gradebook = new GradebookView({
        el: shell.$('.gradebook')
    });
    gradebook.render();
});
