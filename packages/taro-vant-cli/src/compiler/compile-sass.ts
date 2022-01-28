/* eslint-disable @typescript-eslint/no-var-requires */

const tildeImporter = (url: string) => {
  if (url.includes('~')) {
    url = url.replace('~', '')

    if (!url.includes('.scss')) {
      url += '.scss'
    }

    url = require.resolve(url)
  }
  return { file: url }
}

export async function compileSass(filePath: string) {
  const { renderSync } = require('sass')
  const { css } = renderSync({ file: filePath, importer: tildeImporter })
  return css
}
