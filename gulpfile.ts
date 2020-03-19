import gulp from "gulp";
import sass from "gulp-sass";
import cssnano from "gulp-cssnano";
import base64 from "gulp-base64";
import * as sprit from "sprit";
import path from "path";

gulp.task("default", () => {
  gulp.watch("./assets/style.scss", gulp.parallel("build:css"));
});

gulp.task("build:css", () =>
  gulp
    .src("./assets/style.scss")
    .pipe(sass())
    .pipe(base64())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets"))
);

gulp.task(
  "sprite",
  gulp.parallel(
    () =>
      sprit.create({
        src: "./img/sprite/band-logos/*.png",
        output: {
          fileName: "./assets/sprite-band-logos",
          processor: "css",
          options: {
            prefix: ".band-logo.",
            omitFields: ["width", "height"],
            naming(tile) {
              const named = path.basename(tile.fileName, path.extname(tile.fileName));
              return named.replace(/ /g, "-").toLowerCase();
            }
          }
        }
      }),
    () =>
      sprit.create({
        src: "./img/meme/*.jpg",
        renderer: {
          scale: {
            maximum: 365 // 100% DPI
          }
        },
        output: {
          fileName: "./assets/sprite-subculture",
          processor: "css",
          options: {
            prefix: ".",
            omitFields: ["width", "height"]
          }
        }
      })
  )
);
