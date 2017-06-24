let gulp = require('gulp');
let ts = require('gulp-typescript');
 
gulp.task('compile', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'main.js'
        }))
        .pipe(gulp.dest('dest'));
});