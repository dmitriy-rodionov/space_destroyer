const gulp = require('gulp');
const browserSync = require('browser-sync');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const webpack = require("webpack-stream");
const path = require('path');


gulp.task('images', function(){
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 6}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
      .pipe(gulp.dest('dist/img'))
  });

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('html', () => {
    return gulp.src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
});

gulp.task('build-js', () => {
    return gulp.src('src/js/index.js')
           .pipe(webpack({
               mode: 'development',
               output: {
                path: path.resolve(__dirname, 'src'),
                filename: 'bundle.js'
               },
               watch: true,
               devtool: "source-map",
           }))
           .pipe(gulp.dest('src/js'))
           .pipe(browserSync.stream());
});

gulp.task('build-prod-js', () => {
    return gulp.src('src/js/index.js')
           .pipe(webpack({
               mode: 'production',
               output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js'
               },
               watch: false,
               devtool: "source-map",
               module: {
                rules: [
                  {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [['@babel/preset-env', {
                            debug: true,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                      }
                    }
                  }
                ]
              }
           }))
           .pipe(gulp.dest('dist/js'));
});

gulp.task('minstyles', () => {
    return gulp.src('src/styles/scss/**/*.scss')
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(gulp.dest('dist/styles/css'));
});

gulp.task('styles', function() {
    return gulp.src('src/styles/scss/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('src/styles/css'))
          .pipe(browserSync.stream());
});

gulp.task('copy-fonts', () => {
    return gulp.src('src/fonts/**/*')
           .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watch', function() {
    gulp.watch('src/styles/scss/**/*.scss', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
});


gulp.task('default', gulp.parallel('watch', 'browser-sync', 'styles', 'build-js'));

gulp.task('build', gulp.parallel('html', 'minstyles', 'build-prod-js', 'images', 'copy-fonts'));