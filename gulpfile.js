// Code pieced together from 
// https://css-tricks.com/gulp-for-beginners/
// https://scotch.io/tutorials/how-to-use-browsersync-for-faster-development
// https://travismaynard.com/writing/getting-started-with-gulp

// gulpfile updated to work with gulp 4 (gulp.task + gulp.series)
// https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/
// https://github.com/gulpjs/gulp/blob/4.0/docs/recipes/minimal-browsersync-setup-with-gulp4.md

// Include gulp
var gulp = require('gulp');

// Include plugin
var browserSync = require('browser-sync').create(); // create a browser sync instance.

// Development Tasks 

// Start BrowserSync server
function serve(done) {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  gulp.watch('app/*.html', reload);
  gulp.watch('app/css/*.css', reload); 
  gulp.watch('app/js/*.js', reload); 
}

// Default Task
gulp.task('default', gulp.series(serve, watch));