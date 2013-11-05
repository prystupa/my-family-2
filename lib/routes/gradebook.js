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
var config = require('../config');

module.exports = {

    pull: function (port) {
        var address = 'http://localhost:' + port + '/wd/hub';
        logger.debug("Connecting to webdriver server using " + address);

        var driver = new webdriver.Builder().
            usingServer(address).
            build();

        driver.getSession()
            .then(scrap)
            .then(_.bind(driver.quit, driver), function (e) {
                logger.error("scrapping gradebook failed" + e);
                driver.quit();
            });

        function scrap() {
            var portal = new ParentsPortal(driver, config.scrapping.parentsPortal);
            return portal.loadSite()
                .then(portal.login)
                .then(portal.loadGradebook)
                .then(portal.scrapeGrades)
                .then(console.log);
        }
    },

    subscribe: function (socket) {

    }
};


