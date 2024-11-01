const gulp = require("gulp");
/* const sass = require("gulp-dart-sass"); */
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");
const plumber = require("gulp-plumber");

gulp.task("style", () => {
    return gulp
        .src("src/sass/style.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 2 version"] }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest("src/css"));
});

gulp.task("build", () => {
    return gulp
        .src("./src/js/main.js")
        .pipe(plumber())
        .pipe(
            webpack({
                mode: "production",
                output: {
                    filename: "script.js",
                },
                watch: false,
                devtool: "source-map",
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        [
                                            "@babel/preset-env",
                                            {
                                                debug: true,
                                                corejs: 3,
                                                useBuiltIns: "usage",
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest("src"))
        .on("end", browserSync.reload);
});
gulp.task("reloadHtml", () => {
    return gulp.src("./src/*.html").pipe(browserSync.stream());
});
gulp.task("server", () => {
    browserSync.init({
        server: "./src/",
        port: 4000,
        notify: true,
    });
});
gulp.task("watch", () => {
    gulp.watch("src/sass/**/*.scss", gulp.parallel("style"));
    gulp.watch("src/js/**/*.*", gulp.parallel("build"));
    gulp.watch("src/*.html", gulp.parallel("reloadHtml"));
});
gulp.task("default", gulp.parallel("server", "style", "reloadHtml", "build", "watch"));
