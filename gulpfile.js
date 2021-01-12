'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    del = require('del'),
    fs = require('fs'),
    path = require('path'),
    gulpUtil = require('gulp-util');

var basePaths = {
    src: 'resources/assets/',
    dest: 'public/',
    lib: 'bower_components/'
},
    paths = {
        images: {
            src: basePaths.src + 'img',
            dest: basePaths.dest + 'img'
        },
        scripts: {
            src: basePaths.src + 'js',
            dest: basePaths.dest + 'js'
        },
        styles: {
            src: basePaths.src + 'css',
            dest: basePaths.dest + 'css'
        }
    };

var tasks = [
    {
        name: 'default',
        dependencies: [
            'scripts',
            'styles',
            'images'
        ],
        callback: main
    },
    {
        name: 'scripts',
        dependencies: [],
        callback: scripts
    }, {
        name: 'images',
        dependencies: [],
        callback: images
    }, {
        name: 'styles',
        dependencies: [],
        callback: styles
    }, {
        name: 'watch',
        dependencies: [],
        callback: watch
    }, {
        name: 'clean',
        dependencies: [],
        callback: clean
    }];

tasks.forEach(function(task) {
    gulp.task(
        task.name,
        task.dependencies,
        task.callback
    );
});

function clean() {
    del.sync(basePaths.dest);
}

function scripts() {
    var folders = traverse(paths.scripts.src);
    folders.map(function(folder) {
        return gulp.src(path.join(paths.scripts.src, folder, '/**/*.js'))
            .pipe(concat(folder + '.js'))
            .pipe(uglify().on('error', gulpUtil.log))
            .pipe(rename(folder + '.min.js'))
            .pipe(gulp.dest(paths.scripts.dest));
    });
}

function images() {
    gulp.src(paths.images.src + '/**/*.*')
        .pipe(gulp.dest(paths.images.dest));

}

function main() {}

function styles() {
    var folders = traverse(paths.styles.src);
    folders.map(function(folder) {
        return gulp.src(path.join(paths.styles.src, folder, '/**/*.css'))
            .pipe(concat(folder + '.css'))
            .pipe(cssmin())
            .pipe(rename(folder + '.min.css'))
            .pipe(gulp.dest(paths.styles.dest));
    });
}

function watch() {
    gulp.watch(paths.scripts.src + '/**/*.js', ['scripts']);
    gulp.watch(paths.styles.src + '/**/*.css', ['styles']);
}

function traverse(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}
