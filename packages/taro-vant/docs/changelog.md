# 更新日志

### 介绍

Taro Vant 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范。

**发布节奏**

- 修订号：包含新特性和问题修复。
- 次版本号：包含新特性和较大的功能更新，向下兼容。
- 主版本号：包含不兼容更新和重大功能更新。

## 更新内容

### 2.2.0

`2022-01-29`
**Bug Fixes**
- `TreeSelect` 修复自定义内容不生效的BUG  

**Document**
- 文档整体做迁移优化
- 新增`Pagination`分页组件文档

**Feature**
- 新增`Pagination`分页组件

**Refactor**
- 重构部分示例代码

### 2.1.1

`2022-01-20`


**Bug Fixes**
- `Dialog` `renderTitle`属性移除

**Document**
- 重构所有文档,修复一些文档描述错误

### 2.1.0

`2022-01-21`


**Performance**
- `Dialog` 重构Dialog的结构增加`cancelButtonProps` 和 `confirmButtonProps`更加方便定义属性

**Bug Fixes**
- `Dialog` `confirmButtonColor` 和 `cancelButtonColor`在theme为round-button时不生效的bug

### 2.0.16

`2022-01-19`


**Bug Fixes**
- `Address` `List`属性无法自定义checked的bug 
- `List` `NODE_ENV` = production时lodash/debounce报错的BUG

### 2.0.15

`2022-01-19`


**Bug Fixes**
- `Cascader` 顶部标题样式错位
- `Contact` 左侧图标显示异常
- `NoticeBar` 右侧图标显示异常


### 2.0.14

`2022-01-18`


**Performance**
- `Cell`重构自定义Icon的逻辑
- `Card`重构自定义Tag的逻辑
- `Field`重构自定义Icon的逻辑
- `NavBar`重构自定义左右两边内容的逻辑

**Document**
- `Field` 组件文档完善

### 2.0.13

`2022-01-18`


**Bug Fixes**
- 修复`Field`输入异常的BUG和textarea类型字数统计的bug


### 2.0.12

`2022-01-18`


**Bug Fixes**
- 修复`Swiper`在真机上 圆角显示错误
- `Address` 未导出
- `Contact` 未导出


### 2.0.11

`2022-01-17`


**Bug Fixes**
- 修复package.json `types`路径的错误
- `Cascader` 标题显示错误

### 2.0.10

`2022-01-15`


**Bug Fixes**
- 修复`cli`编译less部分语法不支持导致错误

**Dependency**
- 升级@tarojs/taro 到 `3.3.18` 解决`Events`导出问题

### 2.0.9

`2022-01-15`


**Bug Fixes**
- 修复`PropsType`定义不规范的问题
- 修复未发布typescript定义问题

### 2.0.8

`2022-01-15`


**Bug Fixes**
- Sku 选择商品有图片时不显示图片的BUG
- Stepper 伪类样式失效的BUG

### 2.0.7

`2022-01-14`


**Bug Fixes**
- Taro 锁定taro版本在`3.3.15` 之后的`3.3.x`版本在h5 API createAnimation 和 canvas上有bug
- NoticeBar 无法滚动的问题
- Calendar 循环索引引用错误

### 2.0.6

`2022-01-14`


**Bug Fixes**
- Collapse 在h5环境的异常表现
- Circle 在H5下的异常表现

**Features**
- Swiper 新增轮播

**Document**
- Swiper 新增文档说明

### 2.0.5

`2022-01-14`


**Bug Fixes**
- IndexBar 滚动时显示的异常
- GoodsAction 在H5下的异常表现
- 增加主题色功能,适用于大部分组件 可以通过全局设置`primary-color`来更改

**Features**
- Cascader 新增级联选择器

**Performance**
- 去除所有弹出类组件的show属性,修改为visible属性,保证体验的一致性
- 重新规划所有弹窗类组件的z-index顺序,保证在交互时能重叠展示
- 所有的组件样式变量抽取到组件目录下


### 2.0.4

`2022-01-12`


**Bug Fixes**
- GoodsAction 修复在H5环境时按钮显示不全的BUG
- useForm 修复空数据检测异常的BUG

### 2.0.3

`2022-01-12`

**Features**

- Address: 新增地址组件
- Contact: 新增联系人组件
- Cell: 新增`titleClass`属性
- Uploader: 删除`useBeforeRead`属性 改为通过判断是否传递`onBeforeRead`函数进行判断

**Bug Fixes**
- Cell 修复某些情况下展示数据异常的`BUG`

### 2.0.0

`2022-01-11`

**Features**

- 发布2.0.0正式版
- 同步发布开发文档
