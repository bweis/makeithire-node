const gulp = require('gulp');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const react = require('gulp-react');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const PATH_web_app = 'web-app/index.js';
const PATH_output = 'index.js';

gulp.task('lint', () => gulp.src([ '**/*.js', '!node_modules/**', '!web-app/**', !'public/**' ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('sm', () => {
  browserify(PATH_web_app)
    .transform(babelify, { presets: [ 'es2015', 'react' ], sourceMaps: true })
    .bundle()
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(source(PATH_web_app))
    .pipe(rename(PATH_output))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('transform', () => {
  browserify(PATH_web_app)
    .transform(babelify, { presets: [ 'es2015', 'react' ] })
    .bundle()
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(source(PATH_web_app))
    .pipe(rename(PATH_output))
    .pipe(gulp.dest('public/js'));
});


gulp.task('watch', () => {
  gulp.watch('web-app/**/*.js', [ 'transform' ]);
});
