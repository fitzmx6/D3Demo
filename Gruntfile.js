module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Read local JSON config into Variable
    var setting = '';
    if (grunt.file.exists('local.json')) {
        setting = grunt.file.readJSON('local.json');
    } else {
        setting = false;
    }

    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        setting : setting,

        banner: '/*!\n' +
                ' * <%= pkg.name %> - <%= grunt.template.today("yyyy") %> \n' +
                ' * Version <%= pkg.version %>\n' +
                ' */\n',

        assemble: {
            options: {
                prettify: {
                    indent: 2
                },
                marked: {
                    sanitize: false
                },
                production: true,
                data: 'website/Page/**/*.{json,yml}',
                layoutdir: 'website/Page/Layouts',
                partials: [
                    'website/Page/Partials/**/*.hbs'
                ]
            },
            site: {
                options: {
                    layout: 'Default.hbs'
                },
                files: [{
                    expand: true,
                    cwd: 'website/Page/Sites',
                    src: [
                        '*.hbs'
                    ],
                    dest: 'public/'
                }]
            }
        },

        clean: {
            js: [
                'public/js/d3.js',
                'public/js/modernizr.js'
            ],
            css: [
                'public/css/d3.css'
            ],
            docu: [
                'website/Documentation/**/*'
            ],
            site: [
                'public/**/*.{html,md}'
            ]
        },

        concat : {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
            },
            main : {
                src : [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/BrowserDetection.js/BrowserDetection.js',
                    'bower_components/respond/dest/respond.src.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'website/JavaScript/Main.js',
                    'website/JavaScript/d3.js'
                ],
                dest : 'public/js/d3.js'
            }
        },

        copy : {
            dev : {
                files : [{
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src : '*',
                        dest : 'public/fonts/'
                    },{
                        expand: true,
                        cwd: 'bower_components/modernizr/',
                        src : 'modernizr.js',
                        dest : 'public/js/'
                    }
                ]
            },
            dist : {
                files : [{
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src : '*',
                        dest : 'public/fonts/'
                    },{
                        expand: true,
                        cwd: 'bower_components/selectivizr/',
                        src : 'selectivizr.js',
                        dest : 'public/js/'
                    },{
                        expand: true,
                        cwd: 'bower_components/css3pie/',
                        src : 'PIE.js',
                        dest : 'public/js/'
                    },{
                        expand: true,
                        cwd: 'bower_components/css3pie/',
                        src : 'PIE.htc',
                        dest : 'public/js/'
                    },{
                        expand: true,
                        cwd: 'bower_components/background-size-polyfill/',
                        src : 'backgroundsize.min.htc',
                        dest : 'public/js/'
                    },{
                        expand: true,
                        cwd: 'bower_components/box-sizing-polyfill/',
                        src : 'boxsizing.htc',
                        dest : 'public/js/'
                    },{
                        expand: true,
                        cwd: 'bower_components/modernizr/',
                        src : 'modernizr.js',
                        dest : 'public/js/'
                    }
                ]
            }
        },

        devUpdate: {
            show: {
                options: {
                    updateType: 'report',
                    reportUpdated: true,
                    packages: {
                        devDependencies: true,
                        dependencies: true
                    },
                    packageJson: null
                }
            },
            install: {
                options: {
                    updateType: 'force',
                    reportUpdated: false,
                    semver: false,
                    packages: {
                        devDependencies: true,
                        dependencies: false
                    },
                    packageJson: null
                }
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'public',
                src: [
                    '**/*.html'
                ],
                dest: 'public/'
            }
        },

        jsdoc : {
            dist : {
                src: [
                    'website/JavaScript/**/*.js'
                ],
                options: {
                    destination: 'website/Documentation/jsdoc'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: 'website/JavaScript/.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: [
                    'website/JavaScript/**/*.js'
                ]
            }
        },

        markdown: {
            all: {
                options: {
                    markdownOptions: {
                        gfm: true
                    }
                },
                files: [
                    {
                        src: 'README.md',
                        dest: 'website/Documentation/ProjectReadMe.html'
                    }
                ]
            }
        },

        notify: {
            css: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'CSS ready'
                }
            },
            js: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JavaScript ready'
                }
            },
            dev: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'Grunt has create development environment'
                }
            },
            hbs: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'Handlebars ready'
                }
            },
            all: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'Grunt build all for a Release'
                }
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: '<%= pkg.name %>'
            }
        },

        recess: {
            options: {
                compile: false,
                compress: true,
                banner: '<%= banner %>'
            },
            main: {
                src: [
                    'public/css/d3.css'
                ],
                dest: 'public/css/d3.min.css'
            }
        },

        replace: {
            dev: {
                src: [
                    'public/**/*.html'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: /<link[^>]*min[.]css"*(( )?[a-zA-Z="]*)?>/g,
                        to: function (MatchedWord) {
                            return MatchedWord.replace('.min.css', '.css');
                        }
                    }, {
                        from: /<script[^>]*min[.]js">/g,
                        to: function (MatchedWord) {
                            return MatchedWord.replace('.min.js', '.js');
                        }
                    }
                ]
            },
            build: {
                src: [
                    'public/**/*.html'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: /<link[^>]*([a-zA-Z0-9\-._]?\w+(?!.min)\w)([a-zA-Z0-9\-_]*\w+(?!.min)\w)(.css)"*(( )?[a-zA-Z="]*)?>/g,
                        to: function (MatchedWord) {
                            return MatchedWord.replace('.css', '.min.css');
                        }
                    }, {
                        from: /<script[^>]*([a-zA-Z0-9\-._]?\w+(?!.min)\w)([a-zA-Z0-9\-_]*\w+(?!.min)\w)(.js)">/g,
                        to: function (MatchedWord) {
                            return MatchedWord.replace('.js', '.min.js');
                        }
                    }
                ]
            }
        },

        uglify : {
            options : {
                banner : '<%= banner %>',
                report : 'min'
            },
            Modernizr : {
                src : 'bower_components/modernizr/modernizr.js',
                dest : 'public/js/modernizr.min.js'
            },
            main : {
                src : 'public/js/d3.js',
                dest : 'public/js/d3.min.js'
            }
        },

        connect: {
            options: {
                port: setting.port,
                open: true,
                livereload: 35729,
                hostname: 'http://localhost:8080'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('public')
                        ];
                    }
                }
            }
        },
        watch : {
            options: {
                livereload: true,
                interval: 1223
            },
            js: {
                files: '<%= jshint.src.src %>',
                tasks: [
                    'jshint:src',
                    'clean:js',
                    'copy:dev',
                    'concat',
                    'notify:js'
                ]
            },
            hbs: {
                files: [
                    'website/Page/**/*.hbs',
                    'website/Page/**/*.json',
                    'website/Page/**/*.yml'
                ],
                tasks: [
                    'clean:site',
                    'assemble',
                    'replace:dev',
                    'notify:hbs'
                ]
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'public/{,*/}*.html',
                    'public/css/{,*/}*.css',
                    'public/js/{,*/}*.js',
                    'public/images/{,*/}*'
                ]
            }
        }

    });

    grunt.loadNpmTasks('assemble');
    grunt.task.run('notify_hooks');

    grunt.registerTask('distribute-js', [
        'concat',
        'uglify'
    ]);
    grunt.registerTask('distribute-css', [
        'recess'
    ]);
    grunt.registerTask('distribute-files', [
        'distribute-css',
        'distribute-js'
    ]);

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('doc', ['jsdoc', 'markdown']);

    grunt.registerTask('build', [
        'test',
        'clean:css',
        'clean:js',
        'distribute-files',
        'copy:dist'
    ]);

    grunt.registerTask('serve', [
        'clean:css',
        'clean:js',
        'concat',
        'clean:site',
        'assemble',
        'replace:dev',
        'copy:dev',
        'connect:livereload',
        'notify:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build',
        'clean',
        'assemble',
        'replace:build',
        'htmlmin',
        'doc',
        'notify:all'
    ]);

};