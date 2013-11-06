/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 11/3/13
 * Time: 10:34 AM
 */
"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            node: {
                src: ['Gruntfile.js', 'lib/**/*.js'],
                options: {
                    strict: true,
                    undef: true,
                    unused: true,
                    node: true,
                    ignores: ['lib/public/**/*.js']
                }
            },

            browser: {
                src: ['lib/public/**/*.js'],
                options: {
                    strict: true,
                    undef: true,
                    unused: true,
                    browser: true,
                    globals: {
                        require: true,
                        define: true
                    }
                }
            }
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
    grunt.registerTask('postdeploy', ['compass']);
};
