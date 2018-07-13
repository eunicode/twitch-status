// Code pieced together from 
// https://css-tricks.com/gulp-for-beginners/
// https://scotch.io/tutorials/how-to-use-browsersync-for-faster-development
// https://travismaynard.com/writing/getting-started-with-gulp

// gulpfile updated to work with gulp 4 (gulp.task + gulp.series)
// https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/

// Include gulp
var gulp = require('gulp');

// Include plugin
var browserSync = require('browser-sync').create(); // create a browser sync instance.

// Development Tasks 

// Start BrowserSync server
// To trigger this command, from the terminal run `gulp browserSync`
// BrowserSync monitors the directory defined in baseDir and whenever we run the command, the page reloads.
gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    });
  });

// Watch for files changes and reload   
gulp.task('watch', gulp.series('browserSync', function() {
    gulp. watch('app/*.html', browserSync.reload);
    gulp.watch('app/css/*.css', browserSync.reload); 
    gulp.watch('app/js/*.js', browserSync.reload); 
}));

// Default Task
gulp.task('default', gulp.series('watch'));