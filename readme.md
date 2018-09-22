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

```javascript
const cache = require('gulp-local-cache')
const gulp = require('gulp')

gulp.task('lint', () => {
  return gulp.src('src/*.js')
    .pipe(cache.filter())
// ...
```

### cache.clear([key])

Clear the cache. A key can be provided to specifically clear that cache

```javascript
// clear entire cache
cache.clear()
// only clear `assets` cache
cache.clear('assets')
```

### cache.filter([key])

Filter out cached files that haven't changed. An optional cache key can be provided if you need to, for example, cache files at multiple stages of the build

```javascript
gulp.task('assets', () => {
  return gulp.src('*.js')
    .pipe(cache.filter('assets'))
// ...
```

### cache.path([filepath])

Get or set the location of the cache file. Default path is `.gulpcache`

```javascript
// get current
cache.path()
// set new
cache.path('.cache/my-cache')
```

## License

[MIT](LICENSE)
