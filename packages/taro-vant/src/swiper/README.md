# Swiper 轮播

### 介绍

扩展Taro Swiper 用于循环播放一组图片或内容。

### 引入

```js
import { Swiper } from 'taro-vant';
```

## 代码演示

### 基础用法

每个 Swiper.Item 代表一张轮播卡片，可以通过 `interval` 属性设置自动轮播的间隔。

```jsx
import React from 'react';
import { Swiper } from 'taro-vant';

export default () => {
  return (
    <Swiper className="my-swipe" interval={3000}>
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  );
};
```

```css
.my-swipe .rv-swiper-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background: #3f45ff;
}
```



### 监听 onChange 事件

在每一页轮播结束后，会触发 `onChange` 事件。

```jsx
import React from 'react';
import { Swiper, Toast } from 'taro-vant';

export default () => {
  return (
    <Swiper onChange={(onChangeEventDeatil) => {console.log(onChangeEventDeatil)}}>
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  );
};
```

### 纵向滚动

设置 `vertical` 属性后滑块会纵向排列，此时需要指定滑块容器的高度。

```jsx
import React from 'react';
import { Swiper } from 'taro-vant';

export default () => {
  return (
    <Swiper vertical>
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  );
};
```


### 自定义指示器

必须将`indicatorDots`设置为true 通过 `indicatorActiveColor` 属性可以自定义指示器的样式。

```jsx
import React from 'react';
import { Swiper } from 'taro-vant';

export default () => {
  return (
    <Swiper indicatorActiveColor='#1890ff'>
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
      <Swiper.Item>4</Swiper.Item>
    </Swiper>
  );
};
```

```css
.custom-indicator {
  position: absolute;
  right: 15px;
  bottom: 10px;
  padding: 2px 5px;
  color: #fff;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 2px;
}
```

## API

### Swipe Props

| 参数                   | 说明                                  | 类型         | 默认值              |
|----------------------|-------------------------------------|------------|------------------|
| autoplay             | 是否自动切换                              | _ boolean_ | `false`          |
| inset                | 是否使用圆角风格                            | _boolean_  | `false`          |
| duration             | 滑动动画时长，单位为 ms                       | _number_   | `500`            |
| current              | 初始位置索引值                             | _number_   | `0`              |
| interval             | 自动切换时间间隔                            | _number_   | `5000`           |
| vertical             | 是否为纵向滚动                             | _boolean_  | `false`          |
| circular             | 是否采用衔接滑动                            | _boolean_  | `false`          |
| indicatorDots        | 是否显示指示点                             | _boolean_  | `false`          |
| indicatorColor       | 默认指示点颜色                             | _string_   | `rgba(0,0,0,.3)` |
| indicatorActiveColor | 激活指示点颜色                             | _string_   | `#000000`        |
| previousMargin       | 前边距,可用于露出前一项的一小部分，接受 `px` 和 `rpx` 值 | _string_   | `0px`            |
| nextMargin           | 后边距,可用于露出后一项的一小部分，接受 `px` 和 `rpx` 值 | _string_   | `0px`            |
| displayMultipleItems | 同时显示的滑块数量                           | _number_   | `1`              |
> 其他属性参考[Swiper](https://taro-docs.jd.com/taro/docs/components/viewContainer/swiper)

### Swiper Events

| 事件名      | 说明         | 回调参数          |
|----------|------------|---------------|
| onChange | 每一页轮播结束后触发 | index, 当前页的索引 |
