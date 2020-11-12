// gulp.task('scss', function(){
//   return gulp.src('app/scss/**/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('app/css'))
// });


let project_folder = "dist";
let source_folder = "app";

let path={
  build:{
    html: project_folder+"/",
    css: project_folder+"css/",
    js: project_folder+"js/",
    img: project_folder+"img/",
    fonts: project_folder+"fonts/",
  },

  src:{
    html: source_folder+"/*.html",
    css: source_folder+"scss/style.scss",
    js: source_folder+"js/main.js",
    img: source_folder+"img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder+"fonts/**/*.{woff2,woff,ttf}",
  },

  watch:{
    html: source_folder+"/**/*.html",
    css: source_folder+"scss/**/*.scss",
    js: source_folder+"js/**/*.js",
    img: source_folder+"img/**/*.{jpg,png,svg,gif,ico,webp}",
  },

  clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require('gulp-file-include');


function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false
  })
};

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
};

let build = gulp.series(html);
let watch = gulp.parallel(build, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;