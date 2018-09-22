const crypto = require('crypto')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
let CACHE_PATH = '.gulpcache'
let cache = {}

function md5 (input) {
  return crypto.createHash('md5').update(input).digest('hex')
}

function generateHashes (file) {
  return {
    contents: md5(file.contents.toString('utf8')),
    path: md5(path.relative(process.cwd(), file.path))
  }
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
function updatePath (filepath) {
  if (typeof filepath !== 'undefined') {
    if (typeof filepath === 'string') {
      CACHE_PATH = path.normalize(filepath)
      load()
    } else {
      console.warn('invalid path provided')
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
  mkdirp.sync(path.dirname(CACHE_PATH))
  fs.writeFileSync(
    CACHE_PATH,
    JSON.stringify(cache),
    'utf-8'
  )
}

/**
 * Clears cache
 */
function clear (key) {
  if (key) {
    if (cache[key]) {
      cache[key] = {}
    }
  } else {
    cache = {}
  }

  save()
}

/**
 * Adds a file to the local cache
 */
function add (file, key) {
  const { contents, path } = generateHashes(file)

  if (key) {
    cache[key] = cache[key] || {}
    cache[key][path] = contents
  } else {
    cache[path] = contents
  }

  save()
}

/**
 * Compares the current file contents with the cached
 * contents
 *
 * @returns {boolean}
 */
function changed (file, key) {
  const { contents, path } = generateHashes(file)
  const cached = key ? (cache[key] || {})[path] : cache[path]

  return contents !== cached
}

module.exports = {
  add,
  changed,
  clear,
  load,
  updatePath
}
