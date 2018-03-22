const gulp = require('gulp')
const eslint = require('gulp-eslint')
const rename = require('gulp-rename')
const source = require('vinyl-source-stream')
const plumber = require('gulp-plumber')
const babelify = require('babelify')
const browserify = require('browserify')

const PATH_web_app = 'web-app/Main.js'
const PATH_output = 'public/js/app.js'

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!web-app/**', '!public/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('transform', function () {
  process.env.NODE_ENV = 'production'
  const pipe = browserify(PATH_web_app)
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .on('error', function (err) {
      console.log(err)
    })
    .pipe(plumber())
    .pipe(source(PATH_web_app))
    .pipe(rename(PATH_output))
    .pipe(gulp.dest(''))
})

gulp.task('watch', function () {
  gulp.watch('web-app/**/*.js', ['transform'])
})
