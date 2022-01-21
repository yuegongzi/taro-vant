# Dialog 弹出框

### 介绍

弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作，支持函数调用和组件调用两种方式。

### 引入

在 Taro 文件中引入组件

```js
import { Dialog } from "taro-vant"; 
```

## 代码演示

### 消息提示

用于提示一些消息，只包含一个确认按钮。

```jsx
<View>
  <Dialog id="van-dialog" />
</View>
 
```

```javascript
import { Dialog } from 'taro-vant';

Dialog.alert({
  title: '标题',
  message: '弹窗内容',
}).then(() => {
  // on close
});

Dialog.alert({
  message: '弹窗内容',
}).then(() => {
  // on close
});
```

### 消息确认

用于确认消息，包含取消和确认按钮。

```jsx
<View>
  <Dialog id="vanDialog" />
</View>
 
```

```javascript
import { Dialog } from 'taro-vant';

Dialog.confirm({
  title: '标题',
  message: '弹窗内容',
})
  .then(() => {
    // on confirm
  })
  .catch(() => {
    // on cancel
  });
```

### 圆角按钮风格

将 theme 选项设置为 `roundButton` 可以展示圆角按钮风格的弹窗。

```jsx
<View>
  <Dialog id="vanDialog" />
</View>
 
```

```javascript
import { Dialog } from 'taro-vant';

Dialog.alert({
  title: '标题',
  message: '弹窗内容',
  theme: 'roundButton',
}).then(() => {
  // on close
});

Dialog.alert({
  message: '弹窗内容',
  theme: 'roundButton',
}).then(() => {
  // on close
});
```

### 异步关闭

通过 `beforeClose` 属性可以传入一个回调函数，在弹窗关闭前进行特定操作。

```jsx
<View>
  <Dialog id="vanDialog" />
</View>
 
```

```javascript
import { Dialog } from 'taro-vant';

const beforeClose = (action) => new Promise((resolve) => {
  setTimeout(() => {
    if (action === 'confirm') {
      resolve(true);
    } else {
      // 拦截取消操作
      resolve(false);
    }
  }, 1000);
});

Dialog.confirm({
  title: '标题',
  message: '弹窗内容'
  beforeClose
});
```

### 组件调用

如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。

```jsx
<View>
  <Dialog
    title="标题"
    visible={ this.state.show }
    showCancelButton={ true }
    confirmButtonOpenType="getUserInfo"
    onClose={ this.onClose }
    onGetuserinfo={ getUserInfo }
  >
    <Image src="https://img.yzcdn.cn/1.jpg" />
  </Dialog>
</View>
 
```

```js
this.state = {
  show: true
};

function getUserInfo(event) {
  console.log(event.detail);
}

function onClose() {
  this.setState({
    show: false
  });
} 
```

## API

### 方法

|  方法名  | 参数 | 返回值 | 介绍 |
| --- | --- | --- | --- |
|  Dialog.alert  | `options` | `Promise` | 展示消息提示弹窗 |
|  Dialog.confirm  | `options` | `Promise` | 展示消息确认弹窗 |
|  Dialog.setdefaultoptions  | `options` | `void` | 修改默认配置，对所有 Dialog 生效 |
|  Dialog.resetdefaultoptions  | - | `void` | 重置默认配置，对所有 Dialog 生效 |
|  Dialog.close  | - | `void` | 关闭弹窗 |
|  Dialog.stoploading  | - | `void` | 停止按钮的加载状态 |

### Options

通过函数调用 Dialog 时，支持传入以下选项：

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  visible  | 是否显示弹窗 | _boolean_ | - |
|  title  | 标题 | _string_ | - |
|  width  | 弹窗宽度，默认单位为`px` | _string \| number_ | `320px` |
|  message  | 文本内容，支持通过`\n`换行 | _string_ | - |
|  messageAlign  | 内容对齐方式，可选值为`left` `right` | _string_ | `center` |
|  theme  | 样式风格，可选值为`round-button` | _string_ | `default` |
|  zIndex  | z-index 层级 | _number_ | `1010` |
|  classname  | 自定义类名，dialog 在自定义组件内时无效 | _string_ | '' |
|  style  | 自定义样式 | _string_ | '' |
|  selector  | 自定义选择器 | _string_ | `van-dialog` |
|  showConfirmButton  | 是否展示确认按钮 | _boolean_ | `true` |
|  showCancelButton  | 是否展示取消按钮 | _boolean_ | `false` |
|  confirmButtonText  | 确认按钮的文案 | _string_ | `确认` |
|  cancelButtonText  | 取消按钮的文案 | _string_ | `取消` |
|  overlay  | 是否展示遮罩层 | _boolean_ | `true` |
|  closeOnClickOverlay  | 点击遮罩层时是否关闭弹窗 | _boolean_ | `false` |
|  beforeClose  | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | _(action) => boolean \| Promise\<boolean\>_ | - |
|  overlayStyle  | 自定义overlay样式 | _object_ | - |
|  transition  | 动画名称，可选值为`fade` `none` | _string_ | `scale` |
|  cancelButtonProps `v2.1.0` | 取消按钮属性[Button](#/button) | _object_ | `-` |
|  confirmButtonProps `v2.1.0` | 确认按钮属性[Button](#/button) | _object_ | `-` |

### Props

通过组件调用 Dialog 时，支持以下 Props:

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  visible  | 是否显示弹窗 | _boolean_ | - |
|  title  | 标题 | _string_ | - |
|  width  | 弹窗宽度，默认单位为`px` | _string \| number_ | `320px` |
|  message  | 文本内容，支持通过`\n`换行 | _string_ | - |
|  theme  | 样式风格，可选值为`round-button` | _string_ | `default` |
|  messageAlign  | 内容对齐方式，可选值为`left` `right` | _string_ | `center` |
|  zIndex  | z-index 层级 | _number_ | `1010` |
|  className  | 自定义类名，dialog 在自定义组件内时无效 | _string_ | '' |
|  style  | 自定义样式 | _string_ | '' |
|  showConfirmButton  | 是否展示确认按钮 | _boolean_ | `true` |
|  showCancelButton  | 是否展示取消按钮 | _boolean_ | `false` |
|  confirmButtonText  | 确认按钮的文案 | _string_ | `确认` |
|  cancelButtonText  | 取消按钮的文案 | _string_ | `取消` |
|  confirmButtonColor  | 确认按钮的字体颜色 `theme`为`round-button`时为背景色  | _string_ | `#ee0a24` |
|  cancelButtonColor  | 取消按钮的字体颜色 `theme`为`round-button`时为背景色 | _string_ | `#333` |
|  overlay  | 是否展示遮罩层 | _boolean_ | `true` |
|  overlayStyle | 自定义遮罩层样式 | _object_ | - |
|  closeOnClickOverlay  | 点击遮罩层时是否关闭弹窗 | _boolean_ | `false` |
|  beforeClose  | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | _(action) => boolean \| Promise\<boolean\>_ | - |
|  transition  | 动画名称，可选值为`fade` | _string_ | `scale` |
|  cancelButtonProps `v2.1.0` | 取消按钮属性[Button](#/button) | _object_ | `-` |
|  confirmButtonProps `v2.1.0` | 确认按钮属性[Button](#/button) | _object_ | `-` |


### Events

|  事件  | 说明 | 回调参数 |
| --- | --- | --- |
|  onClose  | 弹窗关闭时触发 | event.detail: 触发关闭事件的来源，<br>枚举为`confirm`,`cancel`,`overlay` |
|  onConfirm  | 点击确认按钮时触发 | - |
|  onCancel  | 点击取消按钮时触发 | - |

