module.exports = {
  presets: [
    [
      require.resolve('@taro-vant/cli/preset'),
      {
        presets: {
          env: {
            debug: false,
            useBuiltIns: false,
            modules: false,
          },
          react: {
            runtime: 'automatic',
          },
          typescript: {
            isTSX: true,
            jsxPragma: 'React',
            allExtensions: true,
            allowNamespaces: true,
          },
        },
        runtime: {
          absoluteRuntime: false,
          corejs: { version: 3, proposals: false },
          helpers: true, // 使用到@babel/runtime
          regenerator: true, // 使用到@babel/runtime
          useESModules: false,
        },
      },
    ],
  ],
}
