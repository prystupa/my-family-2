/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/3/13
 * Time: 3:36 PM
 */

var Heroku = require('heroku-client');
var Q = require('q');

module.exports = function (socket) {
    "use strict";

    var heroku = new Heroku({token: process.env.HEROKU_API_TOKEN});
    var app = process.env.HEROKU_APP;

    function listReleases() {
        return heroku.apps(app)
            .releases()
            .list();
    }

    function getLatestRelease(releases) {
        return releases.sort(function (a, b) {
            return a.version - b.version;
        }).pop();
    }

    function getReleaseInfo(release) {
        var version = release.version;
        var slugId = release.slug.id;
        return heroku.get('/apps/' + app + "/slugs/" + slugId).then(function (slug) {
            return "v" + version + "-" + slug.commit.substr(0, 5);
        });
    }

    function send(info) {
        socket.emit('data', info);
    }

    new Q().then(listReleases)
        .then(getLatestRelease)
        .then(getReleaseInfo)
        .then(send)
        .fail(function (error) {
            console.log(error);
            socket.emit('data', 'n/a');
        });
};
