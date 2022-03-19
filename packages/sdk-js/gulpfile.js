const gulp = require('gulp');

const fs = require('fs');

const browserify = require('browserify'),
	buffer = require('vinyl-buffer'),
	jshint = require('gulp-jshint'),
	merge = require('merge-stream'),
	replace = require('gulp-replace'),
	source = require('vinyl-source-stream');

function getVersionFromPackage() {
	return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

gulp.task('build-example-bundle', () => {
	return browserify([ './lib/index.js', './example/js/startup.js', ])
		.bundle()
		.pipe(source('example.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./example'));
});

gulp.task('embed-version', () => {
	const version = getVersionFromPackage();

	const index = gulp.src(['./lib/index.js'])
		.pipe(replace(/(version:\s*')([0-9]+\.[0-9]+\.[0-9]+.*)(')/g, '$1' + version + '$3'))
		.pipe(gulp.dest('./lib/'));

	return merge(index);
});

gulp.task('lint', () => {
	return gulp.src([ './**/*.js', './example/browser/js/**/*.js', './gulpfile.js', '!./node_modules/**', '!./example/example.js' ])
		.pipe(jshint({ esversion: 9 }))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});


gulp.task('default', gulp.series('lint'));