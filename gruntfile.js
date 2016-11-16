module.exports = function(grunt){
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		processhtml: {
			dist: {
			files: {
				'./UI/index.html': ['./UI/index.html']
			}
			}
		},		
        concat: {
            js: { //target
                src: ['./UI/scripts/app/app.js','./UI/scripts/app/services/*.js','./UI/scripts/app/controllers/*.js','./UI/scripts/app/directives/*.js','./UI/scripts/app/filters/*.js'],
                dest: './UI/scripts/app.min.js'
            }
        },
        uglify: {
            js: { //target
                src: ['./UI/scripts/app.min.js'],
                dest: './UI/scripts/app.min.js'
            }
        }
          //grunt task configuration will go here
    });

	//load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-processhtml');

    //register grunt default task
    grunt.registerTask('default', ['concat', 'uglify', 'processhtml']);
}




