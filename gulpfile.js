var gulp = require('gulp');
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var fs = require('fs');
var path = require('path');
var url = require('url');
var data = require('./src/data/data.json')
gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('./dist'));
})
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
})
gulp.task('webserver', function() {
    return gulp.src('./src')
        .pipe(webserver({
            open: true,
            port: 3000,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                } else if (pathname === '/api/data') {
                    res.end(JSON.stringify({ code: 0, data: 1 }))
                } else {
                    var pathname = pathname === '/' ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
})
gulp.task('watch', function() {
    return gulp.watch(['./src/scss/*.scss', './src/js/*.js'], gulp.series(['scss', 'js']));
})
gulp.task('dev', gulp.series('scss', 'js', 'webserver', 'watch'));


function init() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var data = JSON.parse()
    }
    xhr.setRequestHeader('content-type', 'application/json')
}