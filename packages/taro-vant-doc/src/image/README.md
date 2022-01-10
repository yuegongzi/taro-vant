# Image 图片

### 介绍

增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。

### 引入

在 Taro 文件中引入组件

```js
import { Image } from "taro-vant"; 
```

## 代码演示

### 基础用法

基础用法与原生 [image](<(https://developers.weixin.qq.com/miniprogram/dev/component/image.html)>) 标签一致，可以设置`src`、`width`、`height`等原生属性。

```jsx
<View>
  <Image
    width="100"
    height="100"
    src="https://img.yzcdn.cn/vant/cat.jpeg"
  />
</View>
 
```

### 填充模式

通过`fit`属性可以设置图片填充模式，可选值见下方表格。

```jsx
<View>
  <Image
    width="10rem"
    height="10rem"
    fit="contain"
    src="https://img.yzcdn.cn/vant/cat.jpeg"
  />
</View>
 
```

### 圆形图片

通过`round`属性可以设置图片变圆，注意当图片宽高不相等且`fit`为`contain`或`scaleDown`时，将无法填充一个完整的圆形。

```jsx
<View>
  <Image
    round={ true }
    width="10rem"
    height="10rem"
    src="https://img.yzcdn.cn/vant/cat.jpeg"
  />
</View>
 
```

### 图片懒加载

图片懒加载，在即将进入一定范围（上下三屏）时才开始加载。

```jsx
<View>
  <Image
    width="100"
    height="100"
    lazyLoad={ true }
    src="https://img.yzcdn.cn/vant/cat.jpeg"
  />
</View>
 
```

### 加载中提示

`Image`组件提供了默认的加载中提示，支持通过`loading`插槽自定义内容。

```jsx
<View>
  <Image
    renderLoading={ (
          <Loading
            type="spinner"
            size="20"
            vertical={ true }
          />
        ) }
  />
</View>
 
```

### 加载失败提示

`Image`组件提供了默认的加载失败提示，支持通过`renderError`来自定义内容。

```jsx
<View>
  <Image
    renderError={ (
          <Text>
            加载失败
          </Text>
        ) }
  />
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  src  | 图片链接 | _string_ | - |
|  fit  | 图片填充模式 | _string_ | _fill_ |
|  alt  | 替代文本 | _string_ | - |
|  width  | 宽度，默认单位为`px` | _string \| number_ | - |
|  height  | 高度，默认单位为`px` | _string \| number_ | - |
|  radius  | 圆角大小，默认单位为`px` | _string \| number_ | `0` |
|  round  | 是否显示为圆形 | _boolean_ | `false` |
|  lazyLoad  | 是否懒加载 | _boolean_ | `false` |
|  showError  | 是否展示图片加载失败提示 | _boolean_ | `true` |
|  showLoading  | 是否展示图片加载中提示 | _boolean_ | `true` |
|  errorIcon  | 失败时提示的图标 | _string\|ReactNode_ | `photo-fail` |
|  loadingIcon  | 加载时提示的图标 |  _string\|ReactNode_ | `photo` |
|  showMenuByLongpress  | 是否开启长按图片显示识别小程序码菜单 | _boolean_ | `false` |

### 图片填充模式 

|  名称       | 含义                                                   |
| --------- | ------------------------------------------------------ |
|  contain    | 保持宽高缩放图片，使图片的长边能完全显示出来           |
|  cover      | 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边 |
|  fill       | 拉伸图片，使图片填满元素                               |
|  widthfix   | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变   |
|  heightfix  | 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变   |
|  none       | 保持图片原有尺寸                                       |

### Events

|  事件名  | 说明               | 回调参数     |
| ------ | ------------------ | ------------ |
|  onClick   | 点击图片时触发     | event: Event |
|  onLoad    | 图片加载完毕时触发 | event: Event |
|  onError   | 图片加载失败时触发 | event: Event |
