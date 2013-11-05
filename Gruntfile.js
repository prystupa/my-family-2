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
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'lib/public/css'
                }
            }
        },

        watch: {
            js: {
                files: ['lib/**/*.js'],
                tasks: ['jshint']
            },

            css: {
                files: ['sass/**/*.scss'],
                tasks: ['compass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'compass']);
};
