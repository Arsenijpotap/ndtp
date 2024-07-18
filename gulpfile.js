const { src, dest, watch, series, parallel } = require("gulp");
const fileInclude = require("gulp-file-include");
const htmlMin = require("gulp-htmlmin");
const size = require("gulp-size");
const plumber = require("gulp-plumber");
const del = require("del");
const notify = require("gulp-notify");
const webpHtml = require("gulp-webp-html");
const formatHtml = require("gulp-format-html");
const browserSync = require("browser-sync").create();
const php2html = require("gulp-php2html");

//
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const shorthand = require("gulp-shorthand");
const sass = require("gulp-sass")(require("sass"));
const groupCss = require("gulp-group-css-media-queries");
// const webpCss = require("gulp-webp-css");

//
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const webpack = require("webpack-stream");
const terser = require("gulp-terser");

const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");

const server = () => {
	browserSync.init({
		server: {
			baseDir: "./public",
		},
	});
};

const html = () => {
	return src("./src/assets/html/*.*")
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => ({
					title: "HTML",
					message: error.message,
				})),
			}),
		)
		.pipe(fileInclude())
		.pipe(size({ title: "До сжатия" }))
		.pipe(formatHtml())
		.pipe(webpHtml())
		.pipe(htmlMin({ collapseWhitespace: true }))
		.pipe(size({ title: "После сжатия" }))
		.pipe(dest("./public"))
		.pipe(browserSync.stream());
};
const php = () => {
	return src("./src/assets/php/*.*")
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => ({
					title: "PHP",
					message: error.message,
				})),
			}),
		)
		.pipe(fileInclude())
		.pipe(size({ title: "До сжатия" }))
		.pipe(formatHtml())
		.pipe(webpHtml())
		.pipe(htmlMin({ collapseWhitespace: true }))
		.pipe(size({ title: "После сжатия" }))
		.pipe(dest("./public"))
		.pipe(browserSync.stream());
};

const scss = () => {
	return (
		src("./src/assets/scss/*.{scss,sass}", { sourcemaps: true })
			.pipe(
				plumber({
					errorHandler: notify.onError((error) => ({
						title: "SCSS",
						message: error.message,
					})),
				}),
			)
			.pipe(sass())

			.pipe(size({ title: "До сжатия" }))
			.pipe(groupCss("./public/assets/css"))
			.pipe(autoprefixer())
			.pipe(shorthand())
			// .pipe(webpCss())
			.pipe(dest("./public/assets/css", { sourcemaps: true }))
			.pipe(csso({ processImport: false }))
			.pipe(size({ title: "После сжатия" }))
			.pipe(rename({ suffix: ".min" }))
			.pipe(dest("./public/assets/css", { sourcemaps: true }))
			.pipe(browserSync.stream())
	);
};
const JavaScript = () => {
	return (
		src("./src/assets/js/*.js", { sourcemaps: true })
			.pipe(
				plumber({
					errorHandler: notify.onError((error) => ({
						title: "JavaScript",
						message: error.message,
					})),
				}),
			)
			// .pipe(webpack({ mode: "development" }))
			.pipe(size({ title: "До сжатия" }))
			.pipe(babel())
			// .pipe(
			// 	terser({
			// 		toplevel: true,
			// 	}),
			// )
			// .pipe(uglify())
			.pipe(size({ title: "После сжатия" }))
			.pipe(dest("./public/assets/js", { sourcemaps: true }))
			.pipe(browserSync.stream())
	);
};

const img = () => {
	return src("./src/assets/img/**/*.*", { base: "./src/assets/img/", encoding: false })
		.pipe(newer("./public/assets/img"))
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => ({
					title: "IMG",
					message: error.message,
				})),
			}),
		)
		.pipe(imagemin({ optimizationLevel: 3, verbose: true }))
		.pipe(dest("./public/assets/img"))
		.pipe(src("./src/assets/img/**/*.*", { base: "./src/assets/img/", encoding: false }))
		.pipe(newer("./public/assets/img"))
		.pipe(webp())
		.pipe(dest("./public/assets/img"))
		.pipe(browserSync.stream());
};
const icons = () => {
	return src("./src/assets/icons/**/*.*", { base: "./src/assets/icons/", encoding: false })
		.pipe(
			plumber({
				errorHandler: notify.onError((error) => ({
					title: "ICONS",
					message: error.message,
				})),
			}),
		)
		.pipe(newer("./public/assets/icons"))
		.pipe(imagemin({ optimizationLevel: 3, verbose: true }))
		.pipe(dest("./public/assets/icons"))
		.pipe(src("./src/assets/icons/**/*.*", { base: "./src/assets/img/", encoding: false }))
		.pipe(newer("./public/assets/icons"))
		.pipe(webp())
		.pipe(dest("./public/assets/icons"))
		.pipe(browserSync.stream());
};
const font = () => {
	return src("./src/assets/fonts/*.*").pipe(dest("./public/assets/fonts")).pipe(browserSync.stream());
};

const clear = () => {
	return del("./public");
};
const clearImg = () => {
	return del("./public/assets/img");
};
const clearIcons = () => {
	return del("./public/assets/icons");
};

const watcher = () => {
	watch("./src/assets/html/*.*", html);
	watch("./src/assets/php/*.*", php);
	watch("./src/assets/scss/*.*", scss);
	watch("./src/assets/js/*.*", JavaScript);
	watch("./src/assets/img/**/*.*", series(clearImg, img));
	watch("./src/assets/icons/**/*.*", series(clearIcons, icons));
};
exports.html = html;
exports.watcher = watcher;
exports.dev = series(
	clear,
	parallel(font, html, php, scss, JavaScript, series(clearImg, img), series(clearIcons, icons), parallel(watcher)),
);
exports.img = img;
