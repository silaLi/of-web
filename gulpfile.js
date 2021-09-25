const fs = require("fs-extra");
const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const less = require("gulp-less");

const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const autoprefix = new LessPluginAutoPrefix({
  browsers: ["last 2 versions", "ie 11"],
});
// const minifyCss = require("gulp-minify-css");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const replace = require("gulp-replace");

//#region copy
function copyClean() {
  return gulp.src(["dest/static/**"], {
    read: false,
    allowEmpty: true,
  });
  // .pipe(clean());
}

function copyCompile() {
  return gulp.src(["src/static/**/*.*"]).pipe(gulp.dest("dest/static"));
}

function copyWatch() {
  gulp.watch(["src/static/**"], gulp.series(copyClean, copyCompile));
  // copyCompile();
  gulp.series(copyClean, copyCompile)();
}
//#endregion

// https://v3.gulpjs.com.cn/docs/recipes/browserify-with-globs/
//#region js编译
function jsClean() {
  return gulp
    .src("dest/js/*.js", {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
}

function jsCompile() {
  return gulp
    .src(["./src/pages/*/index.js"], { allowEmpty: true })
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
  return gulp
    .src("dest/styles/*.css", {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
}

function cssCompile() {
  return (
    gulp
      .src(["./src/pages/*/index.less"], { allowEmpty: true })
      .pipe(
        less({
          plugins: [autoprefix],
        })
      )
      // 压缩为一行
      // .pipe(minifyCss())
      .pipe(
        rename((filePath) => {
          return {
            dirname: "",
            basename: filePath.dirname,
            extname: ".css",
          };
        })
      )
      .pipe(replace("../../static/", "../static/"))
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
  return gulp
    .src("dest/*.html", {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
}

function htmlCompile() {
  const list = fs.readdirSync("src/pages");
  const data = list.reduce((prev, pageName) => {
    let json = {};
    try {
      json = fs.readJSONSync(`src/pages/${pageName}/index.json`);
    } catch (e) {}
    return {
      ...prev,
      [pageName]: {
        ...json,
        pageName,
      },
    };
  }, {});
  return gulp
    .src("./src/pages/*/index.ejs", { allowEmpty: true })
    .pipe(ejs(data))
    .pipe(
      rename((filePath) => {
        const HTMLMAP = {
          price02: "0yuan",
          serviceitems03: "services",
          operation04: "operations",
          client05: "cases",
          companyprofile06: "aboutus",
          miniStore21: "wsc",
          miniprogram22: "xcx",
          education23: "jy",
          retail24: "ls",
          distribution25: "fxpt",
          marketing26: "yxyy",
          live27: "zbds",
          customization28: "lwdz",
        };
        return {
          dirname: "",
          basename: HTMLMAP[filePath.dirname] || filePath.dirname,
          extname: ".html",
        };
      })
    )
    .pipe(replace("../../static/", "./static/"))
    .pipe(gulp.dest("dest"));
}

function htmlWatch() {
  gulp.watch(
    ["src/pages/*/index.json", "./src/pages/*/*.ejs"],
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
