var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

gulp.task('scripts', function() {
	gulp.src(['source/js/**/*.js', '!source/js/**/*.min.js', '!source/js/**/*jquery.js', '!source/js/**/*tindexcontroller.js', '!source/js/**/*indexcontroller.js', '!source/js/**/*script1.js'])
		.pipe(concat('bscripts.js'))
        .pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts2', function() {
	gulp.src(['source/js/**/*.js', '!source/js/**/*.min.js', '!source/js/**/*jquery.js', '!source/js/**/*indexcontroller.js.js', '!source/js/**/*tindexcontroller.js', '!source/js/**/*script.js'])
		.pipe(concat('tscripts.js'))
        .pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('default', function () {
	gulp.src(['source/css/**/*.css', '!source/css/**/*.min.css'])
        .pipe(concat('style.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('copyhtml', function() {
    gulp.src('./**/*.html')
        .pipe(gulp.dest('./dist'))
});

gulp.task('copysworker', function() {
    gulp.src('./**/*.js')
        .pipe(gulp.dest('./dist'))
});

gulp.task('copyimgs', function() {
    gulp.src('source/img/**/*.png')
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('copypdf', function() {
    gulp.src('source/pdf/**/*.pdf')
        .pipe(gulp.dest('./dist/pdf'))
});

gulp.task('styles', function() {
	gulp.src('source/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/css'));
});