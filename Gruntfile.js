module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'public/dist/client/app.min.js': 'public/client/app.js',
          'public/dist/client/link.min.js': 'public/client/link.js',
          'public/dist/client/links.min.js': 'public/client/links.js',
          'public/dist/client/router.min.js': 'public/client/router.js',
          'public/dist/client/linkView.min.js': 'public/client/linkView.js',
          'public/dist/client/linksView.min.js': 'public/client/linksView.js',
          'public/dist/client/createLinkView.min.js': 'public/client/createLinkView.js',
          'public/dist/lib/backbone.min.js': 'public/lib/backbone.js',
          'public/dist/lib/underscore.min.js': 'public/lib/underscore.js',
          'public/dist/lib/jquery.min.js': 'public/lib/jquery.js',
          'public/dist/lib/handlebars.min.js': 'public/lib/handlebars.js'
        }
      }
    },

    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: ['public/dist/client/*.js', '!*/built.js'],
        dest: 'public/dist/client/built.js'
      },
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/client/**/*.js',
        'public/lib/**/*.js',
        '*.js',
        //'*.json'
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': 'public/style.css'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js'
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'eslint',
    'uglify',
    'cssmin',
    'concat'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);

  grunt.registerTask('default', [
    // add your default tasks here
  ]);

};
