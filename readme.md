# gulp-local-cache

[![StandardJS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![travis-ci build status](https://api.travis-ci.org/chrisdothtml/gulp-local-cache.svg?branch=master)](https://travis-ci.org/chrisdothtml/gulp-local-cache/branches)
[![appveyor build status](https://ci.appveyor.com/api/projects/status/ghpfl69u4rtks0m2/branch/master?svg=true)](https://ci.appveyor.com/project/chrisdothtml/gulp-local-cache)
[![Coverage status](https://coveralls.io/repos/github/chrisdothtml/gulp-local-cache/badge.svg)](https://coveralls.io/github/chrisdothtml/gulp-local-cache)

> A gulp plugin that provides a persisted file cache

## Install

```bash
yarn add -D gulp-local-cache

# npm works too
npm i -D gulp-local-cache
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

### Cache filepath

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
})
```

### Cache key

If you need to store multiple caches in the same file (e.g. caching the same file at multiple stages of the build), you can pass a key into `cache.filter`

```javascript
// ...
gulp.task('assets', () => {
  return gulp.src('*.js')
    .pipe(cache.filter('assets'))
})
```

### Clear cache

```javascript
// ...
cache.clear()
```

## License

[MIT](LICENSE)
