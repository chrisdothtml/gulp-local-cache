import fse from 'fs-extra'
import gulp from 'gulp'
import gulpCache from '../lib/index.js'
import path from 'path'
import { test } from 'ava'

const ORIGINAL_CWD = process.cwd()
const FIXTURE_PATH = path.join(__dirname, 'fixture')
const TMP_PATH = path.resolve(__dirname, '../.tmp')
let FIXTURE_COUNT = 0

async function useFixture () {
  const token = FIXTURE_COUNT++
  const sandboxPath = path.join(TMP_PATH, `fixture-${Date.now()}-${token}`)

  await fse.copy(FIXTURE_PATH, sandboxPath)
  return {
    path: sandboxPath,
    token
  }
}

async function renameFixture (fixture) {
  const newPath = path.join(TMP_PATH, `fixture-${Date.now()}-${fixture.token}`)

  await fse.move(fixture.path, newPath)
  return {
    path: newPath,
    token: fixture.token
  }
}

function getFilteredFiles (fixture) {
  return new Promise((resolve, reject) => {
    // set cwd and cache path to fixture path
    process.chdir(fixture.path)
    gulpCache.path(path.join(fixture.path, '.cache'))

    const stream = gulp.src('*.js', { cwd: fixture.path })
      .pipe(gulpCache.filter(fixture.token))
    const result = []

    stream.on('error', reject)
    stream.on('finish', () => resolve(result))
    stream.on('data', file => {
      result.push(
        path.relative(fixture.path, file.path)
      )
    })
  })
}

// cleanup
test.after(() => fse.remove(TMP_PATH))

test.afterEach(() => {
  process.chdir(ORIGINAL_CWD)
  gulpCache.clear()
})

test.serial(`filters out files that haven't changed`, async (t) => {
  const fixture = await useFixture()

  t.deepEqual(
    await getFilteredFiles(fixture),
    ['file-one.js', 'file-two.js']
  )

  await fse.writeFile(
    path.join(fixture.path, 'file-one.js'),
    '// modified file content\n', 'utf-8'
  )

  t.deepEqual(
    await getFilteredFiles(fixture),
    ['file-one.js']
  )
})

test.serial(`caches files relative to the cwd`, async (t) => {
  let fixture = await useFixture()

  t.deepEqual(
    await getFilteredFiles(fixture),
    ['file-one.js', 'file-two.js']
  )

  fixture = await renameFixture(fixture)

  t.deepEqual(
    await getFilteredFiles(fixture),
    []
  )
})
