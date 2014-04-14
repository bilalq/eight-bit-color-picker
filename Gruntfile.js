/* jshint node: true, browser: false */

module.exports = function(grunt) {
  'use strict';

  /**
   * Load all Grunt tasks from package.json
   */
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Pre-process CSS with Compass
     */
    compass: {
      lib: {
        options: {
          sassDir: 'lib/styles',
          cssDir: 'dist/css'
        }
      }
    },

    /**
     * Copy task to bring libs over to dist foler
     */
    copy: {
      all: {
        files: [
          { expand: true, cwd: 'lib/styles/',  src: ['**'], dest: 'dist/scss/', filter: 'isFile' },
          { expand: true, cwd: 'lib/scripts/', src: ['**'], dest: 'dist/js/',   filter: 'isFile' }
        ]
      }
    },

    /**
     * Clean task to empty the dist directory
     */
    clean: ['dist/*']
  })

  /**
   * For now, just compile SCSS and copy stuff to dist
   */
  grunt.registerTask('default', ['clean', 'compass', 'copy:all'])
}
