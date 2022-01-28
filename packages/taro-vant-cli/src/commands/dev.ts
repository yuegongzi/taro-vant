import { mkdirSync } from 'fs'
import { remove } from 'fs-extra'
import chokidar from 'chokidar'
import { ES_DIR, LIB_DIR, SRC_DIR } from '../common/constant'
import { isScript, isStyle } from '../common'
import { consola, ora } from '../common/logger'
import { compileStyle } from '../compiler/compile-style'
import { compileScript } from '../compiler/compile-script'
import { build } from './build'

async function compileFile(params: {
  fileName: string
  DIR: string
  path: string
}) {
  const { fileName } = params
  if (isScript(fileName)) {
    await compileScript(params.path, params.DIR)
  }
  if (isStyle(fileName)) {
    await compileStyle(params.path, params.DIR)
  }
}

async function changeOrAddAction(path: any) {
  const spinner = ora('updating...').start()
  const pathArr = path.split('/').reverse()
  const fileName = pathArr[0]
  try {
    await compileFile({
      fileName,
      DIR: path.replace(SRC_DIR, LIB_DIR),
      path,
    })
    await compileFile({
      fileName,
      DIR: path.replace(SRC_DIR, ES_DIR),
      path,
    })
    spinner.stop()
    consola.success('Update successfully')
  } catch (err) {
    spinner.stop()
    consola.success('Update failed')
    consola.error(err)
  }
}

function watchFile() {
  let readyOk = false
  const watcher = chokidar.watch(`${SRC_DIR}/`, {
    persistent: true,
  })

  watcher.on('ready', function () {
    readyOk = true
  })

  watcher.on('add', function (path: string) {
    if (readyOk) {
      changeOrAddAction(path)
    }
  })

  watcher.on('change', function (path: string) {
    if (readyOk) {
      changeOrAddAction(path)
    }
  })

  watcher.on('addDir', function (path: string) {
    if (readyOk) {
      const spinner = ora('updating...').start()
      // const addTarget = path.replace(SRC_DIR, type === 'lib' ? LIB_DIR : ES_DIR)
      mkdirSync(path.replace(SRC_DIR, ES_DIR))
      mkdirSync(path.replace(SRC_DIR, LIB_DIR))
      spinner.stop()
      consola.success('Update successfully')
    }
  })

  watcher.on('unlinkDir', function (path: string) {
    if (readyOk) {
      const spinner = ora('updating...').start()
      remove(path.replace(SRC_DIR, ES_DIR))
      remove(path.replace(SRC_DIR, LIB_DIR))
      spinner.stop()
      consola.success('Update successfully')
    }
  })

  watcher.on('unlink', function (path: string) {
    if (readyOk) {
      const spinner = ora('updating...').start()
      remove(path.replace(SRC_DIR, ES_DIR))
      remove(path.replace(SRC_DIR, LIB_DIR))
      spinner.stop()
      consola.success('Update successfully')
    }
  })
}

export async function watch() {
  // if (type === 'es') {
  //   setModuleEnv('esmodule')
  // } else if (type === 'lib') {
  //   setModuleEnv('commonjs')
  // }
  await build(false)

  consola.log(`
  watching files update
`)
  watchFile()
}
