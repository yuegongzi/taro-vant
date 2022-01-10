# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

### 引入

在 Taro 文件中引入组件

```js
import { Popup } from "taro-vant"; 
```

## 代码演示

### 基础用法

通过`show`属性控制弹出层是否展示。

```jsx
<View>
  <Cell
    title="展示弹出层"
    isLink={ true }
    onClick={ this.showPopup }
  />
  <Popup
    show={ this.state.show }
    onClose={ this.onClose }
  >
    内容
  </Popup>
</View>
 
```

```js
this.state = {
  show: false
};

function showPopup() {
  this.setState({
    show: true
  });
}

function onClose() {
  this.setState({
    show: false
  });
} 
```

### 弹出位置

通过`position`属性设置弹出位置，默认居中弹出，可以设置为`top`、`bottom`、`left`、`right`。

```jsx
<View>
  <Popup
    show={ this.state.show }
    position="top"
    style="height: 20%;"
    onClose={ this.onClose }
  />
</View>
 
```

### 关闭图标

设置`closeable`属性后，会在弹出层的右上角显示关闭图标，并且可以通过`closeIcon`属性自定义图标，使用`closeIconPosition`属性可以自定义图标位置。

```jsx
<View>
  <Popup
    show={ this.state.show }
    closeable={ true }
    position="bottom"
    style="height: 20%"
    onClose={ this.onClose }
  />
   {/*  自定义图标  */}
  <Popup
    show={ this.state.show }
    closeable={ true }
    closeIcon="close"
    position="bottom"
    style="height: 20%"
    onClose={ this.onClose }
  /> 
  {/*  图标位置  */}
  <Popup
    show={ this.state.show }
    closeable={ true }
    closeIconPosition="topLeft"
    position="bottom"
    style="height: 20%"
    onClose={ this.onClose }
  />
</View>
 
```

### 圆角弹窗

设置`round`属性后，弹窗会根据弹出位置添加不同的圆角样式。

```jsx
<View>
  <Popup
    show={ this.state.show }
    round={ true }
    position="bottom"
    style="height: 20%"
    onClose={ this.onClose }
  />
</View>
 
```

### 禁止滚动穿透

使用组件时，会发现内容部分滚动到底时，继续划动会导致底层页面的滚动，这就是滚动穿透。

目前，组件可以通过 `lockScroll` 属性处理部分滚动穿透问题。 **但由于小程序自身原因，弹窗内容区域仍会出现滚动穿透。** 不过，我们为开发者提供了一个推荐方案以完整解决滚动穿透：

#### [pageMeta](https://developers.weixin.qq.com/miniprogram/dev/component/pageMeta.html)

当小程序基础库最低版本在 2.9.0 以上时，即可使用 [pageMeta](https://developers.weixin.qq.com/miniprogram/dev/component/pageMeta.html) 组件动态修改页面样式

```jsx
<View>
  {/*  pageMeta 只能是页面内的第一个节点  */}
  <pageMeta pageStyle={ this.state.show ? 'overflow: hidden;' : '' } />
  <Popup show={ this.state.show } />
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  show  | 是否显示弹出层 | _boolean_ | `false` |
|  zIndex  | z-index 层级 | _number_ | `100` |
|  overlay  | 是否显示遮罩层 | _boolean_ | `true` |
|  position  | 弹出位置，可选值为 `top` `bottom` `right` `left` | _string_ | `center` |
|  duration  | 动画时长，单位为毫秒 | _number \| object_ | `300` |
|  round  | 是否显示圆角 | _boolean_ | `false` |
|  style  | 自定义弹出层样式 | _string_ | `''` |
|  overlayStyle  | 自定义遮罩层样式 | _string_ | `''` |
|  closeOnClickOverlay  | 是否在点击遮罩层后关闭 | _boolean_ | `true` |
|  closeable  | 是否显示关闭图标 | _boolean_ | `false` |
|  closeIcon  | 关闭图标名称或图片链接 | _string_ | `cross` |
|  safeAreaInsetBottom  | 是否为 iPhoneX 留出底部安全距离 | _boolean_ | `true` |
|  safeAreaInsetTop  | 是否留出顶部安全距离（状态栏高度） | _boolean_ | `false` |
|  lockScroll `v1.7.3`  | 是否锁定背景滚动 | _boolean_ | `true` |

### Events

|  事件名              | 说明             | 参数 |
| ------------------ | ---------------- | ---- |
|  onClose          | 关闭弹出层时触发 | -    |
|  onClickOverlay  | 点击遮罩层时触发 | -    |
|  onBeforeEnter   | 进入前触发       | -    |
|  onEnter          | 进入中触发       | -    |
|  onAfterEnter    | 进入后触发       | -    |
|  onBeforeLeave   | 离开前触发       | -    |
|  onLeave          | 离开中触发       | -    |
|  onAfterLeave    | 离开后触发       | -    |