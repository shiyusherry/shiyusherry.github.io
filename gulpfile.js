var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var plugins = require('gulp-load-plugins')();

gulp.task('wiredep', function () {
  return gulp.src('src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('src'));
});

gulp.task('serve', ['wiredep'], function () {
  gulp.src('src')
    .pipe(plugins.webserver({
      host: 'localhost',
      port: 8080,
      directoryListing: false,
      livereload: true
    }));
});