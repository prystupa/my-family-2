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

        driver.get("http://google.com").then(function () {
            console.log("loaded google.com");
        }).then(function() {
                return driver.getTitle();
            }).then(function(title) {
                console.log("title is " + title);
            }).then(function() {
                driver.quit();
            }, function (e) {
                driver.quit();
                console.log("failed to load google.com " + e);
            });
    },

    subscribe: function (socket) {

    }
};


