# Card 商品卡片

### 介绍

商品卡片，用于展示商品的图片、价格等信息。

### 引入

在 Taro 文件中引入组件

```js
import { Card } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <Card
    num="2"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    thumb={ imageURL }
  />
</View>
 
```

### 高级用法


```jsx
<View>
  <Card
    num="2"
    tag="标签"
    price="10.00"
    desc="描述信息"
    title="商品标题"
    thumb={  imageURL  }
    footer={(
      <View>
        <Button size="mini">
          按钮
        </Button>
        <Button size="mini">
          按钮
        </Button>
      </View>
    )}
  />
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  thumb  | 左侧图片 | _string_ | - |
|  thumbMode  | 左侧图片裁剪、缩放的模式，可选值参考小程序 image 组件 mode 属性值 | _string_ | `aspectFit` |
|  title  | 标题 | _ReactNode_ | - |
|  desc  | 描述 | _ReactNode_ | - |
|  tag  | 标签 | _string\|ReactNode_ | - |
|  num  | 商品数量 | _string \| number\|ReactNode_ | - |
|  price  | 商品价格 | _string \| number_ | - |
|  originPrice  | 商品划线原价 | _string \| number\|ReactNode_ | - |
|  centered  | 内容是否垂直居中 | _string_ | `false` |
|  currency  | 货币符号 | _string_ | `¥` |
|  thumbLink  | 点击左侧图片后跳转的链接地址 | _string_ | - |
|  linkType  | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | _string_ | `navigateTo` |
|  lazyLoad  | 是否开启图片懒加载 | _boolean_ | `false` |
|  priceTop  | 自定义价格上方区域 | _ReactNode_ | `-` |
|  bottom  | 自定义价格下方区域 | _ReactNode_ | `-` |
|  footer   | 自定义右下角内容 | _ReactNode_ | `-` |
|  tags  | 自定义描述下方标签区域 | _ReactNode_ | `-` |



