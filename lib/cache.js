const fs = require('fs')
const md5 = require('md5')
const CACHE_PATH = `${process.cwd()}/.gulpcache`
let cache = {}

/**
 * @returns {string}
 */
function getHash (file) {
  return md5(file.contents.toString('utf8'))
}

/**
 * Initial load of cache into memory
 *
 * @return {boolean} success
 */
function load () {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'))
    return true
  } catch (error) {
    return false
  }
}

/**
 * Saves the cache to .gulpcache
 */
function save () {
  fs.writeFileSync(
    CACHE_PATH,
    JSON.stringify(cache, null, 2),
    'utf-8'
  )
}

/**
 * Adds a file to the local cache
 *
 * @returns {boolean}
 */
function add (file) {
  const hash = getHash(file)

  cache[file.path] = hash
  save()
}

/**
 * Compares the current file contents with the cached
 * contents
 *
 * @returns {boolean}
 */
function changed (file) {
  const hash = getHash(file)
  const cached = cache[file.path]

  return hash !== cached
}

/**
 * Empties the cache
 */
function clear () {
  cache = {}
  save()
}

module.exports = {
  add,
  changed,
  clear,
  load
}
