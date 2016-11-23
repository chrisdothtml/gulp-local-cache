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
    // cache files
    .pipe(cache.store())
    .pipe(standard())
})

// clear cache
gulp.task('clear-cache', cache.clear)
```

## Note

This plugin will create `.gulpcache` in your project root to store the cache
