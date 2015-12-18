var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    browserSync = require('browser-sync').create(),
    rev = require('gulp-rev'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('del', function(){
    return del(['public/build/**']);
});


gulp.task('sass-watch', function ()
{
    return gulp.src('resources/sass/styles.scss')
            .pipe(sass())
            .pipe(gulp.dest('public/css/'))
            .pipe(browserSync.stream());
});

gulp.task('js-watch', function ()
{
    return gulp.src('./resources/js/scripts.js')
            .pipe(gulp.dest('public/js'))
            .pipe(browserSync.stream());

});


gulp.task('sass', function ()
{
    return gulp.src('resources/sass/styles.scss')
            .pipe(sass())
            .pipe(gulp.dest('public/css/'))
            .pipe(rev())
            .pipe(gulp.dest('public/build/css'))
            .pipe(rev.manifest(
                    './public/build/assets.json', {
                    base: './public/build',
                    merge: true
                }
            ))
            .pipe(gulp.dest('./public/build'))
            .pipe(browserSync.stream());

});

gulp.task('js', function ()
{
    return gulp.src('./resources/js/scripts.js')
            .pipe(gulp.dest('public/js'))
            .pipe(rev())
            .pipe(gulp.dest('public/build/js'))
            .pipe(rev.manifest(
                    './public/build/assets.json', {
                        base: './public/build',
                        merge: true
                    }
            ))
            .pipe(gulp.dest('./public/build'))
            .pipe(browserSync.stream());

});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "getmaple.app"
    });
    gulp.watch('./resources/sass/**/*.scss', ['sass-watch']);
    gulp.watch('./resources/js/**/*.js', ['js-watch']);
});

gulp.task('watch', ['browser-sync']);

gulp.task('default', ['del', 'sass', 'js']);