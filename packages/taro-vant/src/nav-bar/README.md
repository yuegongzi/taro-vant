# NavBar 导航栏

### 介绍

为页面提供导航功能，常用于页面顶部。

### 引入

在 Taro 文件中引入组件

```js
import { NavBar } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <NavBar
    title="标题"
    leftText="返回"
    rightText="按钮"
    leftArrow={ true }
    onClickLeft={ onClickLeft }
    onClickRight={ this.onClickRight }
  />
</View>
 
```

```js
function onClickRight() {
  wx.showToast({
    title: '点击按钮',
    icon: 'none'
  });
} 
```

### 高级用法

```jsx
<View>
  <NavBar
    title="标题"
    leftText="返回"
    leftArrow={ true }
    rightText={
      <Block>
        <Icon name="search" className="icon" size="36"></Icon>
      </Block>
    }
  >
  </NavBar>
</View>
 
```

## API

### Props

| 参数               | 说明                | 类型        | 默认值        |
|------------------|-------------------|-----------|------------|
| title            | 标题                | _string\  | ReactNode_ | `''` |
| leftText         | 左侧文案              | _string\  | ReactNode_ | `''` |
| rightText        | 右侧文案              | _string\  | ReactNode_ | `''` |
| leftArrow        | 是否显示左侧箭头          | _boolean_ | `false`    |
| fixed            | 是否固定在顶部           | _boolean_ | `false`    |
| placeholder      | 固定在顶部时是否开启占位      | _boolean_ | `false`    |
| border           | 是否显示下边框           | _boolean_ | `true`     |
| zIndex           | 元素 z-index        | _number_  | `805`      |
| style            | 根节点自定义样式          | _string_  | -          |
| safeAreaInsetTop | 是否留出顶部安全距离（状态栏高度） | _boolean_ | `true`     |


### Events

| 事件名          | 说明        | 参数  |
|--------------|-----------|-----|
| onClickLeft  | 点击左侧按钮时触发 | -   |
| onClickRight | 点击右侧按钮时触发 | -   |
