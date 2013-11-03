/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/3/13
 * Time: 3:36 PM
 */

var Heroku = require('heroku-client');
var q = require('q');

module.exports = function (socket) {
    "use strict";

    function getLatestRelease(releases) {
        console.log(releases);
    }

    var heroku = new Heroku({token: process.env.HEROKU_API_TOKEN});
    heroku.apps(process.env.HEROKU_APP).releases().list()
        .then(getLatestRelease);
};
