# Project2---Neil-Shah
Georgia Transit
This is a responsive web application which will allow users to get real time bus and train information for the state of Georgia. It will give the users same experience no matter what device they are using. Also, it is designed in such a way that even if there is no network available, the user will still be able to load the last fetched data and look at the train timings. 

##Installation

Download Materialize frame work to style the CSS with material design. 
Clike [here](http://materializecss.com) to download Materialize

Download the following dependencies: 


1. `npm install --save-dev gulp-install`
2. `npm install --save-dev gulp-autoprefixer`
3. `npm install --save-dev gulp-concat`
4. `npm install --save-dev gulp-cssmin`
5. `npm install gulp-sass --save-dev`
6. `npm install --save-dev gulp-uglify`


Also, after transferring HTML files to the distribution folder, make sure to change the source for javascript and css files. 

##Usage
Here is an example to concatenate and minify all javascript files into one. 
```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('scripts', function() {
	gulp.src(['js/**/*.js'])
		.pipe(concat('all.js'))
                .pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});
```

##License
This project is licensed under MIT. 


