module.exports = function( grunt ) {
	grunt.initConfig({
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: false,
				newcap: false,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				node: true,
				strict: false,
				esnext: true
			  },
			  files: {
				src: [
					"Gruntfile.js",
					"src/**/*.js"
				]
			}
		}
	});

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.registerTask( "default", "jshint" );
};