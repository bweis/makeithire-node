const gulp = require('gulp');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const react = require('gulp-react');
const source = require('vinyl-source-stream');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');

const PATH_web_app = 'web-app/index.js';
const PATH_output = 'public/js/index.js';

gulp.task('lint', () => gulp.src([ '**/*.js', '!node_modules/**', '!web-app/**', !'public/**' ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('transform', () => {
  browserify(PATH_web_app)
    .transform(babelify, { presets: [ 'es2015', 'react' ] })
    .bundle()
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(plumber())
    .pipe(source(PATH_web_app))
    .pipe(rename(PATH_output))
    .pipe(gulp.dest(''));
});

// gulp.task('transform', () => {
//   gulp.src(PATH_web_app).pipe(babel( { presets: ['es2016', 'react'] } )).pipe(gulp.dest(PATH_output));
// })

gulp.task('watch', () => {
  gulp.watch('web-app/**/*.js', [ 'transform' ]);
});
