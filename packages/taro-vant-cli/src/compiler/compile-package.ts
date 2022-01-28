import { build } from 'vite'
import { mergeCustomViteConfig } from '../common'
import { getViteConfigForPackage } from '../config/vite.package'

export async function compilePackage(
  minify: boolean,
): ReturnType<typeof build> {
  const config = mergeCustomViteConfig(getViteConfigForPackage(minify))
  return build(config)
}
