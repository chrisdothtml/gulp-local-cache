const crypto = require('crypto')
const fs = require('fs')
const mkdirp = require('mkdirp')
const _path = require('path')
let CACHE_PATH = '.gulpcache'
let cache = {}

function md5 (input) {
  return crypto.createHash('md5').update(input).digest('hex')
}

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
 * Loads cache into memory
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
 * Returns or updates the cache path
 *
 * @returns {string} resulting path
 */
function path (filepath) {
  if (typeof filepath !== 'undefined') {
    if (typeof filepath === 'string') {
      CACHE_PATH = _path.normalize(filepath)
      load()
    } else {
      console.warn('invalid path provided; using default')
    }
  }

  return CACHE_PATH
}

/**
 * Saves cache to file
 *
 * @returns {boolean} success
 */
function save () {
  try {
    fs.writeFileSync(
      CACHE_PATH,
      JSON.stringify(cache),
      'utf-8'
    )

    return true
  } catch (error) {
    // directory doesn't exist
    if (error.code === 'ENOENT') {
      let dirname = _path.dirname(CACHE_PATH)

      // actually has a directory in path
      if (dirname !== '.') {
        mkdirp.sync(dirname)
        return save()
      }
    }

    throw error
  }
}

/**
 * Adds a file to the local cache
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

module.exports = {
  add,
  changed,
  load,
  path
}
