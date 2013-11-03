/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/3/13
 * Time: 10:34 AM
 */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'lib/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
