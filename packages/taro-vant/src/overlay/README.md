# Overlay 遮罩层

### 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

### 引入

在 Taro 文件中引入组件

```js
import { Overlay } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <Button
    type="primary"
    onClick={ this.onClickShow }
  >
    显示遮罩层
  </Button>
  <Overlay
    visible={ this.state.show }
    onClick={ this.onClickHide }
  />
</View>
 
```

```js
this.state = {
  show: false
};

function onClickShow() {
  this.setState({
    show: true
  });
}

function onClickHide() {
  this.setState({
    show: false
  });
} 
```

### 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容。

```jsx
<View>
  <Button
    type="primary"
    onClick={ this.onClickShow }
  >
    嵌入内容
  </Button>
  <Overlay
    visible={ this.state.show }
    onClick={ this.onClickHide }
  >
    <View class="wrapper">
      <View class="block" />
    </View>
  </Overlay>
</View>
 
```

```js
this.state = {
  show: false
};

function onClickShow() {
  this.setState({
    show: true
  });
}

function onClickHide() {
  this.setState({
    show: false
  });
}

function noop() {} 
```

```css
.wrapper {
  display: flex;
  alignItems: center;
  justifyContent: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  backgroundColor: #fff;
}
```

### Props

| 参数          | 说明                       | 类型        | 默认值     |
|-------------|--------------------------|-----------|---------|
| visible     | 是否展示遮罩层                  | _boolean_ | `false` |
| zIndex      | z-index 层级               | _string \ | number_ | `1000` |
| duration    | 动画时长，单位秒                 | _string \ | number_ | `0.3` |
| className   | 自定义类名                    | _string_  | -       |
| customStyle | 自定义样式                    | _string_  | -       |
| lockScroll  | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | _boolean_ | true    |

### Events

| 事件名     | 说明    | 回调参数 |
|---------|-------|------|
| onClick | 点击时触发 | -    |
