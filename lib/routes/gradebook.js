/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/4/13
 * Time: 10:10 AM
 */
"use strict";

var logger = require('winston').loggers.get('routes/gradebook');
var _ = require('lodash');
var storage = require('../services/storage');

var gradebookStream = storage.tailGrades();

gradebookStream.on('error', _.bind(logger.error, logger, 'gradebook-error'));
gradebookStream.on('close', _.bind(logger.debug, logger, 'gradebook-close'));

function subscribe(socket) {
    function emit(grades) {
        socket.emit('data', interpretGrades(grades));
    }

    storage.getGradesHistory().then(function (history) {
        history.forEach(emit);
    }).done();
    gradebookStream.on('data', emit);
    socket.on('disconnect', function () {
        gradebookStream.removeListener('data', emit);
    });
}

function interpretGrades(snapshot) {
    logger.debug('interpreting grades');

    return _.extend(snapshot, {
        timestamp: snapshot.timestamp.valueOf(),
        grades: snapshot.grades.map(function (grade) {
            var avg = grade.avg;
            var warning = avg < 90;
            var danger = avg < 80;

            return _.extend(grade, {
                context: danger ? "danger" : (warning ? "warning" : "")
            });
        })
    });

}

module.exports.subscribe = subscribe;


