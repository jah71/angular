const gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    modRewrite = require('connect-modrewrite'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    openbrowser = require('gulp-open');

gulp.task('lint', function() {
    return gulp.src('web/scripts/*.js')
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('./dist/web/scripts/'))
    .pipe(connect.reload());
});

gulp.task('test', function() {

});

gulp.task('styles', function() {
    return gulp.src('web/styles/*.css')
    .pipe(gulp.dest('./dist/web/styles/'))
    .pipe(connect.reload());
});

gulp.task('copyhtml', function() {
    return gulp.src('web/*.html')
    .pipe(gulp.dest('./dist/web/'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['web/*.html'], ['copyhtml']);
    gulp.watch(['web/styles/*.css'], ['styles']);
    gulp.watch(['web/scripts/*.js'], ['lint']);
});

gulp.task('webserver', function() {
    var options = {
        port: 8080,
        livereload: true,
        root: 'dist/',
        middleware: function () {
          return [
            modRewrite([
              '^widget?$ http://localhost:8882/widget [p]'
            ])
          ];
        }
    };
    connect.server(options);
});

gulp.task('open', ['webserver'], function() {
    return gulp.src(__filename)
    .pipe(openbrowser({
        uri: 'http://localhost:8080/web'
    }));
});

gulp.task('dev', ['copyhtml', 'styles', 'lint', 'open', 'watch', 'test'], function() {});
