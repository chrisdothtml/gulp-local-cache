# gulp-local-cache

> A gulp plugin that provides a persisted file cache

This plugin is similar to [gulp-cache](https://github.com/jgable/gulp-cache), but is a bit simpler to use. The way it's used is similar to [gulp-cached](https://github.com/contra/gulp-cached), but unlike gulp-local-cache, that will not persist the cache between builds.

## Install

```bash
$ npm install --save-dev gulp-local-cache
```

## Use

```javascript
const cache = require('gulp-local-cache')
const gulp = require('gulp')
const standard = require('gulp-standard')

gulp.task('lint', () => {
  return gulp.src('src/*.js')
    .pipe(cache())
    .pipe(standard())
})
```

## Note

This plugin will create `.gulpcache` in your project root, so make sure to gitignore it if you don't want it committed
