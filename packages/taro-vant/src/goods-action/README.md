# GoodsAction 商品导航

### 介绍

用于为商品相关操作提供便捷交互。

### 引入

在 Taro 文件中引入组件

```js
import { GoodsAction } from "taro-vant";
import { GoodsActionIcon } from "taro-vant";
import { GoodsActionButton } from "taro-vant"; 
```


## 代码演示

### 基础用法

```jsx
<View>
  <GoodsAction>
    <GoodsActionIcon
      icon="chatO"
      text="客服"
      onClick={ onClickIcon }
    />
    <GoodsActionIcon
      icon="cartO"
      text="购物车"
      onClick={ onClickIcon }
    />
    <GoodsActionButton
      text="加入购物车"
      type="warning"
      onClick={ this.onClickButton }
    />
    <GoodsActionButton
      text="立即购买"
      onClick={ this.onClickButton }
    />
  </GoodsAction>
</View>
 
```

```js
function onClickButton() {
  Toast('点击按钮');
} 
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标。

```jsx
<View>
  <GoodsAction>
    <GoodsActionIcon
      icon="chatO"
      text="客服"
      dot={ true }
    />
    <GoodsActionIcon
      icon="cartO"
      text="购物车"
      info="5"
    />
    <GoodsActionIcon
      icon="shopO"
      text="店铺"
    />
    <GoodsActionButton
      text="加入购物车"
      type="warning"
    />
    <GoodsActionButton text="立即购买" />
  </GoodsAction>
</View>
 
```

### 自定义按钮颜色

通过`color`属性可以自定义按钮的颜色，支持传入`linearGradient`渐变色。

```jsx
<View>
  <GoodsAction>
    <GoodsActionIcon
      icon="chatO"
      text="客服"
    />
    <GoodsActionIcon
      icon="cartO"
      text="购物车"
      info="5"
    />
    <GoodsActionIcon
      icon="shopO"
      text="店铺"
    />
    <GoodsActionButton
      color="#be99ff"
      text="加入购物车"
      type="warning"
    />
    <GoodsActionButton
      color="#7232dd"
      text="立即购买"
    />
  </GoodsAction>
</View>
 
```

### 朴素按钮

通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```jsx
<View>
  <GoodsAction>
    <GoodsActionIcon
      icon="chatO"
      text="客服"
    />
    <GoodsActionIcon
      icon="cartO"
      text="购物车"
      info="5"
    />
    <GoodsActionIcon
      icon="shopO"
      text="店铺"
    />
    <GoodsActionButton
      color="#7232dd"
      text="加入购物"
      type="warning"
    />
    <GoodsActionButton
      plain={ true }
      color="#7232dd"
      text="立即购买"
    />
  </GoodsAction>
</View>
 
```

## API

### GoodsAction Props

| 参数                  | 说明                   | 类型        | 默认值    |
|---------------------|----------------------|-----------|--------|
| safeAreaInsetBottom | 是否为 iPhoneX 留出底部安全距离 | _boolean_ | `true` |

### GoodsActionIcon Props

| 参数       | 说明                                              | 类型        | 默认值          |
|----------|-------------------------------------------------|-----------|--------------|
| text     | 按钮文字                                            | _string_  | -            |
| icon     | 图标类型，可选值见`icon`组件                               | _string_  | -            |
| badge    | 图标右上角提示信息                                       | _string \ | number_      | - |
| url      | 点击后跳转的链接地址                                      | _string_  | -            |
| linkType | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | _string_  | `navigateTo` |
| disabled | 是否禁用按钮                                          | _boolean_ | `false`      |
| loading  | 是否显示为加载状态                                       | _boolean_ | `false`      |
> 其他属性见[Button](#/button)

### GoodsActionButton Props

| 参数       | 说明                                              | 类型        | 默认值          |
|----------|-------------------------------------------------|-----------|--------------|
| text     | 按钮文字                                            | _string_  | -            |
| color    | 按钮颜色，支持传入 `linear-gradient` 渐变色                 | _string_  | -            |
| url      | 点击后跳转的链接地址                                      | _string_  | -            |
| linkType | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | _string_  | `navigateTo` |
| type     | 按钮类型，可选值为 `primary` `warning` `danger`          | _string_  | `danger`     |
| plain    | 是否为朴素按钮                                         | _boolean_ | `false`      |
| size     | 按钮尺寸，可选值为 `normal` `large` `small` `mini`       | _string_  | `normal`     |
| disabled | 是否禁用按钮                                          | _boolean_ | `false`      |
| loading  | 是否显示为加载状态                                       | _boolean_ | `false`      |
> 其他属性见[Button](#/button)

### Events

| 事件名     | 说明       | 参数  |
|---------|----------|-----|
| onClick | 按钮点击事件回调 | -   |
