# Divider 分割线

### 介绍

用于将内容分隔为多个区域。

### 引入

在 Taro 文件中引入组件

```js
import { Divider } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <Divider />
</View>
 
```

### 使用 hairline

```jsx
<View>
  <Divider hairline={ true } />
</View>
 
```

### 虚线

```jsx
<View>
  <Divider dashed={ true } />
</View>
 
```

### 文本位置

```jsx
<View>
  <Divider contentPosition="center">
    文本
  </Divider>
  <Divider contentPosition="left">
    文本
  </Divider>
  <Divider contentPosition="right">
    文本
  </Divider>
</View>
 
```

### 自定义属性

```jsx
<View>
  <Divider
    contentPosition="center"
    textColor="#1989fa"
  >
    文本颜色
  </Divider>
  <Divider
    contentPosition="center"
    borderColor="#1989fa"
  >
    border 颜色
  </Divider>
  <Divider
    contentPosition="center"
    fontSize="18"
  >
    字体大小
  </Divider>
</View>
 
```

### 自定义样式

```jsx
<View>
  <Divider
    contentPosition="center"
    style="color: #1989fa; borderColor: #1989fa; fontSize: 18px;"
  >
    文本
  </Divider>
</View>
 
```

## API

### Props

|  参数              | 说明                              | 类型      | 默认值 |
| ---------------- | --------------------------------- | --------- | ------ |
|  dashed            | 虚线                              | _boolean_ | false  |
|  hairline          | 细线                              | _boolean_ | false  |
|  contentPosition  | 文本位置，`left` `center` `right` | _string_  | -      |
|  customStyle      | 自定义样式                        | _string_  | -      |
