var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }})

  return gulp.src('app/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/stylesheets'))
  gulp.watch(['*.html', '*.coffee', 'stylesheets/*.css', 'scripts/*.js', 'scss/.scss'], {cwd: 'app'}, reload);
});