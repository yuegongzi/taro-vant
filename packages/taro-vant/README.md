<p align="center">
  <img alt="logo" src="https://img.yzcdn.cn/vant/logo.png" width="120" style="margin-bottom: 10px;">
</p>
<h3 align="center">轻量、可靠的小程序 UI 组件库</h3>

<p align="center">
  <img src="https://img.shields.io/npm/v/@vant/weapp.svg?style=for-the-badge" alt="npm version" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=#4fc08d" />
  <img src="https://img.shields.io/npm/dt/@vant/weapp.svg?style=for-the-badge&color=#4fc08d" alt="downloads" />
  <img src="https://img.shields.io/npm/dm/@vant/weapp.svg?style=for-the-badge&color=#4fc08d" alt="downloads" />
</p>

<p align="center">
  🌈 <a href="https://doc-vant.ejiexi.com/">文档网站</a>
</p>

---


### 介绍

Vant 是**有赞前端团队**开源的移动端组件库，于 2017 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。

Taro-Vant将Vant进行移植到Taro版本,并进行部分组件的优化调整使其更符合React风格使用
额外增加两个组件
* List
* Form 

## 预览

扫描下方小程序二维码，体验官方组件库示例：

<img src="https://img.yzcdn.cn/vant-weapp/qrcode-201808101114.jpg" width="200" height="200" style="margin-top: 10px;" >

## 使用之前

使用 Taro Vant 前，请确保你已经学习过微信官方的 [小程序简易教程](https://developers.weixin.qq.com/miniprogram/dev/framework/) 和 [Taro介绍]('https://taro-docs.jd.com/taro/docs/README/index.html')

## 安装

### 通过 npm 安装 (推荐)

小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)

```bash
# 切换私有源
yrm add ejiexi https://npm.ejiexi.com
yrm use ejiexi
# 通过 npm 安装
npm i taro-vant -S --production

# 通过 yarn 安装
yarn add taro-vant --production

# 安装 0.x 版本
npm i vant-weapp -S --production
```


## 使用组件

以按钮组件为例，只需要在jsx文件中引入即可

```jsx
import { Button } from 'taro-vant'
// your code

```

接着就可以在 wxml 中直接使用组件

```html
<van-button type="primary">按钮</van-button>
```

## 在开发者工具中预览

```bash
# 安装项目依赖
npm install

# 执行组件编译
npm run dev
```

打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 把`taro-vant/packages/taro-vant-demo`目录添加进去就可以预览示例了。

PS：关于 `Area` Area 省市区选择组件，地区数据初始化可以直接在云开发环境中导入[数据](https://github.com/youzan/vant-weapp/blob/dev/example/database_area.json) 文件使用。

## 基础库版本

Taro Vant 最低支持到小程序基础库 2.6.5 版本。
