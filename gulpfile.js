const gulp          = require('gulp'),
    sass            = require('gulp-sass'),
    cssmin          = require('gulp-cssmin');
    plumber         = require('gulp-plumber'),
    browserSync     = require('browser-sync'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    imagemin        = require('gulp-imagemin'),
    cp              = require('child_process');
    notify          = require("gulp-notify");
    babel = require('gulp-babel');

const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

//Verifica se é linux ou windows
const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

// Monta o site do Jekyll
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);

    return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Refaz o site e atualiza a página
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Espera até que o jekyll-build seja executado e então levanta o
 * servidor utilizando o _site como pasta raiz
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .on('error',notify.onError({
            title: 'JS Error!',
            message: '<%= error.message %>'
        }))
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
});

gulp.task('imagemin', function() {
    return gulp.src('src/img/**/*')
        .pipe(plumber()) 
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img/'));
});

gulp.task('watch', function () {
    gulp.watch('*.*', ['jekyll-rebuild']);

    gulp.watch('assets/css/main.scss', ['jekyll-rebuild']);

    gulp.watch('_sass/**/*.scss', ['jekyll-rebuild']);

    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/js/**/*.js', ['jekyll-rebuild']);

    gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
    gulp.watch('src/img/**/*.{jpg,png,gif}', ['jekyll-rebuild']);

    gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['js', 'imagemin', 'browser-sync', 'watch']);