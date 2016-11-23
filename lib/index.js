const cache = require('./cache.js')
const transform = require('through2').obj

// load cache
cache.init()

/**
 * Filters files, excluding ones that are already cached
 */
module.exports = () => {
  return transform(function (file, encoding, callback) {
    let addFile = true

    if (file.isBuffer()) {
      if (cache.changed(file)) {
        console.log(`file '${file.path}' is changed`)
        cache.add(file)
      } else {
        console.log(`file '${file.path}' is not changed`)
        addFile = false
      }
    }

    if (addFile) {
      this.push(file)
    }

    callback(null)
  })
}
