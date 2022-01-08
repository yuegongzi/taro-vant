# Icon 图标

### 介绍

基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。

### 引入

在 Taro 文件中引入组件

```js
import { Icon } from "taro-vant"; 
```

## 代码演示

### 基础用法

`Icon`的`name`属性支持传入图标名称或图片链接。

```jsx
<View>
  <Icon name="close" />
  <Icon name="https://b.yzcdn.cn/vant/iconDemo-1126.png" />
</View>
 
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标。

```jsx
<View>
  <Icon
    name="chat"
    dot={ true }
  />
  <Icon
    name="chat"
    info="9"
  />
  <Icon
    name="chat"
    info="99+"
  />
</View>
 
```

### 图标颜色

设置`color`属性来控制图标颜色。

```jsx
<View>
  <Icon
    name="chat"
    color="red"
  />
</View>
 
```

### 图标大小

设置`size`属性来控制图标大小。

```jsx
<View>
  <Icon
    name="chat"
    size="50px"
  />
</View>
 
```

### 自定义图标

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。例如，可以在 `app.wxss` 文件中引入。

```css
/* 引入第三方或自定义的字体图标样式 */
@fontFace {
  fontFamily: 'myIcon';
  src: url('./myIcon.ttf') format('truetype');
}

.myIcon {
  fontFamily: 'myIcon';
}

.myIconExtra::before {
  content: '\e626';
}
```

```jsx
<View>
  {/*  通过 classPrefix 指定类名为 myIcon  */}
  <Icon
    classPrefix="myIcon"
    name="extra"
  />
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  name  | 图标名称或图片链接 | _string_ | - |
|  dot  | 是否显示图标右上角小红点 | _boolean_ | `false` |
|  info  | 图标右上角文字提示 | _string \| number_ | - |
|  color  | 图标颜色 | _string_ | `inherit` |
|  size  | 图标大小，如 `20px`，`2em`，默认单位为`px` | _string \| number_ | `inherit` |
|  customStyle  | 自定义样式 | _string_ | - |
|  classPrefix  | 类名前缀 | _string_ | `van-icon` |

### Events

|  事件名      | 说明           | 参数 |
| ---------- | -------------- | ---- |
|  onClick  | 点击图标时触发 | -    |

### 外部样式类

|  类名          | 说明         |
| ------------ | ------------ |
|  customClass  | 根节点样式类 |

## 常见问题

### 开发者工具上提示 Failed to load font 是什么情况？

这个是开发者工具本身的问题，可以忽略，具体可以查看[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html) - 注意事项第 5 条。
