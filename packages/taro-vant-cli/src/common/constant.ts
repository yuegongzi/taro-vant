import { existsSync } from 'fs'
import { dirname, isAbsolute, join } from 'path'
import { get } from 'lodash'

function findRootDir(dir: string): string {
  if (existsSync(join(dir, 'vant.config.js'))) {
    return dir
  }

  const parentDir = dirname(dir)
  if (dir === parentDir) {
    return dir
  }

  return findRootDir(parentDir)
}

// Root paths
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const ES_DIR = join(ROOT, 'es')
export const LIB_DIR = join(ROOT, 'lib')
export const VANT_CONFIG_FILE = join(ROOT, 'vant.config.js')

// Relative paths
// export const CJS_DIR = join(__dirname, '..', '..', 'cjs')
export const DIST_DIR = join(__dirname, '..', '..', 'dist')
export const CONFIG_DIR = join(__dirname, '../config')

// Dist files
export const STYLE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json')

// Config files
// export const POSTCSS_CONFIG_FILE = join(CJS_DIR, 'postcss.config.cjs')
export const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js')

export const SCRIPT_EXTS = [ '.js', '.jsx', '.ts', '.tsx' ]

export function getVantConfig() {
  delete require.cache[VANT_CONFIG_FILE]
  try {
    return require(VANT_CONFIG_FILE)
  } catch (err) {
    console.error(err)
    return {}
  }
}

function getSrcDir() {
  const vantConfig = getVantConfig()
  const srcDir = get(vantConfig, 'build.srcDir')

  if (srcDir) {
    if (isAbsolute(srcDir)) {
      return srcDir
    }

    return join(ROOT, srcDir)
  }

  return join(ROOT, 'src')
}

export const SRC_DIR = getSrcDir()
export const STYLE_DIR = join(SRC_DIR, 'style')
