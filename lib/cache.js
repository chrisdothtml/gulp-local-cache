const fs = require('fs')
const md5 = require('md5')
const path = require('path')
const CACHE_PATH = path.normalize(`${process.cwd()}/.gulpcache`)
let cache = {}

/**
 * @returns {string}
 */
function hashPath (file) {
  return md5(file.path)
}

/**
 * @returns {string}
 */
function hashContents (file) {
  return md5(file.contents.toString('utf8'))
}

/**
 * Initial load of cache into memory
 *
 * @returns {boolean} success
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
    JSON.stringify(cache),
    'utf-8'
  )
}

/**
 * Adds a file to the local cache
 *
 * @returns {boolean}
 */
function add (file) {
  const path = hashPath(file)
  const contents = hashContents(file)

  cache[path] = contents
  save()
}

/**
 * Compares the current file contents with the cached
 * contents
 *
 * @returns {boolean}
 */
function changed (file) {
  const path = hashPath(file)
  const contents = hashContents(file)
  const cached = cache[path]

  return contents !== cached
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
