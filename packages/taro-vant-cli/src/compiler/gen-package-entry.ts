import { join } from 'path'
import { get } from 'lodash'
import {
  getComponents,
  normalizePath,
  pascalize,
  smartOutputFile,
} from '../common'
import { getVantConfig, SRC_DIR } from '../common/constant'

type PathResolver = (path: string) => string

function getPathByName(name: string, pathResolver?: PathResolver) {
  let path = join(SRC_DIR, name)
  if (pathResolver) {
    path = pathResolver(path)
  }
  return normalizePath(path)
}

function genImports(
  names: string[],
  pathResolver?: PathResolver,
  namedExport?: boolean,
): string {
  return names.
    map((name) => {
      const pascalName = pascalize(name)
      const importName = namedExport ? `{ ${pascalName} }` : pascalName
      const importPath = getPathByName(name, pathResolver)

      return `import ${importName} from '${importPath}';`
    }).
    join('\n')
}

function genExports(
  names: string[],
  pathResolver?: PathResolver,
  namedExport?: boolean,
): string {
  if (namedExport) {
    const exports = names.
      map((name) => `export * from '${getPathByName(name, pathResolver)}';`).
      join('\n')

    return `
  ${exports}
`
  }

  return `
  export {
    ${names.map(pascalize).join(',\n  ')}
  };
  `
}

export function genPackageEntry({
  outputPath,
  pathResolver,
}: {
  outputPath: string
  pathResolver?: PathResolver
}) {
  const names = getComponents()
  const vantConfig = getVantConfig()

  const namedExport = get(vantConfig, 'build.namedExport', false)

  const content = `
${genImports(names, pathResolver, namedExport)}

${genExports(names, pathResolver, namedExport)}
`

  smartOutputFile(outputPath, content)
}
