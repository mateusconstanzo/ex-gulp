var gulp       = require("gulp"),
    jshint     = require('gulp-jshint'),
    stylish    = require('jshint-stylish'),
    minifyHTML = require("gulp-minify-html"),
    concat     = require("gulp-concat"),
    uglify     = require("gulp-uglify"),
    cssmin     = require("gulp-cssmin"),
    clean      = require('gulp-clean');
 
var config = {
    paths: {
        dist: "build",
        html: {
            src:  ["src/html/**/*.html"],
            dest: "build"
        },
        javascript: {
            src:  ["src/js/**/*.js"],
            dest: "build/js"
        },
        css: {
            src: ["src/css/**/*.css"],
            dest: "build/css"
        }
    }
}

gulp.task('jshint', function() {
    return gulp.src(config.paths.javascript.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
 
gulp.task("html", function(){
    return gulp.src(config.paths.html.src)
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest));
});
 
gulp.task("scripts", function(){
    return gulp.src(config.paths.javascript.src)
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.javascript.dest));
});
 
gulp.task("css", function(){
    return gulp.src(config.paths.css.src)
        .pipe(cssmin())
        .pipe(gulp.dest(config.paths.css.dest));
});

gulp.task('clean', function () {
    return gulp.src(config.paths.dist)
        .pipe(clean());
});
 
gulp.task("build", ["jshint", "html", "scripts", "css"]);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});