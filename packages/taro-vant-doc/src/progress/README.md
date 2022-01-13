# Progress 进度条

### 介绍

用于展示操作的当前进度。

### 引入

在 Taro 文件中引入组件

```js
import { Progress } from "taro-vant"; 
```

## 代码演示

### 基础用法

进度条默认为蓝色，使用`percentage`属性来设置当前进度。

```jsx
<View>
  <Progress percentage="50" />
</View>
 
```

### 线条粗细

通过`strokeWidth`可以设置进度条的粗细。

```jsx
<View>
  <Progress
    percentage="50"
    strokeWidth="8"
  />
</View>
 
```

### 置灰

设置`inactive`属性后进度条将置灰。

```jsx
<View>
  <Progress
    inactive={ true }
    percentage="50"
  />
</View>
 
```

### 样式定制

可以使用`pivotText`属性自定义文字，`color`属性自定义进度条颜色。

```jsx
<View>
  <Progress
    pivotText="橙色"
    color="#f2826a"
    percentage="25"
  />
  <Progress
    pivotText="红色"
    color="#ee0a24"
    percentage="50"
  />
  <Progress
    percentage="75"
    pivotText="紫色"
    pivotColor="#7232dd"
    color="linearGradient(to right, #be99ff, #7232dd)"
  />
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  inactive  | 是否置灰 | _boolean_ | `false` |
|  percentage  | 进度百分比 | _number_ | `0` |
|  strokeWidth  | 进度条粗细，默认单位为`px` | _string \| number_ | `4px` |
|  showPivot  | 是否显示进度文字 | _boolean_ | `true` |
|  color  | 进度条颜色 | _string_ | `-` |
|  textColor  | 进度文字颜色 | _string_ | `#fff` |
|  trackColor  | 轨道颜色 | _string_ | `#e5e5e5` |
|  pivotText  | 文字显示 | _string_ | 百分比文字 |
|  pivotColor  | 文字背景色 | _string_ | 与进度条颜色一致 |