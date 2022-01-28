import { existsSync } from 'fs'
import { dirname, isAbsolute, join } from 'path'
import { get } from 'lodash'

export const CONFIG_FILE_NAME = 'vant.config.js'

function findRootDir(dir: string): string {
  if (existsSync(join(dir, CONFIG_FILE_NAME))) {
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
export const DOCS_DIR = join(ROOT, 'docs')
export const DOC_DIST_DIR = join(ROOT, 'site')
export const VANT_CONFIG_FILE = join(ROOT, CONFIG_FILE_NAME)
export const ZHPFE_CONFIG_FILE = join(ROOT, CONFIG_FILE_NAME)
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json')

// Relative paths
export const DIST_DIR = join(__dirname, '..', '..', 'dist')
export const CONFIG_DIR = join(__dirname, '../config')

// Dist files
export const STYLE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json')

// Config files
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

export const ROOT_WEBPACK_CONFIG_FILE = join(ROOT, 'webpack.config.js')
export const GREEN = '#07c160'
export const STYLE_EXTS = [ '.css', '.less', '.scss' ]
export const CACHE_DIR = join(ROOT, 'node_modules/.cache')
export const SRC_DIR = getSrcDir()
export const STYLE_DIR = join(SRC_DIR, 'style')

// Dist files
export const PACKAGE_STYLE_FILE = join(DIST_DIR, 'package-style.css')
export const SITE_DESKTOP_SHARED_FILE = join(DIST_DIR, 'site-desktop-shared.js')

export function getPackageJson() {
  delete require.cache[PACKAGE_JSON_FILE]

  return require(PACKAGE_JSON_FILE)
}

export function getDemoDir() {
  const vantConfig = getVantConfig()
  const demoDir = get(vantConfig, 'build.demoDir')
  if (demoDir) {
    if (isAbsolute(demoDir)) {
      return demoDir
    }

    return join(ROOT, demoDir)
  }

  return join(ROOT, 'src')
}
