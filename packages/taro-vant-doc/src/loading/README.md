# Loading 加载

### 介绍

加载图标，用于表示加载中的过渡状态。

### 引入

在 Taro 文件中引入组件

```js
import { Loading } from "taro-vant"; 
```

## 代码演示

### 加载类型

```jsx
<View>
  <Loading />
  <Loading type="spinner" />
</View>
 
```

### 自定义颜色

```jsx
<View>
  <Loading color="#1989fa" />
  <Loading
    type="spinner"
    color="#1989fa"
  />
</View>
 
```

### 加载文案

```jsx
<View>
  <Loading size="24px">
    加载中...
  </Loading>
</View>
 
```

### 垂直排列

```jsx
<View>
  <Loading
    size="24px"
    vertical={ true }
  >
    加载中...
  </Loading>
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  color  | 颜色 | _string_ | `#c9c9c9` |
|  type  | 类型，可选值为 `spinner` `ball` | _string_ | `circular` |
|  size  | 加载图标大小，默认单位为 `px` | _string \| number_ | `30px` |
|  textSize `v1.0.0`  | 文字大小，默认单位为为 `px` | _string \| number_ | `14px` |
|  vertical `v1.0.0`  | 是否垂直排列图标和文字内容 | _boolean_ | `false` |