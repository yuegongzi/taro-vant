# 快速上手

### 背景知识

使用 taro-vant 前，请确保你已经学习过[Taro框架React版](https://taro.zone/) 或者 [React](https://reactjs.org/) 

### 差异点
- 组件属性均用驼峰代替
- slot改为通过属性传递ReactNode


### 支持程度
- Taro需要使用3.0+的版本
- 小程序参考Taro的最低支持程度

### 开始开发

- 拉取代码

```bash
## 安装lerna 基础依赖

$ yarn
## 安装 项目依赖

$ yarn bootstrap

## 进入每个项目启动即可
## 也可以执行如下方式启动

$ lerna run watch --scope=taro-vant

## 添加依赖包
$ lerna add xxx --scope=xxx

```


## 开始使用

### 通过 npm/yarn 安装

```bash
# 通过 npm 安装
npm install taro-vant

# 通过 yarn 安装
yarn add taro-vant
```

> 由于引用 node_modules 的模块，默认不会编译，所以需要额外给 H5 配置 esnextModules，在 taro 项目的 config/index.js 中新增如下配置项：

```js
h5: {
  esnextModules: ['taro-vant'],
  postcss: {
    autoprefixer: {
      enable: true,
      config: {
      }
    },
    pxtransform: {
      enable: true,
      config: {},
    },
    cssModules: {
      enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      config: {
        namingPattern: 'module', // 转换模式，取值为 global/module
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      }
    }
  }
}
```

### 其他注意事项

#### 需要注意开发者工具的项目设置：

* 需要设置关闭 ES6 转 ES5 功能，开启可能报错
* 需要设置关闭上传代码时样式自动补全，开启可能报错
* 需要设置关闭代码压缩上传，开启可能报错


## 引入组件

### 方式一. 通过 babel 插件按需引入组件

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 语句自动转换为按需引入的方式。

```bash
# 安装插件
npm i babel-plugin-import -D
```

在.babelrc 或 babel.config.js 中添加配置：

```js
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "taro-vant",
        "libraryDirectory": "es",
        "style": true
      },
      "taro-vant"
    ]
  ]
}
```

```js
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "taro-vant",
        "libraryDirectory": "es",
        "style": (name) => `${name}/style/less`,
      },
      "taro-vant"
    ]
  ]
}
```

接着你可以在代码中直接引入 Taro Vant 组件，插件会自动将代码转化为按需引入的形式。

```js
// 原始代码
import { Button } from 'taro-vant';

// 编译后代码
import Button from 'taro-vant/es/button';
import 'taro-vant/es/button/style';
```

### 方式二. 在 Vite 项目中按需引入组件

对于 vite 项目，可以使用 [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) 实现按需引入, 原理和 `babel-plugin-import` 类似。

```bash
# 安装插件
npm i vite-plugin-style-import -D
```

```js
// vite.config.js
import styleImport from 'vite-plugin-style-import';

export default {
  plugins: [
    styleImport({
      libs: [
        {
          libraryName: 'taro-vant',
          esModule: true,
          resolveStyle: (name) => `taro-vant/es/${name}/style`,
        },
      ],
    }),
  ],
};
```

### 方式三. 手动按需引入组件

在不使用插件的情况下，可以手动引入需要使用的组件和样式。

```js
// 引入组件
import Button from 'taro-vant/es/button';
// 引入组件对应的样式，若组件没有样式文件，则无须引入
import 'taro-vant/es/button/style';
```

### 方式四. 导入所有组件

Vant 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法。

```js
import 'taro-vant/lib/index.css';
```

> Tips: 配置按需引入后，将不允许直接导入所有组件。


### 注意

```js
// Taro小程序
"miniCssExtractPluginOption": {
  "ignoreOrder": true,
}
```

```js
// react
new MiniCssExtractPlugin({
  "ignoreOrder": true,
  ...
})
```

> 线上打包的时候会提示conflicating order between ... 此类警告，可以通过ignoreOrder:true关闭

### 单位尺寸转化问题

默认的尺寸规则 [作用参考](https://taro-docs.jd.com/taro/docs/size) [修改参考](https://taro-docs.jd.com/taro/docs/config)

```json
{
  "designWidth": 750,
  "deviceRatio": {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2,
  },
}
```

如何在js中转换单位

```js
import { pxTransform } from '@tarojs/taro'
// 小程序转rpx H5转rem
pxTransform(10)
```
