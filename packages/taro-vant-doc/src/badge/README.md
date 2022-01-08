# Badge 徽标

### 介绍

在右上角展示徽标数字或小红点。

### 引入

在 Taro 文件中引入组件

```js
import { Badge } from "taro-vant"; 
```

## 代码演示

### 基础用法

设置 `content` 属性后，Badge 会在子元素的右上角显示对应的徽标，也可以通过 `dot` 来显示小红点。

```jsx
<Badge content="5">
  <View class="child" />
</Badge>
<Badge content="10">
  <View class="child" />
</Badge>
<Badge content="Hot">
  <View class="child" />
</Badge>
<Badge dot>
  <View class="child" />
</Badge>

 
```

```stylelint

<style>
  .child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}
</style>

```

### 最大值

设置 `max` 属性后，当 `content` 的数值超过最大值时，会自动显示为 `{max}+`。

```jsx
  <Badge content="20" max="9">
    <View class="child" />
  </Badge>
  <Badge content="50" max="20">
    <View class="child" />
  </Badge>
  <Badge content="200" max="99">
    <View class="child" />
  </Badge>
```

### 自定义颜色

通过 `color` 属性来设置徽标的颜色。

```js
<Badge content="5" color="#1989fa">
  <View class="child" />
</Badge>
<Badge content="10" color="#1989fa">
  <View class="child" />
</Badge>
<Badge dot color="#1989fa">
  <View class="child" />
</Badge>
```

### 自定义徽标内容

```jsx
<Badge content={<Icon name="success" className="badge-icon" />}>
  <View class="child" />
</Badge>
 
```

### 独立展示

当 Badge 没有子元素时，会作为一个独立的元素进行展示。

```jsx
<Badge content="20" />

<Badge content="200" max="99" />
 
```

## API
### BadgeProps
| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| max | 最大值，超过最大值会显示 `max+`，仅当 content 为数字时有效 | _&nbsp;&nbsp;number&nbsp;&brvbar;&nbsp;string<br/>_ | - | `false` |
| dot | 是否展示为小红点 | _&nbsp;&nbsp;boolean<br/>_ | `false` | `false` |
| content | 徽标内容 | _&nbsp;&nbsp;string&nbsp;&brvbar;&nbsp;number<br/>_ | - | `false` |
| color | 徽标背景颜色 | _&nbsp;&nbsp;string<br/>_ | - | `false` |
| offset | 设置徽标的偏移量，数组的两项分别对应水平和垂直方向的偏移量，默认单位为 px | _&nbsp;&nbsp;(number&nbsp;&brvbar;&nbsp;string)[]<br/>_ | - | `false` |
| showZero | 当 content 为数字 0 时，是否展示徽标 | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| style | - | _&nbsp;&nbsp;CSSProperties&nbsp;&brvbar;&nbsp;any<br/>_ | - | `false` |
| children | - | _&nbsp;&nbsp;ReactNode<br/>_ | - | `false` |
| className | - | _&nbsp;&nbsp;string<br/>_ | - | `false` |

