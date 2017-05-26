const gulp = require('gulp');
const react = require('gulp-react');
const babel = require('gulp-babel'); 

gulp.task('react', () => {
    return gulp.src('./src/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./dist/react'));
});

gulp.task('es6', () => {
    return gulp.src('./src/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist/es6'));
});

gulp.task('default', ['react', 'es6']);
