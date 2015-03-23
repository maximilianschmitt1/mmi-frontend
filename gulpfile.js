'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var sequence = require('run-sequence');
var statik = require('statik');

gulp.task('scripts', function() {
  var b = browserify('./src/scripts/main', { debug: true });
  return b.bundle().pipe(source('app.js')).pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  return gulp
    .src('src/styles/main.styl')
    .pipe(stylus({
      'import': '../../bower_components/angular-material/angular-material.css',
      'include css': true
    }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
  return gulp
    .src('src/views/**/*.html')
    .pipe(gulp.dest('dist/views'));
});

gulp.task('copy-index', function() {
  return gulp
    .src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
  statik({ port: 3000, root: 'dist' });
});

gulp.task('watch', function() {
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/styles/**/*.styl', ['styles']);
  gulp.watch('src/views/**/*.html', ['views']);
  gulp.watch('src/index.html', ['copy-index']);
});

gulp.task('build', ['scripts', 'styles', 'views', 'copy-index']);

gulp.task('default', function(cb) {
  sequence('build', 'serve', 'watch', cb);
});