# 更新日志

### 介绍

Taro Vant 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范。

**发布节奏**

- 修订号：包含新特性和问题修复。
- 次版本号：包含新特性和较大的功能更新，向下兼容。
- 主版本号：包含不兼容更新和重大功能更新。

## 更新内容

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
