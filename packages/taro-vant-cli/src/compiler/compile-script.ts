import fse from 'fs-extra'
import { transformAsync } from '@babel/core'
import { replaceExt } from '../common'

const { readFileSync, removeSync, outputFileSync } = fse

/**
 *
 * @param filePath 读取路径和输出路径，有outputPath时仅为读取路径
 * @param outputPath
 */
export async function compileScript(
  filePath: string,
  outputPath?: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (filePath.includes('.d.ts')) {
      resolve()
      return
    }

    const code = readFileSync(filePath, 'utf-8')
    transformAsync(code, { filename: filePath }).
      then((result: any) => {
        if (result) {
          const jsFilePath = replaceExt(outputPath || filePath, '.js')
          // watch的时候不删除目标
          if (!outputPath) removeSync(filePath)
          outputFileSync(jsFilePath, result.code)
          resolve()
        }
      }).
      catch(reject)
  })
}
