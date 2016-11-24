# gulp-local-cache

> A gulp plugin that provides a persisted file cache

## Install

```bash
npm install --save-dev gulp-local-cache
```

## Use

In this example, every time `gulp lint` runs, the linter (gulp-standard) will only receive files that have changed since the last run.

```javascript
const cache = require('gulp-local-cache')
const gulp = require('gulp')
const standard = require('gulp-standard')

gulp.task('lint', () => {
  return gulp.src('src/*.js')
    // filter out cached files
    .pipe(cache.filter())
    .pipe(standard())
})
```

## Custom path

The default path for the cache file is `.gulpcache`, but it can be changed if needed.

```javascript
// get current
cache.path()
// set new
cache.path('.cache/my-cache')

gulp.task('assets', () => {
  return gulp.src(...)
    // cache stored in .cache/my-cache
    .pipe(cache.filter())
    ...
})
```
