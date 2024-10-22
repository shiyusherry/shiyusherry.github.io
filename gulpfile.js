var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var plugins = require('gulp-load-plugins')();

gulp.task('wiredep', function () {
  return gulp.src('src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('src'));
});

gulp.task('copy:sprite', ['copy:favicon'], function () {
  return gulp.src('./src/sprite/**/*')
    .pipe(gulp.dest('dist/sprite'));
});

gulp.task('copy:favicon', function () {
  return gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:video', function () {
  return gulp.src('./src/video/**/*')
    .pipe(gulp.dest('dist/video'));
});

gulp.task('clean:publish', function () {
  return gulp.src('.publish', { read: false })
    .pipe(plugins.rimraf());
});

gulp.task('clean:dist', function () {
  return gulp.src('dist', { read: false })
    .pipe(plugins.rimraf());
});

gulp.task('usemin', function () {
  return gulp.src('src/index.html')
    .pipe(plugins.usemin({
      css: [plugins.cssnano(), 'concat'],
      html: [plugins.htmlmin({ collapseWhitespace: true })],
      js: [plugins.uglify(), plugins.rev()],
      appjs: [plugins.uglify(), plugins.rev()],
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('ghPages', function () {
  return gulp.src('./dist/**/*')
    .pipe(plugins.ghPages({ branch: 'master' }));
});

gulp.task('build', function (cb) {
  plugins.sequence('clean:dist', 'wiredep', 'usemin', 'copy:sprite', 'copy:video', cb);
});

gulp.task('deploy', function (cb) {
  plugins.sequence('clean:publish', 'build', 'ghPages', cb);
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

gulp.task('default', ['build'], function () {
});
