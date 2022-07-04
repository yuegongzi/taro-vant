# NoticeBar 通知栏

### 介绍

用于循环播放展示一组消息通知。

### 引入

在 Taro 文件中引入组件

```js
import { NoticeBar } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <NoticeBar
    leftIcon="volumeO"
    text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
</View>
 
```

### 滚动播放

通知栏的内容长度溢出时会自动开启滚动播放，通过 `scrollable` 属性可以控制该行为。

```jsx
<View>
  {/*  文字较短时，通过设置 scrollable 属性开启滚动播放  */}
  <NoticeBar
    scrollable={ true }
    text="技术是开发它的人的共同灵魂。"
  /> 
  {/*  文字较长时，通过禁用 scrollable 属性关闭滚动播放  */}
  <NoticeBar
    scrollable={ false }
    text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
</View>
 
```

### 多行展示

文字较长时，可以通过设置 `wrapable` 属性来开启多行展示。

```jsx
<View>
  <NoticeBar
    wrapable={ true }
    scrollable={ false }
    text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
</View>
 
```

### 通知栏模式

通知栏支持 `closeable` 和 `link` 两种模式。

```jsx
<View>
  {/*  closeable 模式，在右侧显示关闭按钮  */}
  <NoticeBar
    mode="closeable"
    text="技术是开发它的人的共同灵魂。"
  /> 
  {/*  link 模式，在右侧显示链接箭头  */}
  <NoticeBar
    mode="link"
    text="技术是开发它的人的共同灵魂。"
  />
</View>
 
```

### 自定义样式

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

```jsx
<View>
  <NoticeBar
    color="#1989fa"
    background="#ecf9ff"
    leftIcon="infoO"
    text="技术是开发它的人的共同灵魂。"
  />
</View>
 
```

### 自定义滚动速率

使用`speed`属性控制滚动速率。

```jsx
<View>
  <NoticeBar
    text={ text }
    speed={speedValue}
    leftIcon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
  />
</View>
 
```

## API

### Props

| 参数         | 说明                            | 类型        | 默认值        |
|------------|-------------------------------|-----------|------------|
| mode       | 通知栏模式，可选值为 `closeable` `link` | _string_  | `''`       |
| text       | 通知文本内容                        | _string_  | `''`       |
| color      | 通知文本颜色                        | _string_  | `#ed6a0c`  |
| background | 滚动条背景                         | _string_  | `#fffbe8`  |
| leftIcon   | 左侧[图标名称](#/icon)或图片链接         | _string_  | -          |
| delay      | 动画延迟时间 (ms)                   | _number_  | `1`        |
| speed      | 滚动速率 (px/s)                   | _number_  | `60`       |
| scrollable | 是否开启滚动播放，内容长度溢出时默认开启          | _boolean_ | -          |
| wrapable   | 是否开启文本换行，只在禁用滚动时生效            | _boolean_ | `false`    |
| openType   | 微信开放能力                        | _string_  | `navigate` |

### Events

| 事件名     | 说明       | 参数             |
|---------|----------|----------------|
| onClick | 点击通知栏时触发 | _event: Event_ |
| onClose | 关闭通知栏时触发 | _event: Event_ |


