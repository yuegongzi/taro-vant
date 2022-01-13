# ActionSheet 动作面板

### 介绍

底部弹起的模态面板，包含与当前情境相关的多个选项。

### 引入

在 Taro 文件中引入组件

```js
import { ActionSheet } from "taro-vant"; 
```

## 代码演示

### 基础用法

需要传入一个`actions`的数组，数组的每一项是一个对象，对象属性见文档下方表格。

```jsx
<View>
  <ActionSheet
    visible={  this.state.show }
    actions={  this.state.actions }
    onClose={ this.onClose }
    onSelect={ this.onSelect }
  />
</View>
 
```

```js
this.state = {
  show: false,
  actions: [{
    name: '选项'
  }, {
    name: '选项'
  }, {
    name: '选项',
    subname: '描述信息',
    openType: 'share'
  }]
};

function onClose() {
  this.setState({
    show: false
  });
}

function onSelect(event) {
  console.log(event.detail);
} 
```

### 选项状态

选项可以设置为加载状态或禁用状态。

```jsx
<View>
  <ActionSheet
    visible={  this.state.show }
    actions={  this.actions }
    cancelText="取消"
  />
</View>
 
```

```js
this.state = {
  show: false,
  actions: [{
    name: '着色选项',
    color: '#ee0a24'
  }, {
    loading: true
  }, {
    name: '禁用选项',
    disabled: true
  }]
}; 
```

### 展示取消按钮

设置`cancelText`属性后，会在底部展示取消按钮，点击后关闭当前菜单。

```jsx
<View>
  <ActionSheet
    visible={  this.state.show }
    actions={  this.actions }
    cancelText="取消"
  />
</View>
 
```

### 展示描述信息

设置`description`属性后，会在选项上方显示描述信息。

```jsx
<View>
  <ActionSheet
    visible={  this.state.show }
    actions={  this.actions }
    description="这是一段描述信息"
  />
</View>
 
```

### 展示标题栏

通过设置`title`属性展示标题栏，同时可以使用插槽自定义菜单内容。

```jsx
<View>
  <ActionSheet
    visible={  this.state.show }
    title="标题"
  >
    <View>
      内容
    </View>
  </ActionSheet>
</View>
 
```

### 微信开放能力

需要传入一个`actions`的数组，数组的每一项是一个对象，对象属性见文档下方表格。

```jsx
<View>
  <ActionSheet
    visible={  this.state.show }
    actions={  this.state.actions }
    onClose={ this.onClose }
    onGetuserinfo={ this.onGetUserInfo }
  />
</View>
 
```

```js
this.state = {
  show: false,
  actions: [{
    name: '获取用户信息',
    color: '#07c160',
    openType: 'getUserInfo'
  }]
};

function onClose() {
  this.setState({
    show: false
  });
}

function onGetUserInfo(e) {
  console.log(e.detail);
} 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  visible  | 是否显示动作面板 | _boolean_ | - |
|  actions  | 菜单选项 | _Array_ | `[]` |
|  title  | 标题 | _string_ | - |
|  description `v1.0.0`  | 选项上方的描述信息 | _string_ | - |
|  zIndex  | z-index 层级 | _number_ | `1010` |
|  cancelText  | 取消按钮文字 | _string_ | - |
|  overlay  | 是否显示遮罩层 | _boolean_ | - |
|  round `v1.0.0`  | 是否显示圆角 | _boolean_ | `true` |
|  closeOnClickAction  | 是否在点击选项后关闭 | _boolean_ | `true` |
|  closeOnClickOverlay  | 点击遮罩是否关闭菜单 | _boolean_ | - |
|  safeAreaInsetBottom  | 是否为 iPhoneX 留出底部安全距离 | _boolean_ | `true` |

### Events

|  事件名  | 说明 | 参数 |
| --- | --- | --- |
|  onSelect  | 选中选项时触发，禁用或加载状态下不会触发 | event.detail: 选项对应的对象 |
|  onClose  | 关闭时触发 | - |
|  onCancel  | 取消按钮点击时触发 | - |
|  onClickOverlay  | 点击遮罩层时触发 | - |

### actions

`API`中的`actions`为一个对象数组，数组中的每一个对象配置每一列，每一列有以下`key`：

|  键名  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  name  | 标题 | _string_ | - |
|  subname  | 二级标题 | _string_ | - |
|  color  | 选项文字颜色 | _string_ | - |
|  loading  | 是否为加载状态 | _boolean_ | - |
|  disabled  | 是否为禁用状态 | _boolean_ | - |
