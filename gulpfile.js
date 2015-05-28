'use strict';

var gulp         = require('gulp');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var stylus       = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var rupture      = require('rupture');
var rename       = require('gulp-rename');
var sequence     = require('run-sequence');
var ngAnnotate   = require('gulp-ng-annotate');
var uglify       = require('gulp-uglify');
var gutil        = require('gulp-util');
var minifyCss    = require('gulp-minify-css');
var buffer       = require('gulp-buffer');
var statik       = require('statik');
var notifier     = require('stream-notifier');
var watchify     = require('watchify');

var production = process.env.NODE_ENV === 'production';

gulp.task('browserify', function() {
  var bundler = browserify('./src/main');
  var bundle = compileBundle(bundler);

  return bundle();
});

gulp.task('watchify', function() {
  var opts = watchify.args;
  opts.debug = true;

  var bundler = watchify(browserify('./src/main', opts));
  var bundle = compileBundle(bundler);
  bundler.on('update', bundle);

  return bundle();
});

gulp.task('styles', function() {
  var n = notifier('styles');

  return gulp
    .src('src/styles/main.styl')
    .pipe(stylus({
      'use': [rupture()],
      'import': [
        '../../bower_components/normalize.css/normalize.css',
        '../../bower_components/AnimateTransition/css/transitions.css',
        '../../bower_components/tooltipster/css/tooltipster.css'
      ],
      'include css': true
    }))
    .on('error', n.error)
    .pipe(autoprefixer())
    .pipe(production ? minifyCss() : gutil.noop())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist'))
    .on('end', n.end);
});

gulp.task('views', function() {
  var n = notifier('views');

  return gulp
    .src(['src/**/*.html', 'src/**/*.svg'])
    .pipe(gulp.dest('dist'))
    .on('end', n.end);
});

gulp.task('serve', function() {
  statik({ port: 3000, root: 'dist' });
});

gulp.task('watch', ['watchify'], function() {
  gulp.watch('src/**/*.styl', ['styles']);
  gulp.watch(['src/**/*.html', 'src/**/*.svg'], ['views']);
});

gulp.task('build', ['browserify', 'styles', 'views']);

gulp.task('default', function(cb) {
  sequence('build', 'serve', 'watch', cb);
});

function compileBundle(bundler) {
  return function() {
    var n = notifier('browserify');

    return bundler
      .bundle()
      .on('error', n.error)
      .pipe(source('app.js'))
      .pipe(production ? buffer() : gutil.noop())
      .pipe(production ? ngAnnotate() : gutil.noop())
      .pipe(production ? uglify() : gutil.noop())
      .pipe(gulp.dest('dist'))
      .on('end', n.end);
  };
}
