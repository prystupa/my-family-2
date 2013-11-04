/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/4/13
 * Time: 10:10 AM
 */

var webdriver = require('selenium-webdriver');

module.exports = {

    pull: function () {
        var driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.phantomjs()).
            build();

        driver.getSession()
            .then(scrap)
            .then(null, function (e) {
                console.log("failed to load google.com " + e);
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


