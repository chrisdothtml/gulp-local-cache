const cache = require('./cache.js')
const transform = require('through2').obj

// initial load
cache.load()

/**
 * Filters files, excluding ones that are already cached
 */
function filter (key) {
  return transform(function (file, encoding, callback) {
    let keepFile = true

    if (file.isBuffer()) {
      if (cache.changed(file, key)) {
        cache.add(file, key)
      } else {
        keepFile = false
      }
    }

    if (keepFile) {
      this.push(file)
    }

    callback(null)
  })
}

module.exports = {
  path: cache.path,
  filter
}
