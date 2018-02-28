// Gruntfile.js
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		env : {
	    options : {
	      //Shared Options Hash
	    },
	    dev : {
	      NODE_ENV: 'development',
				PORT: 3000
	    }
	  },

		// JS TASKS ================================================================
		// check all js files for errors
		jshint: {
			//options: { 'loopfunc': true },
			options: {
				'multistr': true,
				"esversion": 6,
				"predef": ["-Promise"]
			},
			all: [ 'config/*.js', 'middleware/*.js', 'controllers/*.js']
		},

		// COOL TASKS ==============================================================
		// watch js files and process the above tasks
		watch: {
			js: {
				files: ['public/static/js/src/*.js'],
				tasks: ['jshint', 'uglify']
			},
			logic: {
				files: ['controllers/*.js'],
				tasks: ['jshint']
			}
		},

		// watch our node server for changes
		// https://github.com/ChrisWren/grunt-nodemon
		nodemon: {
			dev: {
				script: 'index.js'
			}
		},

		// run watch and nodemon at the same time
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	// register all task when we run grunt
	grunt.registerTask('default', ['env', 'jshint', 'concurrent']);

};
