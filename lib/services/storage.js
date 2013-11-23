/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/5/13
 * Time: 10:59 AM
 */
"use strict";

var mongoose = require('mongoose');
var Q = require('q');
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

module.exports.tailGrades = function () {
    return GradeLog.find().tailable().stream();
};

module.exports.getGradesHistory = function () {

    return Q.nbind(GradeLog.aggregate, GradeLog)([
        {$sort: {timestamp: -1}},
        {$match: {"grades.avg": {$exists: true}}},
        {$unwind: "$grades"},
        {$project: {
            date: {
                $add: [
                    {$multiply: [
                        {$year: "$timestamp"},
                        366
                    ]},
                    {$dayOfYear: "$timestamp"}
                ]
            },
            course: "$grades.course",
            timestamp: 1,
            avg: "$grades.avg",
            "_id": 0
        }},
        {$group: {
            "_id": {
                date: "$date",
                course: "$course"
            },
            grade: {$first: {timestamp: "$timestamp", avg: "$avg"}}
        }},
        {$project: {
            "course": "$_id.course",
            "timestamp": "$grade.timestamp",
            "avg": "$grade.avg"
        }},
        {$group: {
            "_id": "$timestamp",
            timestamp: {$first: "$timestamp"},
            grades: {$push: {course: "$course", avg: "$avg"}}
        }},
        {$sort: {timestamp: 1}},
        {$project: {_id: 0, timestamp: 1, grades: 1}}
    ]);
};