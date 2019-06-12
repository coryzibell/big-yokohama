import gulp from 'gulp'
import postcss from 'gulp-postcss'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import del from 'del'

const paths = {
  styles: {
    src: 'pcss/app.pcss',
    dest: 'web/dist/styles'
  },
  app: {
    src: 'js/app.js',
    dest: 'web/dist/scripts'
  },
  bundle: {
    src: 'components/**/*.js',
    dest: 'web/dist/scripts'
  }
}

export const clean = () => del([ 'web/dist' ])

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(postcss())
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

export function app() {
  return gulp.src(paths.app.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(paths.app.dest))
}

export function bundle() {
  return gulp.src(paths.bundle.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest(paths.bundle.dest))
}

export function watch() {
  gulp.watch(paths.scripts.src, app)
  gulp.watch(paths.scripts.src, bundle)
  gulp.watch(paths.styles.src, styles)
}

const build = gulp.series(clean, gulp.parallel(styles, app, bundle))

export default build