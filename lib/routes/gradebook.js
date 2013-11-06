/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/4/13
 * Time: 10:10 AM
 */

var logger = require('winston').loggers.get('routes/gradebook');
var webdriver = require('selenium-webdriver');
var _ = require('lodash');
var ParentsPortal = require('../scraping/ParentsPortal');
var storage = require('../services/storage');
var config = require('../config');
var EventEmitter = require('events').EventEmitter;
var gradebookEvents = new EventEmitter();

function convertToGradeLog(grades) {
    "use strict";

    logger.debug('processing scraped grades');

    return {
        timestamp: new Date().getTime(),
        grades: grades.map(function (grade) {
            var course = grade.course.replace(/.*-\s*/, "");
            var avg = parseFloat(grade.avg) || undefined;

            return {
                course: course,
                avg: avg
            };
        })
    };
}

function pullGrades(port) {
    "use strict";

    var address = 'http://localhost:' + port + '/wd/hub';
    logger.debug("Connecting to webdriver server using " + address);

    var driver = new webdriver.Builder().
        usingServer(address).
        build();


    driver.getSession()
        .then(scrap)
        .then(convertToGradeLog)
        .then(function (gradelog) {
            gradebookEvents.emit('data', gradelog);
            storage.saveGrades(gradelog);
        })
        .then(_.bind(driver.quit, driver), function (e) {
            logger.error("scrapping gradebook failed" + e);
            driver.quit();
        });

    function scrap() {
        var portal = new ParentsPortal(driver, config.scrapping.parentsPortal);
        return portal.loadSite()
            .then(portal.login)
            .then(portal.loadGradebook)
            .then(portal.scrapeGrades);
    }
}

function subscribe(socket) {
    var emit = _.bind(socket.emit, socket, 'data');
    gradebookEvents.on('data', emit);
    socket.on('disconnect', function () {
        gradebookEvents.removeListener('data', emit);
    });
}

module.exports.pull = pullGrades;
module.exports.subscribe = subscribe;


