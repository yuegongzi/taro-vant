import { dirname, join } from 'path'
import { existsSync } from 'fs'
import { CONFIG_FILE_NAME } from '../common/constant'

function findRootDir(dir) {
  if (existsSync(join(dir, CONFIG_FILE_NAME))) {
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
