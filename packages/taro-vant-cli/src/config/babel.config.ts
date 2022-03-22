module.exports = function (api, options) {
  if (api) {
    api.cache.never()
  }

  // const { BABEL_MODULE, NODE_ENV } = process.env
  // const isTest = NODE_ENV === 'test'
  // const useESModules = BABEL_MODULE !== 'commonjs' && !isTest

  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          // modules: useESModules ? false : 'commonjs',
          modules: false,
          useBuiltIns: false,
          loose: options.loose,
        },
      ],
      [
        require.resolve('@babel/preset-typescript'),
        {
          isTSX: true,
          jsxPragma: 'React',
          allExtensions: true,
          allowNamespaces: true,
        },
      ],
      [ require.resolve('@babel/preset-react'), { runtime: 'automatic' } ],
    ],
    plugins: [
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          absoluteRuntime: false,
          corejs: { version: 3, proposals: false },
          helpers: true, // 使用到@babel/runtime
          regenerator: true, // 使用到@babel/runtime
          useESModules: false,
        },
      ],
    ],
  }
}

export default module.exports
