import merge from 'webpack-merge'
import WebpackBar from 'webpackbar'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { get } from 'lodash'
import { join } from 'path'
import { baseConfig } from './webpack.base'
import type { WebpackConfig } from '../common/types'
import { getVantConfig, getWebpackConfig } from '../common'
import { VantCliSitePlugin } from '../compiler/vant-cli-site-plugin'
import { GREEN, SITE_DESKTOP_SHARED_FILE } from '../common/constant'

export function getSiteDevBaseConfig(): WebpackConfig {
  const vantConfig = getVantConfig()
  const baiduAnalytics = get(vantConfig, 'site.baiduAnalytics')

  function getSiteConfig() {
    const siteConfig = vantConfig.site
    if (siteConfig.locales) {
      return siteConfig.locales[siteConfig.defaultLang || 'en-US']
    }
    return siteConfig
  }

  function getTitle(config: { title: string; description?: string }) {
    let { title } = config

    if (config.description) {
      title += ` - ${config.description}`
    }

    return title
  }

  const siteConfig = getSiteConfig()
  const title = getTitle(siteConfig)
  return merge(baseConfig as WebpackConfig, {
    entry: {
      'site-desktop': [ join(__dirname, '../../site/desktop/main.js') ],
    },
    devServer: {
      port: 3000,
      quiet: true,
      host: '0.0.0.0',
      stats: 'errors-only',
      publicPath: '/',
      disableHostCheck: true,
    },
    resolve: {
      alias: {
        'site-desktop-shared': SITE_DESKTOP_SHARED_FILE,
      },
    },
    output: {
      chunkFilename: '[name].js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          chunks: {
            chunks: 'all',
            minChunks: 2,
            minSize: 0,
            name: 'chunks',
          },
        },
      },
    },
    plugins: [
      new WebpackBar({
        name: 'Taro Vant Cli',
        color: GREEN,
      }),
      new VantCliSitePlugin(),
      new HtmlWebpackPlugin({
        title,
        logo: siteConfig.logo,
        description: siteConfig.description,
        chunks: [ 'chunks', 'site-desktop' ],
        template: join(__dirname, '../../site/desktop/index.html'),
        filename: 'index.html',
        baiduAnalytics,
      }),
    ],
  })
}

export function getSiteDevConfig(): WebpackConfig {
  return getWebpackConfig(getSiteDevBaseConfig())
}
