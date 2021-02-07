import gulp from "gulp";
import sass from "gulp-sass";
import cssnano from "gulp-cssnano";
import px2rem from "gulp-px2rem";
import base64 from "gulp-base64";
import inline from "gulp-inline-source";
import rename from "gulp-rename";
import * as sprit from "sprit";
import path from "path";

gulp.task("default", () => {
  gulp.watch("./assets/*.scss", gulp.parallel("build:css"));
});

gulp.task("build:css", () =>
  gulp
    .src("./assets/site.scss")
    .pipe(sass())
    .pipe(base64())
    .pipe(cssnano({
      zindex: false
    }))
    .pipe(
      px2rem({
        rootValue: 16,
        mediaQuery: true,
        propertyBlackList: ["font-size", "background-image"],
      })
    )
    .pipe(gulp.dest("./assets"))
);

gulp.task("build:links", () => gulp.src("./links/source.html").pipe(inline()).pipe(rename("index.html")).pipe(gulp.dest("./links")));

gulp.task(
  "sprite",
  gulp.parallel(
    () =>
      sprit.create({
        src: "./img/sprite/brand-logos/*.png",
        output: {
          fileName: "./assets/sprite-brand-logos",
          processor: "css",
          options: {
            prefix: ".brand-logo.",
            omitFields: ["width", "height"],
            naming(tile) {
              const named = path.basename(tile.fileName, path.extname(tile.fileName));
              return named.replace(/ /g, "-").toLowerCase();
            },
          },
        },
      }),
    () =>
      sprit.create({
        src: "./img/meme/*.jpg",
        renderer: {
          scale: {
            maximum: 365 * 2, // 200% DPI
          },
        },
        output: {
          fileName: "./assets/sprite-subculture",
          processor: "css",
          options: {
            prefix: ".",
            omitFields: ["width", "height"],
          },
        },
      })
  )
);
