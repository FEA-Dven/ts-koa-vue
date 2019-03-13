const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("./server/tsconfig.json");
const del = require('del');
const runSequence = require('run-sequence');
const webpack = require('webpack');

gulp.task("tsbuild", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./server/dist"));
});

// 将views里面的xtpl转移
gulp.task('build', ['tsbuild'], function() {
    return gulp.src('./server/src/views/*')
        .pipe(gulp.dest('./server/dist/views'));
})

/**
 * 构建函数
 * 依赖任务1： 清空build文件夹
 * 依赖任务2： 打包压缩工具箱,把zip包房在build文件夹
 * 依赖任务3： 通过webpack打包js/css资源到build文件夹：bundle
 */
gulp.task('package', cb => {
    runSequence('clean', 'bundle', cb);
});

/**
 * 清理build文件夹里面的东西
 */
gulp.task('clean', () => del.sync(['build/*' ], { dot: true }));

/**
 * 编译构建静态文件
 */
gulp.task('bundle', cb => {
    let config = require('./server/dist/webpack.config.js');
    config = config.default;
    let bundler = webpack(config);
    return bundler.run((err, status) => {
        if (!err) cb();
    });
});
