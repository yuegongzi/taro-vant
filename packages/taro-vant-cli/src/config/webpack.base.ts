import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import { join, resolve } from 'path'
import { existsSync } from 'fs'
import { consola } from '../common/logger'
import type { WebpackConfig } from '../common/types'
import {
  CACHE_DIR,
  CWD,
  POSTCSS_CONFIG_FILE,
  SCRIPT_EXTS,
  STYLE_EXTS,
} from '../common/constant'

const CACHE_LOADER = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: CACHE_DIR,
  },
}

const CSS_LOADERS = [
  'style-loader',
  'css-loader',
  {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        config: existsSync(POSTCSS_CONFIG_FILE) && POSTCSS_CONFIG_FILE,
      },
    },
  },
]

const plugins = [
  new FriendlyErrorsPlugin({
    clearConsole: false,
    logLevel: 'WARNING',
  }),
]

const tsconfigPath = join(CWD, 'tsconfig.json')
if (existsSync(tsconfigPath)) {
  const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
  plugins.push(
    new ForkTsCheckerPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
      formatter: 'codeframe',
      logger: {
        // skip info message
        info() {},
        warn(message: string) {
          consola.warn(message)
        },
        error(message: string) {
          consola.error(message)
        },
      },
    }),
  )
}

export const baseConfig: WebpackConfig = {
  mode: 'development',
  resolve: {
    extensions: [ ...SCRIPT_EXTS, ...STYLE_EXTS ],
    alias: {
      'taro-vant': resolve(process.cwd(), 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules\/(?!(@taro-vant\/cli))/,
        use: [
          CACHE_LOADER,
          {
            loader: 'babel-loader',
            query: {
              compact: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [ ...CSS_LOADERS, 'less-loader' ],
      },
      {
        test: /\.md$/,
        use: [
          CACHE_LOADER,
          'babel-loader',
          {
            loader: require.resolve('@react-vant/markdown-loader'),
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
        },
      },
    ],
  },
  plugins,
}
