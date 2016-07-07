/*
 * grunt-buddha
 * 
 *
 * Copyright (c) 2016 myc
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('replace', 'replace every string in the file', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      regx: null,
      replacement: null
    });
    var regx = options.regx,
      replacement = options.replacement;
    if (!regx) {
      // if regx is null, quit task
      grunt.log.warn('regexpresion is undefined');
      return;
    }
    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      // Concat specified files.
      file.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {

          return true;
        }
      }).map(function(filepath) {
        grunt.log.writeln('replacing from file: ' + filepath + '>>>');
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
          newFileContent = originalFileContent,
          i = 0;
        regx.forEach(function(regp) {
          if (i > regx.length) i = 0;
          newFileContent = newFileContent.replace(regp, replacement[i]);
          // grunt.log.writeln('Contents match "' + regp + '" have been modified with "' + replacement[i] + '"');
          i++;
        })
        return grunt.file.write(filepath, newFileContent);
      });

      // Print a success message.
      // grunt.log.writeln('Contents match "' + regx + '" have been modified with "' + replacement + '"');
    });
  });

};