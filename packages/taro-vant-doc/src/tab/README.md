# Tab 标签页

### 介绍

选项卡组件，用于在不同的内容区域之间进行切换。

### 引入

在 Taro 文件中引入组件

```js
import { Tabs } from "taro-vant"; 
const Tab = Tabs.Tab
```

## 代码演示

### 基础用法

通过`active`设定当前激活标签对应的索引值，默认情况下启用第一个标签。

```jsx
<View>
  <Tabs
    active={ this.state.active }
    onChange={ this.onChange }
  >
    <Tab title="标签 1">
      内容 1
    </Tab>
    <Tab title="标签 2">
      内容 2
    </Tab>
    <Tab title="标签 3">
      内容 3
    </Tab>
    <Tab title="标签 4">
      内容 4
    </Tab>
  </Tabs>
</View>
 
```

```js
this.state = {
  active: 1
};

function onChange(event) {
  wx.showToast({
    title: `切换到标签 ${event.detail.name}`,
    icon: 'none'
  });
} 
```

### 通过名称匹配

在标签指定`name`属性的情况下，`active`的值为当前标签的`name`（此时无法通过索引值来匹配标签）。

```jsx
<View>
  <Tabs active="a">
    <Tab
      title="标签 1"
      name="a"
    >
      内容 1
    </Tab>
    <Tab
      title="标签 2"
      name="b"
    >
      内容 2
    </Tab>
    <Tab
      title="标签 3"
      name="c"
    >
      内容 3
    </Tab>
  </Tabs>
</View>
 
```

### 横向滚动

多于 5 个标签时，Tab 可以横向滚动。

```jsx
<View>
  <Tabs active={ this.state.active }>
    <Tab title="标签 1">
      内容 1
    </Tab>
    <Tab title="标签 2">
      内容 2
    </Tab>
    <Tab title="标签 3">
      内容 3
    </Tab>
    <Tab title="标签 4">
      内容 4
    </Tab>
    <Tab title="标签 5">
      内容 5
    </Tab>
    <Tab title="标签 6">
      内容 6
    </Tab>
  </Tabs>
</View>
 
```

### 禁用标签

设置`disabled`属性即可禁用标签。如果需要监听禁用标签的点击事件，可以在`vanTabs`上监听`disabled`事件。

```jsx
<View>
  <Tabs onDisabled={ this.onClickDisabled }>
    <Tab title="标签 1">
      内容 1
    </Tab>
    <Tab
      title="标签 2"
      disabled={ true }
    >
      内容 2
    </Tab>
    <Tab title="标签 3">
      内容 3
    </Tab>
  </Tabs>
</View>
 
```

```js
 
```

### 样式风格

`Tab`支持两种样式风格：`line`和`card`，默认为`line`样式，可以通过`type`属性修改样式风格。

```jsx
<View>
  <Tabs type="card">
    <Tab title="标签 1">
      内容 1
    </Tab>
    <Tab title="标签 2">
      内容 2
    </Tab>
    <Tab title="标签 3">
      内容 3
    </Tab>
  </Tabs>
</View>
 
```

### 点击事件

可以在`vanTabs`上绑定`click`事件，在回调参数的`event.detail`中可以取得被点击标签的标题和标识符。

```jsx
<View>
  <Tabs onClick={ this.onClick }>
    <Tab title="标签 1">
      内容 1
    </Tab>
    <Tab title="标签 2">
      内容 2
    </Tab>
  </Tabs>
</View>
 
```

```js
 
```

### 粘性布局

通过`sticky`属性可以开启粘性布局，粘性布局下，当 Tab 滚动到顶部时会自动吸顶。

```jsx
<View>
  <Tabs sticky={ true }>
    <Tab title="标签 1">
      内容 1
    </Tab>
    <Tab title="标签 2">
      内容 2
    </Tab>
    <Tab title="标签 3">
      内容 3
    </Tab>
    <Tab title="标签 4">
      内容 4
    </Tab>
  </Tabs>
</View>
 
```

### 切换动画

可以通过`animated`来设置是否启用切换 tab 时的动画。

```jsx
<View>
  <Tabs animated={ true }>
    <Tab title="标签 1">
      内容 1
    </Tab>
    <Tab title="标签 2">
      内容 2
    </Tab>
    <Tab title="标签 3">
      内容 3
    </Tab>
    <Tab title="标签 4">
      内容 4
    </Tab>
  </Tabs>
</View>
 
```

### 滑动切换

通过`swipeable`属性可以开启滑动切换标签页。

```jsx
<View>
  <Tabs swipeable={ true }>
    <Tab title="标签 1">
      内容 1
    </Tab>
    <Tab title="标签 2">
      内容 2
    </Tab>
    <Tab title="标签 3">
      内容 3
    </Tab>
    <Tab title="标签 4">
      内容 4
    </Tab>
  </Tabs>
</View>
 
```

### 嵌套 popup

如果将 vanTabs 嵌套在 vanPopup 等会隐藏内容的组件或节点内，当 vanTabs 显示时下划线将不会正常显示。

此时可以通过使用 `wx:if` 手动控制 vanTabs 的渲染来规避这种场景。

```jsx
<View>
  <Popup show={ this.state.show }>
    { this.state.show.map((item, index) => (
        <Tabs>
          <Tab title="标签 1">
            内容 1
          </Tab>
          <Tab title="标签 2">
            内容 2
          </Tab>
          <Tab title="标签 3">
            内容 3
          </Tab>
          <Tab title="标签 4">
            内容 4
          </Tab>
        </Tabs>
      
      )) }
  </Popup>
</View>
 
```

## API

### Tabs Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  type  | 样式风格，可选值为`card` | _string_ | `line` |
|  color  | 标签主题色 | _string_ | `#ee0a24` |
|  active  | 当前选中标签的标识符 | _string \| number_ | `0` |
|  duration  | 动画时间，单位秒 | _number_ | `0.3` |
|  lineWidth  | 底部条宽度，默认单位`px` | _string \| number_ | `40px` |
|  lineHeight  | 底部条高度，默认单位`px` | _string \| number_ | `3px` |
|  animated  | 是否开启切换标签内容时的转场动画 | _boolean_ | `false` |
|  border  | 是否展示外边框，仅在 `line` 风格下生效 | _boolean_ | `false` |
|  ellipsis  | 是否省略过长的标题文字 | _boolean_ | `true` |
|  sticky  | 是否使用粘性定位布局 | _boolean_ | `false` |
|  swipeable  | 是否开启手势滑动切换 | _boolean_ | `false` |
|  lazyRender  | 是否开启标签页内容延迟渲染 | _boolean_ | `true` |
|  offsetTop  | 粘性定位布局下与顶部的最小距离，单位`px` | _number_ | - |
|  swipeThreshold  | 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动 | _number_ | `5` |
|  titleActiveColor  | 标题选中态颜色 | _string_ | - |
|  titleInactiveColor  | 标题默认态颜色 | _string_ | - |
|  zIndex  | z-index 层级 | _number_ | `1` |

### Tab Props

|  参数         | 说明                       | 类型               | 默认值       |
| ----------- | -------------------------- | ------------------ | ------------ |
|  name         | 标签名称，作为匹配的标识符 | _string \| number_ | 标签的索引值 |
|  title        | 标题                       | _string_           | -            |
|  disabled     | 是否禁用标签               | _boolean_          | `false`      |
|  dot          | 是否显示小红点             | _boolean_          | -            |
|  badge         | 图标右上角提示信息         | _string \| number_ | -            |
|  titleStyle  | 自定义标题样式             | _string_           | -            |
|  titleClass  | 自定义标题样式类            | _string_           | -            |

### Tabs Event

|  事件名  | 说明 | 参数 |
| --- | --- | --- |
|  onClick  | 点击标签时触发 | name：标签标识符，title：标题 |
|  onChange  | 当前激活的标签改变时触发 | name：标签标识符，title：标题 |
|  onDisabled  | 点击被禁用的标签时触发 | name：标签标识符，title：标题 |
|  onScroll  | 滚动时触发 | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |


### 方法

通过 `ref` 可以获取到 Tabs 实例并调用实例方法。

|  方法名  | 参数 | 返回值 | 介绍 |
| --- | --- | --- | --- |
|  resize  | - | - | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 |

## 常见问题

### 组件从隐藏状态切换到显示状态时，底部条位置错误？

Tabs 组件在挂载时，会获取自身的宽度，并计算出底部条的位置。如果组件一开始处于隐藏状态，则获取到的宽度永远为 0，因此无法展示底部条位置。
