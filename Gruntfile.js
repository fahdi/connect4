module.exports = function (grunt) {
    grunt.initConfig({
        compass: {                              // Task
            dist: {                             // Target
                options: {
                    config: 'config.rb'         // loading options from external file
                }
            },
            dev: {                              // Another target, can be used for not uglifying etc
                options: {
                    sassDir: 'sass',
                    cssDir: 'stylesheets'
                }
            }
        },
        watch: {
            scripts: {
                files: 'sass/*.scss',
                tasks: ['compass'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['compass']);

};