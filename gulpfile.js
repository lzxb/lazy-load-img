var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var saveLicense = require('uglify-save-license');

/**
 * (开始执行)
 * 
 * @returns (返回任务编译后的对象)
 */
function start() {
    return gulp.src('src/*.js')
        .pipe(babel({ 'presets': ['es2015'] }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
            preserveComments: saveLicense
        })) //压缩
        .pipe(gulp.dest('dist'));
}

gulp.task('default', start); //执行命令时，首先编译
gulp.watch('src/*.js', ['default']); //监听文件改变，自动编译
