import { emptyDir } from 'fs-extra'
import { setBuildTarget, setNodeEnv } from '../common'
import { compileSite } from '../compiler/compile-site'
import { DOC_DIST_DIR, getDemoDir, ROOT } from '../common/constant'
import { execSync } from 'child_process'
import { consola } from '../common/logger'
import { getPackageManager } from '../common/manager'

export async function buildDemo() {
  const demoDir = getDemoDir()
  await execSync('cd', { cwd: demoDir })
  const manager = getPackageManager()
  await execSync(`${manager} install --prod=false`, { cwd: demoDir })
  await execSync(`${manager} real:h5Doc`, { cwd: demoDir })
  await execSync(`mv ${demoDir}/build/assets  ./site`, { cwd: ROOT })
  await execSync(`mv ${demoDir}/build/index.html  ./site/mobile.html`, {
    cwd: ROOT,
  })
}
export async function buildSite() {
  setNodeEnv('production')
  setBuildTarget('site')
  await emptyDir(DOC_DIST_DIR)
  await compileSite(true)
  consola.success('build site successful')
  consola.start('build demo site ...')
  await buildDemo()
}
