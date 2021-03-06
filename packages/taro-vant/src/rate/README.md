# Rate 评分

### 介绍

用于对事物进行评级操作。

### 引入

在 Taro 文件中引入组件

```js
import { Rate } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <Rate
    value={ this.state.value }
    onChange={ this.onChange }
  />
</View>
 
```

```js
this.state = {
  value: 3
};

function onChange(event) {
  this.setState({
    value: event.detail
  });
} 
```

### 自定义图标

```jsx
<View>
  <Rate
    value={ this.state.value }
    icon="like"
    voidIcon="likeO"
    onChange={ this.onChange }
  />
</View>
 
```

### 自定义样式

```jsx
<View>
  <Rate
    value={ this.state.value }
    size={ 25 }
    color="#ffd21e"
    voidIcon="star"
    voidColor="#eee"
    onChange={ this.onChange }
  />
</View>
 
```

### 半星

```jsx
<View>
  <Rate
    value={ this.state.value }
    allowHalf={ true }
    voidIcon="star"
    voidColor="#eee"
    onChange={ this.onChange }
  />
</View>
 
```

```js
this.state = {
  value: 2.5
};

function onChange(event) {
  this.setState({
    value: event.detail
  });
} 
```

### 自定义数量

```jsx
<View>
  <Rate
    value={ this.state.value }
    count={ 6 }
    onChange={ this.onChange }
  />
</View>
 
```

### 禁用状态

```jsx
<View>
  <Rate
    disabled={ true }
    value={ this.state.value }
    onChange={ this.onChange }
  />
</View>
 
```

### 只读状态

```jsx
<View>
  <Rate
    readonly={ true }
    value={ this.state.value }
    onChange={ this.onChange }
  />
</View>
 
```

### 监听 change 事件

评分变化时，会触发 `change` 事件。

```jsx
<View>
  <Rate
    value={ this.state.value }
    onChange={ this.onChange }
  />
</View>
 
```

```js
this.state = {
  value: 2
};

function onChange(event) {
  Toast('当前值：' + event.detail);
} 
```

## API

### Props

| 参数            | 说明                                    | 类型        | 默认值       |
|---------------|---------------------------------------|-----------|-----------|
| name          | 在表单内提交时的标识符                           | _string_  | -         |
| value         | 当前分值                                  | _number_  | -         |
| count         | 图标总数                                  | _number_  | `5`       |
| size          | 图标大小，默认单位为 `px`                       | _string \ | number_   | `20px` |
| gutter        | 图标间距，默认单位为 `px`                       | _string \ | number_   | `4px` |
| color         | 选中时的颜色                                | _string_  | `#ffd21e` |
| voidColor     | 未选中时的颜色                               | _string_  | `#c7c7c7` |
| icon          | 选中时的图标名称或图片链接，可选值见 [Icon 组件](#/icon)  | _string_  | `star`    |
| voidIcon      | 未选中时的图标名称或图片链接，可选值见 [Icon 组件](#/icon) | _string_  | `star-o`  |
| allowHalf     | 是否允许半选                                | _boolean_ | `false`   |
| readonly      | 是否为只读状态                               | _boolean_ | `false`   |
| disabled      | 是否禁用评分                                | _boolean_ | `false`   |
| disabledColor | 禁用时的颜色                                | _string_  | `#bdbdbd` |
| touchable     | 是否可以通过滑动手势选择评分                        | _boolean_ | `true`    |

### Events

| 事件名称     | 说明           | 回调参数              |
|----------|--------------|-------------------|
| onChange | 当前分值变化时触发的事件 | event.detail:当前分值 |
