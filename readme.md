# gulp-local-cache

> A gulp plugin that provides a persisted file cache

## Install

```bash
npm install --save-dev gulp-local-cache
```

## Use

Every time `gulp lint` runs, the linter (in this case, gulp-standard) will only receive files that have changed since the last run.

```javascript
const cache = require('gulp-local-cache')
const gulp = require('gulp')
const standard = require('gulp-standard')

gulp.task('lint', () => {
  return gulp.src('src/*.js')
    // cache files
    .pipe(cache())
    .pipe(standard())
})

// clear cache
gulp.task('clear-cache', cache.clear)
```

## Note

This plugin will create `.gulpcache` in your project root, so make sure to gitignore it if you don't want it committed
