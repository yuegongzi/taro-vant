import { join, relative } from 'path'
// import execa from 'execa'
import fse from 'fs-extra'
import { CSS_LANG } from '../common/css.js'
import { consola, ora } from '../common/logger.js'
// import { installDependencies } from '../common/manager.js'
// import { compileSfc } from '../compiler/compile-sfc.js'
import { compileStyle } from '../compiler/compile-style.js'
import { compileScript } from '../compiler/compile-script.js'
// import { compilePackage } from '../compiler/compile-package.js'
import { genPackageEntry } from '../compiler/gen-package-entry.js'
import { genStyleDepsMap } from '../compiler/gen-style-deps-map.js'
import { genComponentStyle } from '../compiler/gen-component-style.js'
import { ES_DIR, LIB_DIR, SRC_DIR } from '../common/constant.js'
import { genPackageStyle } from '../compiler/gen-package-style.js'
import {
  isAsset,
  isDir,
  isScript,
  isStyle,
  setBuildTarget,
  setModuleEnv,
  setNodeEnv,
} from '../common/index.js'
import { clean } from './clean.js'
import execa from 'execa'

const { remove, copy, readdir } = fse

async function compileFile(filePath: string) {
  if (isScript(filePath)) {
    return compileScript(filePath)
  }
  if (isStyle(filePath)) {
    return compileStyle(filePath)
  }
  if (isAsset(filePath)) {
    return Promise.resolve()
  }
  return remove(filePath)
}

/**
 * Pre-compile
 * 1. Remove unneeded dirs
 * 2. compile sfc into scripts/styles
 */
// async function preCompileDir(dir: string) {
//   const files = await readdir(dir)

//   await Promise.all(
//     files.map((filename) => {
//       const filePath = join(dir, filename)

//       if (isDemoDir(filePath) || isTestDir(filePath)) {
//         return remove(filePath)
//       }
//       if (isDir(filePath)) {
//         return preCompileDir(filePath)
//       }
//       if (isSfc(filePath)) {
//         return compileSfc(filePath)
//       }
//       return Promise.resolve()
//     }),
//   )
// }

async function compileDir(dir: string) {
  const files = await readdir(dir)
  await Promise.all(
    files.map((filename) => {
      const filePath = join(dir, filename)
      return isDir(filePath) ? compileDir(filePath) : compileFile(filePath)
    }),
  )
}

async function copySourceCode() {
  await copy(SRC_DIR, ES_DIR)
  await copy(SRC_DIR, LIB_DIR)
}

async function buildESMOutputs() {
  setModuleEnv('esmodule')
  setBuildTarget('package')
  await compileDir(ES_DIR)
}

async function buildCJSOutputs() {
  setModuleEnv('commonjs')
  setBuildTarget('package')
  await compileDir(LIB_DIR)
}

async function buildTypeDeclarations() {
  const tsConfig = join(process.cwd(), 'tsconfig.json')

  if (fse.existsSync(tsConfig)) {
    await execa('tsc', [ '-p', tsConfig ])
  }
}

async function buildStyleEntry() {
  await genStyleDepsMap()
  genComponentStyle()
}

async function buildPackageScriptEntry() {
  const esEntryFile = join(ES_DIR, 'index.js')
  const libEntryFile = join(LIB_DIR, 'index.js')
  genPackageEntry({
    outputPath: esEntryFile,
    pathResolver: (path: string) => `./${relative(SRC_DIR, path)}`,
  })

  await copy(esEntryFile, libEntryFile)
}

async function buildPackageStyleEntry() {
  const styleEntryFile = join(LIB_DIR, `index.${CSS_LANG}`)

  genPackageStyle({
    outputPath: styleEntryFile,
    pathResolver: (path: string) => path.replace(SRC_DIR, '.'),
  })
}

async function buildBundledOutputs() {
  //关闭esm打包 没必要 需要时打开即可
  // setModuleEnv('esmodule')
  // await compilePackage(false)
  // await compilePackage(true)
}

const tasks = [
  {
    text: 'Copy Source Code',
    task: copySourceCode,
  },
  {
    text: 'Build Package Script Entry',
    task: buildPackageScriptEntry,
  },
  {
    text: 'Build Component Style Entry',
    task: buildStyleEntry,
  },
  {
    text: 'Build Package Style Entry',
    task: buildPackageStyleEntry,
  },
  {
    text: 'Build Type Declarations',
    task: buildTypeDeclarations,
  },
  {
    text: 'Build ESModule Outputs',
    task: buildESMOutputs,
  },
  {
    text: 'Build CommonJS Outputs',
    task: buildCJSOutputs,
  },
  {
    text: 'Build Bundled Outputs',
    task: buildBundledOutputs,
  },
]

async function runBuildTasks() {
  for (let i = 0; i < tasks.length; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const { task, text } = tasks[i]
    // if(i> 5){
    //   break;
    // }
    const spinner = ora(text).start()
    try {
      /* eslint-disable no-await-in-loop */
      await task()
      spinner.succeed(text)
    } catch (err) {
      spinner.fail(text)
      console.log(err)
      throw err
    }
  }

  consola.success('Compile successfully')
}

export async function build(product = true) {
  setBuildTarget('package')
  if (product) {
    setNodeEnv('production')
  } else {
    setNodeEnv('development')
  }
  try {
    await clean()
    // await installDependencies()
    await runBuildTasks()
  } catch (err) {
    process.exit(1)
  }
}
