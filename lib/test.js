/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/4/13
 * Time: 9:35 PM
 */

var webdriver = require('selenium-webdriver');

var builder = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.phantomjs());

var driver = builder.build();

var portprober = require('selenium-webdriver/net/portprober');
var port = portprober.findFreePort();
port.then(console.log, console.log);

setTimeout(function(){}, 10000);

var net = require('net');
function freePort(cb) {
    var server = net.createServer()
        , port = 0;
    server.on('listening', function() {
        port = server.address().port;
        server.close();
    });
    server.on('close', function() {
        cb(null, port);
    });
    server.listen(0);
}

freePort(console.log);