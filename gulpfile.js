const gulp = require('gulp')
const eslint = require('gulp-eslint')
const clear = require('clear')
const {rollup} = require('rollup')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

const moduleName = 'LazyLoadImg'
const destName = 'lazy-load-img'
// 检测代码风格
gulp.task('lint', () => {
  clear()
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
// 编译开发版本
gulp.task('build:dev', ['lint'], () => {
  return rollup({
    entry: 'src/index.js',
    plugins: [babel()]
  })
    .then((bundle) => {
      bundle.write({
        moduleName,
        format: 'umd',
        dest: `dist/${destName}.js`,
        sourceMap: true
      })
    })
})

// 编译生产版本
gulp.task('build:prod', ['lint'], () => {
  return rollup({
    entry: 'src/index.js',
    plugins: [babel(), uglify()]
  })
    .then((bundle) => {
      bundle.write({
        moduleName,
        format: 'umd',
        dest: `dist/${destName}.min.js`,
        sourceMap: true
      })
    })
})

gulp.task('default', ['lint', 'build:dev', 'build:prod'])
gulp.watch(['**/**.js', '!node_modules/**', '!dist/**'], ['default'])
