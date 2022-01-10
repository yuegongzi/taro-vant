# Stepper 步进器

### 介绍

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

### 引入

在 Taro 文件中引入组件

```js
import { Stepper } from "taro-vant"; 
```

## 代码演示

### 基础用法

通过`value`设置输入值，可以通过`change`事件监听到输入值的变化。

```jsx
<View>
  <Stepper
    value={ 1 }
    onChange={ this.onChange }
  />
</View>
 
```

```js
 
```

### 步长设置

通过`step`属性设置每次点击增加或减少按钮时变化的值，默认为`1`。

```jsx
<View>
  <Stepper
    value={ 1 }
    step="2"
  />
</View>
 
```

### 限制输入范围

通过`min`和`max`属性限制输入值的范围。

```jsx
<View>
  <Stepper
    value={ 5 }
    min="5"
    max="8"
  />
</View>
 
```

### 限制输入整数

设置`integer`属性后，输入框将限制只能输入整数。

```jsx
<View>
  <Stepper
    value={ 1 }
    integer={ true }
  />
</View>
 
```

### 禁用状态

通过设置`disabled`属性来禁用步进器，禁用状态下无法点击按钮或修改输入框。

```jsx
<View>
  <Stepper
    value={ 1 }
    disabled={ true }
  />
</View>
 
```

### 关闭长按

通过设置`longPress`属性决定步进器是否开启长按手势。

```jsx
<View>
  <Stepper
    value={ 1 }
    longPress={ false }
  />
</View>
 
```

### 固定小数位数

通过设置`decimalLength`属性可以保留固定的小数位数。

```jsx
<View>
  <Stepper
    value={ 1 }
    step="0.2"
    decimalLength={ 1 }
  />
</View>
 
```

### 异步变更

如果需要异步地修改输入框的值，可以设置`asyncChange`属性，并在`change`事件中手动修改`value`。

```jsx
<View>
  <Stepper
    value={ this.state.value }
    asyncChange={ true }
    onChange={ this.onChange }
  />
</View>
 
```

```js
this.state = {
  value: 1
};

function onChange(value) {
  Toast.loading({
    forbidClick: true
  });
  setTimeout(() => {
    Toast.clear();
    this.setState({
      value
    });
  }, 500);
} 
```

### 自定义大小

通过`inputWidth`属性设置输入框宽度，通过`buttonSize`属性设置按钮大小和输入框高度。

```jsx
<View>
  <Stepper
    value={ 1 }
    inputWidth="40px"
    buttonSize="32px"
  />
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  name  | 在表单内提交时的标识符 | _string_ | - |
|  value  | 输入值 | _string \| number_ | 最小值 |
|  min  | 最小值 | _string \| number_ | `1` |
|  max  | 最大值 | _string \| number_ | - |
|  step  | 步长 | _string \| number_ | `1` |
|  integer  | 是否只允许输入整数 | _boolean_ | `false` |
|  disabled  | 是否禁用 | _boolean_ | `false` |
|  disableInput  | 是否禁用输入框 | _boolean_ | `false` |
|  asyncChange  | 是否开启异步变更，开启后需要手动控制输入值 | _boolean_ | `false` |
|  inputWidth  | 输入框宽度，默认单位为 `px` | _string \| number_ | `32px` |
|  buttonSize  | 按钮大小，默认单位为 `px`，输入框高度会和按钮大小保持一致 | _string \| number_ | `28px` |
|  showPlus  | 是否显示增加按钮 | _boolean_ | `true` |
|  showMinus  | 是否显示减少按钮 | _boolean_ | `true` |
|  decimalLength  | 固定显示的小数位数 | _number_ | - |
|  theme  | 样式风格，可选值为 `round` | _string_ | - |
|  disablePlus  | 是否禁用增加按钮 | _boolean_ | - |
|  disableMinus  | 是否禁用减少按钮 | _boolean_ | - |
|  longPress  | 是否开启长按手势 | _boolean_ | `true` |
|  alwaysEmbed `v1.9.3`  | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效) |  _boolean_ | `false` |

### Events

|  事件名          | 说明                     | 回调参数                   |
| -------------- | ------------------------ | -------------------------- |
|  onChange     | 当绑定值变化时触发的事件 | event.detail: 当前输入的值 |
|  onOverlimit  | 点击不可用的按钮时触发   | -                          |
|  onPlus       | 点击增加按钮时触发       | -                          |
|  onMinus      | 点击减少按钮时触发       | -                          |
|  onFocus      | 输入框聚焦时触发         | -                          |
|  onBlur       | 输入框失焦时触发         | -                          |

