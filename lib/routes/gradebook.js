/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/4/13
 * Time: 10:10 AM
 */

var logger = require('winston').loggers.get('routes/gradebook');
var webdriver = require('selenium-webdriver');
var _ = require('lodash');

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
            return driver.get("http://google.com")
                .then(getTitle)
                .then(console.log);
        }

        function getTitle() {
            return driver.getTitle();
        }
    },

    subscribe: function (socket) {

    }
};


