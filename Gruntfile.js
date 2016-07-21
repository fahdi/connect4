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
        jade: {
            compile: {
                options: {
                    pretty: true,
                },
                files: {
                    'index.html': 'index.jade'
                }
            }
        },
        watch: {
            scripts: {
                files: ['sass/*.scss', '*.jade'],
                tasks: ['compass', 'jade'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('default', ['compass', 'jade']);
    // Default task.
};


//TODO: Improve and test this for a solid build directory