const fs = require("fs-extra");
const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const less = require("gulp-less");
const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const autoprefix = new LessPluginAutoPrefix({
  browsers: ["last 2 versions", "ie 11"],
});
const minifyCss = require("gulp-minify-css");
const clean = require("gulp-clean");
const babel = require("gulp-babel");

//#region copy
function copyClean() {
  return gulp.src(["dest/static/**"], { read: false }).pipe(clean());
}
function copyCompile() {
  return gulp.src(["src/static/**"]).pipe(gulp.dest("dest/static/"));
}
function copyWatch() {
  gulp.watch(["src/static/**"], gulp.series(copyClean, copyCompile));
  gulp.series(copyClean, copyCompile)();
}
//#endregion

// https://v3.gulpjs.com.cn/docs/recipes/browserify-with-globs/
//#region js编译
function jsClean() {
  return gulp.src("dest/js/*.js", { read: false }).pipe(clean());
}
function jsCompile() {
  return gulp
    .src(["./src/pages/*/index.js"])
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              modules: "umd",
              targets: {
                ie: "11",
              },
            },
          ],
        ],
        plugins: ["@babel/transform-runtime"],
      })
    )
    .pipe(
      rename((filePath) => {
        return {
          dirname: "",
          basename: filePath.dirname,
          extname: ".js",
        };
      })
    )
    .pipe(gulp.dest("dest/js"));
}
function jsWatch() {
  gulp.watch(["./src/pages/*/index.js"], gulp.series(jsClean, jsCompile));
  gulp.series(jsClean, jsCompile)();
}
//#endregion

//#region css编译
function cssClean() {
  return gulp.src("dest/styles/*.css", { read: false }).pipe(clean());
}
function cssCompile() {
  return (
    gulp
      .src(["./src/pages/*/index.less"])
      // 压缩为一行
      .pipe(minifyCss())
      .pipe(
        less({
          plugins: [autoprefix],
        })
      )
      .pipe(
        rename((filePath) => {
          return {
            dirname: "",
            basename: filePath.dirname,
            extname: ".css",
          };
        })
      )
      .pipe(gulp.dest("dest/styles"))
  );
}
function cssWatch() {
  gulp.watch(["./src/pages/*/index.less"], gulp.series(cssClean, cssCompile));
  gulp.series(cssClean, cssCompile)();
}
//#endregion

//#region html编译
function htmlClean() {
  return gulp.src("dest/*.html", { read: false }).pipe(clean());
}
function htmlCompile() {
  const list = fs.readdirSync("src/pages/");
  const data = list.reduce((prev, pageName) => {
    return {
      ...prev,
      [pageName]: {
        ...fs.readJSONSync(`src/pages/${pageName}/index.json`),
        pageName,
      },
    };
  }, {});
  return gulp
    .src("./src/pages/*/index.ejs")
    .pipe(ejs(data))
    .pipe(
      rename((filePath) => {
        return {
          dirname: "",
          basename: filePath.dirname,
          extname: ".html",
        };
      })
    )
    .pipe(gulp.dest("dest"));
}
function htmlWatch() {
  gulp.watch(
    ["src/pages/*/index.json", "./src/pages/*/index.ejs", "./src/layout/*.ejs"],
    gulp.series(htmlClean, htmlCompile)
  );
  gulp.series(htmlClean, htmlCompile)();
}
//#endregion
gulp.task("default", () => {
  cssWatch();
  htmlWatch();
  jsWatch();
  copyWatch();
});
