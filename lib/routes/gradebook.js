/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/4/13
 * Time: 10:10 AM
 */

var logger = require('winston').loggers.get('routes/gradebook');
var webdriver = require('selenium-webdriver');

module.exports = {

    pull: function (port) {
        var address = 'http://localhost:' + port + '/wd/hub';
        logger.debug("Connecting to phantomjs using " + address);

        var driver = new webdriver.Builder().
            usingServer(address).
            withCapabilities(webdriver.Capabilities.phantomjs()).
            build();

        driver.getSession()
            .then(scrap)
            .then(null, function (e) {
                logger.error("failed to load google.com " + e);
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


