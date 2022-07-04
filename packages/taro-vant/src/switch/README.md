# Switch 开关

### 介绍

用于在打开和关闭状态之间进行切换。

### 引入

在 Taro 文件中引入组件

```js
import { Switch } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <Switch
    checked={ this.state.checked }
    onChange={ this.onChange }
  />
</View>
 
```

```js
this.state = {
  checked: true
};

function onChange({
  detail
}) {
  // 需要手动对 checked 状态进行更新
  this.setState({
    checked: detail
  });
} 
```

### 禁用状态

```jsx
<View>
  <Switch
    checked={ this.state.checked }
    disabled={ true }
  />
</View>
 
```

### 加载状态

```jsx
<View>
  <Switch
    checked={ this.state.checked }
    loading={ true }
  />
</View>
 
```

### 自定义大小

```jsx
<View>
  <Switch
    checked={ this.state.checked }
    size="24px"
  />
</View>
 
```

### 自定义颜色

```jsx
<View>
  <Switch
    checked={ this.state.checked }
    activeColor="#07c160"
    inactiveColor="#ee0a24"
  />
</View>
 
```

### 异步控制

```jsx
<View>
  <Switch
    checked={ this.state.checked }
    onChange={ this.onChange }
  />
</View>
 
```

```js
this.state = {
  checked: true
};

function onChange({
  detail
}) {
  wx.showModal({
    title: '提示',
    content: '是否切换开关？',
    success: res => {
      if (res.confirm) {
        this.setState({
          checked2: detail
        });
      }
    }
  });
} 
```

## API

### Props

| 参数            | 说明          | 类型        | 默认值     |
|---------------|-------------|-----------|---------|
| name          | 在表单内提交时的标识符 | _string_  | -       |
| checked       | 开关选中状态      | _any_     | `false` |
| loading       | 是否为加载状态     | _boolean_ | `false` |
| disabled      | 是否为禁用状态     | _boolean_ | `false` |
| size          | 开关尺寸        | _string_  | `30px`  |
| activeColor   | 打开时的背景色     | _string_  | `-`     |
| inactiveColor | 关闭时的背景色     | _string_  | `#fff`  |
| activeValue   | 打开时的值       | _any_     | `true`  |
| inactiveValue | 关闭时的值       | _any_     | `false` |

### Events

| 事件名      | 说明       | 参数                   |
|----------|----------|----------------------|
| onChange | 开关状态切换回调 | event.detail: 是否选中开关 |
