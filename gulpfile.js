'use strict';

var childProcess = require('child_process');
var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var os = require('os');
var bower = './bower_components';


var projectDir = jetpack;
var srcDir = projectDir.cwd('./javascripts');
var destDir = projectDir.cwd('./build');

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function (callback) {
    return destDir.dirAsync('.', { empty: true });
});


gulp.task('copy', function () {
    return projectDir.copyAsync('javascripts', destDir.path()+'/javascripts', {
        overwrite: true,
        matching: [
            '*.html',
            '*.css',
            '*.js',
            'main.js',
            'package.json'
        ]
    });
});


gulp.task('build', ['copy'], function () {
    return gulp.src('./index.html')
        .pipe(usemin({
			jsAttributes : {
				onload : "window.$ = window.jQuery = module.exports;",
			  },
            js2: [uglify()],
            js1: [uglify()],
			
        }))
        .pipe(gulp.dest('./build/'));
});
