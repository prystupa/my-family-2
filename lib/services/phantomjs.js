/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/5/13
 * Time: 7:22 AM
 */

var logger = require('winston').loggers.get('services/phantomjs');
var spawn = require('child_process').spawn;
var _ = require('lodash');


module.exports.start = function (port) {
    "use strict";

    logger.info("Starting phantomjs on port " + port);

    var phantomjs = spawn('phantomjs', [
        "--webdriver=" + port
    ]);
    phantomjs.unref();

    process.once('exit', _.bind(phantomjs.kill, phantomjs, "SIGTERM"));
};