const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const htmlhint = require('gulp-htmlhint');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

// Static server & watching scss/html files
gulp.task('watch', ['html', 'sass', 'js', 'img'], () => {
  browserSync.init({
    server: './public/',
  });

  gulp.watch('./scss/**/*.scss', ['sass'], browserSync.reload);
  gulp.watch('./html/*.html', ['html'], browserSync.reload);
  gulp.watch('./js/**/*.js', ['js'], browserSync.reload);
});

gulp.task('html', () => {
  return gulp
    .src('./html/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter('htmlhint-stylish'))
    .pipe(
      htmlhint.failReporter({
        supress: true,
      })
    )
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp
    .src('./js/**/*.js')
    .pipe(
      babel({
        presets: ['env'],
      })
    )
    .pipe(
      browserify({
        insertGlobals: true,
        debug: !gulp.env.production,
      })
    )
    .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.stream());
});

gulp.task('img', () => {
  gulp.src('./images/*').pipe(gulp.dest('./public/images'));
});

gulp.task('default', ['watch']);
