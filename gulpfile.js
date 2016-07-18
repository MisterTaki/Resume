// 载入插件
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    minifyHtml = require("gulp-minify-html"),
    zip = require("gulp-zip"),
    package = require('./package.json'),
    sass = require("gulp-sass"),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// 定义web服务模块，增加浏览器同步浏览
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist/',
            index: "index.html"
        }
    });
});

//HTML
gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

// 样式
gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
          cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({
            stream: true
        }));
});

// 脚本
gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({
            stream: true
        }));
});

// 图片
gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(reload({
            stream: true
        }));
});

// 压缩
gulp.task('zip', function() {
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }
    var d = new Date();
    var year = d.getFullYear();
    var month = checkTime(d.getMonth() + 1);
    var day = checkTime(d.getDate());
    var hour = checkTime(d.getHours());
    var minute = checkTime(d.getMinutes());

    return gulp.src('dist/**/*')
        .pipe(zip(package.name + '-' + year + month + day + hour + minute + '.zip'))
        .pipe(gulp.dest('export'));
})

// 清理
gulp.task('clean', function() {
    return gulp.src('dist/!(lib)**/*', {
            read: false
        })
        .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean', 'browser-sync'], function() {
    gulp.start('html', 'styles', 'scripts', 'images');

    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/img/**/*', ['images']);
});
