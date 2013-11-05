/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/5/13
 * Time: 10:59 AM
 */

var logger = require('winston').loggers.get('services/storage');
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.storage.mongoUrl);

var gradeSchema = mongoose.Schema({
    course: String,
    avg: Number
}, {
    _id: false
});

var gradesLogSchema = mongoose.Schema({
    timestamp: Date,
    grades: [gradeSchema]
});

var GradeLog = mongoose.model('GradeLog', gradesLogSchema);


module.exports.saveGrades = function (grades) {
    new GradeLog(grades).save(function (err) {
        if (err) {
            logger.error("error saving grade log to store: " + err);
        } else {
            logger.debug("stored grade log to MongoDb");
        }
    });
};
