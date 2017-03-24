const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint-js', () => {
  return gulp.src([
    '!**/node_modules/**',
    'lab*/**/*.js',
    'test/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint-js']);
