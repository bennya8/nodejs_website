module.exports = function (grunt) {

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/libs",
                    optimize: "uglify",
                    mainConfigFile: "public/libs/config.js",
                    dir: "public/dist",
                    optimizeCss: "standard",
                    modules: [
                        {name: "admin/game/index"}
                    ]
                }
            }
        },

        watch: {
            ejs: {
                files: ['views/**'],
                watchedExtensions: ['ejs'],
                options: {
                    livereload: true
                }
            }
        },

        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    ignoredFiles: ['README.md', '.DS_Store', '.idea'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['routes', 'models', 'helper'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.option('force', true);
    grunt.registerTask('default', 'concurrent');
};
