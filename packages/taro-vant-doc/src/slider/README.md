# Slider 滑块

### 介绍

滑动输入条，用于在给定的范围内选择一个值。

### 引入

在 Taro 文件中引入组件

```js
import { Slider } from "taro-vant"; 
```

## 代码演示

### 基本用法

```jsx
<View>
  <Slider
    value="50"
    onChange={ this.onChange }
  />
</View>
 
```

```js
 
```

### 双滑块

添加 `range` 属性就可以开启双滑块模式，确保 `value` 的值是一个数组。

```jsx
<View>
  <Slider
    value={ 10, 50 }
    range={ true }
    change={this.onChange}
  />
</View>
 
```

```js
 
```

### 指定选择范围

```jsx
<View>
  <Slider
    min="-50"
    max="50"
  />
</View>
 
```

### 禁用

```jsx
<View>
  <Slider
    value="50"
    disabled={ true }
  />
</View>
 
```

### 指定步长

```jsx
<View>
  <Slider
    value="50"
    step="10"
  />
</View>
 
```

### 自定义样式

```jsx
<View>
  <Slider
    value="50"
    barHeight="4px"
    activeColor="#ee0a24"
  />
</View>
 
```

### 自定义按钮

```jsx
<View>
  <Slider
    value={ this.state.currentValue }
    onDrag={ this.onDrag }
    button={ (
      <View
        class="customButton"
      >
        { this.state.currentValue }/100
      </View>
    )}
  />
</View>
 
```

```js
this.state = {
  currentValue: 50
};

function onDrag(event) {
  this.setState({
    currentValue: event.detail.value
  });
} 
```

### 垂直方向

设置 `vertical` 属性后，滑块会垂直展示，且高度为 100% 父元素高度。

```jsx
<View>
  <View style="height: 150px;">
    <Slider
      value="50"
      vertical={ true }
      onChange={ this.onChange }
    />
    <Slider
      value={ [10, 50] }
      range={ true }
      vertical={ true }
      style="marginLeft: 100px;"
      onChange={ this.onChange }
    />
  </View>
</View>
 
```

```js
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  value  | 当前进度百分比，在双滑块模式下为数组格式 | _number \| number[]_ | `0` |
|  disabled  | 是否禁用滑块 | _boolean_ | `false` |
|  max  | 最大值 | _number_ | `100` |
|  min  | 最小值 | _number_ | `0` |
|  step  | 步长 | _number_ | `1` |
|  barHeight  | 进度条高度，默认单位为 `px` | _string \| number_ | `2px` |
|  activeColor  | 进度条激活态颜色 | _string_ | `#1989fa` |
|  inactiveColor  | 进度条默认颜色 | _string_ | `#e5e5e5` |
|  range | 是否开启双滑块模式 | _boolean_ | `false` |
|  vertical | 是否垂直展示 | _boolean_ | `false` |
|  button   | 自定义滑块按钮 | _ReactNode_ | `-` |
|  leftButton | 自定义左侧滑块按钮（双滑块模式下） | _ReactNode_ | `-` |
|  rightButton | 自定义右侧滑块按钮 （双滑块模式下） | _ReactNode_ | `-` |
### Events

|  事件名           | 说明             | 参数                         |
| --------------- | ---------------- | ---------------------------- |
|  onDrag        | 拖动进度条时触发 | event.detail.value: 当前进度 |
|  onChange      | 进度值改变后触发 | event.detail: 当前进度       |
|  onDragStart  | 开始拖动时触发   | -                            |
|  onDragEnd    | 结束拖动时触发   | -                            |
