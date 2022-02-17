import path from 'path'
const pkg = require('../package.json')

function getVersion() {
  function fillZero(value) {
    return value < 10 ? `0${value}` : `${value}`
  }

  const date = new Date()

  return `${date.getFullYear() - 2010}.${date.getMonth()}${fillZero(
    date.getDay(),
  )}.${date.getHours()}${fillZero(date.getMinutes())}`
}

const version = getVersion()

let config = {
  projectName: pkg.name,
  date: '2021-07-15',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: process.env.TARO_ENV === 'h5' ? 'build' : process.env.TARO_ENV,
  env: {
    API_ENV: JSON.stringify(process.env.API_ENV),
    WATCHING: JSON.stringify(process.env.WATCHING || 'false'),
    DEPLOY_VERSION: JSON.stringify(version),
  },
  alias: {
    '@': path.resolve(process.cwd(), 'src'),
    components: path.resolve(__dirname, '..', 'src/components'),
    react: path.resolve(process.cwd(), './node_modules/react'),
  },
  framework: 'react',
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
  },
  h5: {
    webpackChain(chain) {
      const publicPath = process.env.PUBLIC_PATH || '/'
      if (process.env.NODE_ENV === 'production') {
        chain.mode('production')
        chain.devtool('hidden-source-map')
        chain.output.
          path(path.resolve('./build')).
          filename('assets/js/[name].js').
          chunkFilename('assets/js/chunk/[name].js').
          publicPath(publicPath.replace('VERSION', version))
      } else {
        chain.mode('development')
        chain.devtool('eval-cheap-module-source-map')
        chain.output.
          path(path.resolve('./build')).
          filename('assets/js/[name].js').
          chunkFilename('assets/js/chunk/[name].js').
          publicPath(publicPath.replace('VERSION', version))
      }
      if (process.env.WATCHING === 'true') {
        chain.output.publicPath('/')
      }
    },
    router: {
      mode: 'hash',
    },
    devServer: {
      port: 10086,
      hot: true,
      host: '0.0.0.0',
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*', // 表示允许跨域
      },
    },
    esnextModules: [ 'taro-vant' ],
    proxy: {},
    postcss: {
      autoprefixer: {
        enable: true,
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    miniCssExtractPluginOption: {
      ignoreOrder: false,
      filename: 'assets/css/[name].css',
      chunkFilename: 'assets/css/chunk/[name].css',
    },
  },
}

module.exports = function (merge) {
  return merge({}, config, require(`./${process.env.NODE_ENV}`))
}
