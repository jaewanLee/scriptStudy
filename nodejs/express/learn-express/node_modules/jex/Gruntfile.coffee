module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      lib:
        expand: true
        cwd: 'src/main'
        src: [ '**/*.coffee']
        dest: 'lib'
        ext: '.js'
      tests:
        expand: true
        cwd: 'src/test'
        src: [ '**/*.coffee']
        dest: 'test'
        ext: '.js'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  
  grunt.registerTask 'default', [ 'coffee:lib' ]
  grunt.registerTask 'tests', [ 'coffee:tests' ]
