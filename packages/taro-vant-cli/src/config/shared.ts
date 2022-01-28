import { dirname, join } from 'path'
import { existsSync } from 'fs'

function findRootDir(dir) {
  if (existsSync(join(dir, 'vant.config.js'))) {
    return dir
  }

  const parentDir = dirname(dir)
  if (dir === parentDir) {
    return dir
  }

  return findRootDir(parentDir)
}

const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
