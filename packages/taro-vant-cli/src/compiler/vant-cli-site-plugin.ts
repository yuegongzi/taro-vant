/* eslint-disable class-methods-use-this */
import type { Compiler } from 'webpack'
import { replaceExt } from '../common'
import { CSS_LANG } from '../common/css'
import { genPackageStyle } from './gen-package-style'
import { genSiteDesktopShared } from './gen-site-desktop-shared'
import { genStyleDepsMap } from './gen-style-deps-map'
import { PACKAGE_STYLE_FILE } from '../common/constant'

const PLUGIN_NAME = 'VantCliSitePlugin'

async function genSiteEntry() {
  genStyleDepsMap().then(() => {
    genPackageStyle({
      outputPath: replaceExt(PACKAGE_STYLE_FILE, `.${CSS_LANG}`),
    })
    genSiteDesktopShared()
  })
}

export class VantCliSitePlugin {
  apply(compiler: Compiler) {
    if (process.env.NODE_ENV === 'production') {
      compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, genSiteEntry)
    } else {
      compiler.hooks.watchRun.tapPromise(PLUGIN_NAME, genSiteEntry)
    }
  }
}
