var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash/assign');
var browserSync = require('browser-sync');
var del = require('del');
var typescript = require('typescript');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var bundleConfig = {
    entries: ['./src/js/bundle.tsx'],
    debug: true,
    extension: ['.js', '.ts', '.tsx'],
    outputName: 'bundle.js',
    jsx: 'react'
};

var opts = assign({}, watchify.args, bundleConfig);
var b = watchify(browserify(opts)
    .plugin(tsify, {
        noImplicitAny: true,
        jsx: opts.jsx,
        typescript: typescript
    }));

b.on('log', gutil.log);

/**
 * This task removes all files inside the 'dist' directory.
 */
gulp.task('clean', function() {
    del.sync('./dist/**/*');
});


gulp.task('sass', ['clean'], function() {
    return gulp.src('./src/css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist'));
});

gulp.task('assets', ['sass'], function() {
    return gulp.src(['./src/assets/**'])
        .pipe(plumber())
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('index', ['assets'], function() {
    return gulp.src(['./src/index.html'])
        .pipe(plumber())
        .pipe(gulp.dest('./dist'));
});

gulp.task('bundle', ['index'], function() {
    return b.bundle()
        .on('error', function(err) {
            console.log(err.message);
            browserSync.notify(err.message, 3000);
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['bundle'], function() {
    var watcher = gulp.watch('./src/**/*', ['refresh']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type +
            ', running tasks...');
    });
});


gulp.task('browser-sync', ['watch'], function() {
    return browserSync({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('default', ['browser-sync']);

gulp.task('refresh', ['bundle'], browserSync.reload);
