'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

var watchify = require('watchify');
var browserify = require('browserify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');

// custom browserify options
var customOpts = {
  entries: ['./js/app.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

gulp.task('js', bundle);

// on any dep update, runs the bundler
b.on('update', bundle); 
// output build logs to terminal
b.on('log', gutil.log); 

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
}

gulp.task('default', ['js'])
