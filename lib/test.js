/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/4/13
 * Time: 9:35 PM
 */

var webdriver = require('selenium-webdriver');

var builder = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.phantomjs());

//var driver = builder.build();

var portprober = require('selenium-webdriver/net/portprober');
var port = portprober.findFreePort();
port.then(console.log);

setTimeout(function(){}, 10000);