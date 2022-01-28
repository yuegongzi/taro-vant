# Steps 步骤条

### 介绍

用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。

### 引入

在 Taro 文件中引入组件

```js
import { Steps } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <Steps
    steps={ this.state.steps }
    active={ this.state.active }
  />
</View>
 
```

```js
this.state = {
  steps: [{
    text: '步骤一',
    desc: '描述信息'
  }, {
    text: '步骤二',
    desc: '描述信息'
  }, {
    text: '步骤三',
    desc: '描述信息'
  }, {
    text: '步骤四',
    desc: '描述信息'
  }]
}; 
```

### 自定义样式

可以通过 `activeIcon` 和 `activeColor` 属性设置激活状态下的图标和颜色。

```jsx
<View>
  <Steps
    steps={ this.state.steps }
    active={ this.state.active }
    activeIcon="success"
    activeColor="#38f"
  />
</View>
 
```

### 自定义图标

可以通过 `inactiveIcon` 和 `activeIcon` 属性分别设置每一项的图标。

```jsx
<View>
  <Steps
    steps={ this.state.steps }
    active={ this.state.active }
  />
</View>
 
```

```js
this.state = {
  steps: [{
    text: '步骤一',
    desc: '描述信息',
    inactiveIcon: 'locationO',
    activeIcon: 'success'
  }, {
    text: '步骤二',
    desc: '描述信息',
    inactiveIcon: 'likeO',
    activeIcon: 'plus'
  }, {
    text: '步骤三',
    desc: '描述信息',
    inactiveIcon: 'starO',
    activeIcon: 'cross'
  }, {
    text: '步骤四',
    desc: '描述信息',
    inactiveIcon: 'phoneO',
    activeIcon: 'fail'
  }]
}; 
```

### 竖向步骤条

可以通过设置`direction`属性来改变步骤条的显示方式。

```jsx
<View>
  <Steps
    steps={ this.state.steps }
    active={ this.state.active }
    direction="vertical"
    activeColor="#ee0a24"
  />
</View>
 
```

## API

### Steps Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  active  | 当前步骤 | _number_ | 0 |
|  direction  | 显示方向，可选值为 `horizontal` `vertical` | _string_ | `horizontal` |
|  activeColor  | 激活状态颜色 | _string_ | `#07c160` |
|  inactiveColor  | 未激活状态颜色 | _string_ | `#969799` |
|  activeIcon  | 激活状态底部图标，可选值见 [Icon 组件](#/icon) | _string_ | `checked` |
|  inactiveIcon  | 未激活状态底部图标，可选值见 [Icon 组件](#/icon) | _string_ | - |

### Events

|  事件名称         | 说明                 | 回调参数                    |
| --------------- | -------------------- | --------------------------- |
|  onClickStep  | 点击步骤时触发的事件 | event.detail:当前步骤的索引 |