var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./server/tsconfig.json");

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