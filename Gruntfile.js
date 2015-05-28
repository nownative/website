module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		copy: {
			assets: { expand: true, cwd: 'assets/', src: ['css/**','fonts/**','img/**'], dest: 'build/assets'},
		},
		
		clean: ["./build"],

		includes: {
			files: {
				cwd:'assets/html',
				src: [
					'index.html'
				],
				dest: 'build',
				flatten: false,
				options: {
					silent: true
				}
			}
		},

		s3: {
			options: {
				region: 'eu-west-1',
				access: 'public-read',
				debug: false
			},
			production: {
				options: {
					//NB: you can hardcode AWS access key/secret pairs here. but be careful - you could compromise your AWS account if it goes public.
					key: process.env.key,
					secret: process.env.secret,
					bucket: 'nownative.com',
					maxOperations: 1
				},
				sync: [{
					src: 'build/**/*.*',
					dest: '/',
					rel: 'build',
					options: {
						verify: true
					}
				}]
			}
		},

		less: {
			build: {
				options: {
					compress: true,
				},
				files: {
					"./build/assets/css/style.css": "./less/main.less",
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-s3');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-includes');

	grunt.registerTask('build', 'Run build process', function(target) {
		grunt.task.run(['clean','less','copy','includes']);
	});

	grunt.registerTask('production', 'Build and deploy', function(target) {
		grunt.log.ok("Deploying to production...");
		grunt.task.run(['build','s3']);  
	});

};