import { merge } from 'webpack-merge'
import { join } from 'path'
import { baseConfig } from './webpack.base'
import { setBuildTarget, getWebpackConfig, getVantConfig } from '../common'
import { ES_DIR, LIB_DIR } from '../common/constant'
import type { WebpackConfig } from '../common/types'

export function getPackageConfig(minify: boolean): WebpackConfig {
  setBuildTarget('package')

  const { name } = getVantConfig()

  return getWebpackConfig(
    merge(baseConfig as any, {
      mode: 'production',
      entry: {
        [name]: join(ES_DIR, 'index.js'),
      },
      stats: 'none',
      output: {
        path: LIB_DIR,
        library: name,
        libraryTarget: 'umd',
        filename: minify ? '[name].min.js' : '[name].js',
        umdNamedDefine: true,
        // https://github.com/webpack/webpack/issues/6522
        globalObject: 'typeof self !== \'undefined\' ? self : this',
      },
      externals: {
        React: {
          root: 'react',
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
        },
        Taro: {
          root: '@tarojs/taro',
        },
        Runtime: {
          root: '@tarojs/runtime',
        },
        Components: {
          root: '@tarojs/components',
        },
        ReactDom: {
          root: 'react-dom',
        },
      },
      performance: false,
      optimization: {
        minimize: minify,
      },
    }),
  )
}
