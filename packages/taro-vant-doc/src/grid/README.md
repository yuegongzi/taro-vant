# Grid 宫格

### 介绍

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

### 引入

在 Taro 文件中引入组件

```js
import { Grid } from "taro-vant";
import { GridItem } from "taro-vant"; 
```

> Vant Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)

## 代码演示

### 基本用法

通过`icon`属性设置格子内的图标，`text`属性设置文字内容。

```jsx
<View>
  <Grid>
    <GridItem
      icon="photoO"
      text="文字"
    />
    <GridItem
      icon="photoO"
      text="文字"
    />
    <GridItem
      icon="photoO"
      text="文字"
    />
    <GridItem
      icon="photoO"
      text="文字"
    />
  </Grid>
</View>
 
```

### 自定义列数

默认一行展示四个格子，可以通过`columnNum`自定义列数。

```jsx
<View>
  <Grid columnNum="3">
    <GridItem
      icon="photoO"
      text="文字"
    /> )) }
  </Grid>
</View>
 
```

### 自定义内容

通过插槽可以自定义格子展示的内容。

```jsx
<View>
  <Grid
    columnNum="3"
    border={ false }
  >
    { (new Array(3)).map((item, index) => (
        <GridItem forItem="index">
          <Image
            style="width: 100%; height: 90px;"
            src={ `https://img.yzcdn.cn/vant/apple-${ index + 1 }.jpg` }
          />
        </GridItem>
      
      )) }
  </Grid>
</View>
 
```

### 正方形格子

设置`square`属性后，格子的高度会和宽度保持一致。

```jsx
<View>
  <Grid square={ true }>
    <GridItem
      icon="photoO"
      text="文字"
    /> )) }
  </Grid>
</View>
 
```

### 格子间距

通过`gutter`属性设置格子之间的距离。

```jsx
<View>
  <Grid gutter={  10 }>
    <GridItem
      icon="photoO"
      text="文字"
    /> )) }
  </Grid>
</View>
 
```

### 内容横排

将`direction`属性设置为`horizontal`，可以让宫格的内容呈横向排列。

```jsx
<View>
  <Grid
    direction="horizontal"
    columnNum="2"
  >
    <GridItem
      icon="photoO"
      text="文字"
    />
    <GridItem
      icon="photoO"
      text="文字"
    />
    <GridItem
      icon="photoO"
      text="文字"
    />
  </Grid>
</View>
 
```

### 页面跳转

可以通过`url`属性进行页面跳转，通过`linkType`属性控制跳转类型。

```jsx
<View>
  <Grid
    clickable={ true }
    columnNum="2"
  >
    <GridItem
      icon="homeO"
      linkType="navigateTo"
      url="/pages/dashboard/index"
      text="Navigate 跳转"
    />
    <GridItem
      icon="search"
      linkType="reLaunch"
      url="/pages/dashboard/index"
      text="ReLaunch 跳转"
    />
  </Grid>
</View>
 
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`badge`属性后，会在图标右上角展示相应的徽标。

```jsx
<View>
  <Grid columnNum="2">
    <GridItem
      icon="homeO"
      text="文字"
      dot={ true }
    />
    <GridItem
      icon="search"
      text="文字"
      badge="99+"
    />
  </Grid>
</View>
 
```

## API

### Grid Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  columnNum  | 列数 | _number_ | `4` |
|  iconSize `v1.3.2`  | 图标大小，默认单位为`px` | _string_ | `28px` |
|  gutter  | 格子之间的间距，默认单位为`px` | _string \| number_ | `0` |
|  border  | 是否显示边框 | _boolean_ | `true` |
|  center  | 是否将格子内容居中显示 | _boolean_ | `true` |
|  square  | 是否将格子固定为正方形 | _boolean_ | `false` |
|  clickable  | 是否开启格子点击反馈 | _boolean_ | `false` |
|  direction  | 格子内容排列的方向，可选值为 `horizontal` | _string_ | `vertical` |
|  reverse `v1.7.0`  | 是否调换图标和文本的位置 | _boolean_ | `false` |
|  useSlot  | 是否使用自定义内容的插槽 | _boolean_ | `false` |

### Grid 外部样式类

|  类名          | 说明         |
| ------------ | ------------ |
|  customClass  | 根节点样式类 |

### GridItem Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  text  | 文字 | _string_ | - |
|  icon  | 图标名称或图片链接，可选值见 [Icon 组件](#/icon) | _string_ | - |
|  iconColor  | 图标颜色 | _string_ | - |
|  iconPrefix `v1.7.0`  | 第三方图标前缀 | _string_ | `van-icon` |
|  dot  | 是否显示图标右上角小红点 | _boolean_ | `false` |
|  badge  | 图标右上角徽标的内容 | _string \| number_ | - |
|  url  | 点击后跳转的链接地址 | _string_ | - |
|  linkType  | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | _string_ | `navigateTo` |

### GridItem Events

|  事件名      | 说明           | 回调参数 |
| ---------- | -------------- | -------- |
|  onClick  | 点击格子时触发 | -        |

### GridItem Slots

|  名称  | 说明                                                   |
| ---- | ------------------------------------------------------ |
|       | 自定义宫格的所有内容，需要设置`use-slot`属性           |
|  icon  | 自定义图标，如果设置了`use-slot`或者`icon`属性则不生效 |
|  text  | 自定义文字，如果设置了`use-slot`或者`text`属性则不生效 |

### GridItem 外部样式类

|  类名           | 说明         |
| ------------- | ------------ |
|  customClass   | 根节点样式类 |
|  contentClass  | 内容样式类   |
|  iconClass     | 图标样式类   |
|  textClass     | 文本样式类   |
