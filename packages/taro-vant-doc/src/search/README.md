# Search 搜索

### 介绍

用于搜索场景的输入框组件。

### 引入

在 Taro 文件中引入组件

```js
import { Search } from "taro-vant"; 
```

## 代码演示

### 基础用法

`vanSearch` 中，value 用于控制搜索框中的文字。background 可以自定义搜索框外部背景色。

```jsx
<View>
  <Search
    value={ this.state.value }
    placeholder="请输入搜索关键词"
  />
</View>
 
```

### 事件监听

`vanSearch` 提供了 search 和 cancel 事件。search 事件在用户点击键盘上的搜索按钮触发。cancel 事件在用户点击搜索框右侧取消按钮时触发。

```jsx
<View>
  <Search
    value={ this.state.value }
    placeholder="请输入搜索关键词"
    showAction={ true }
    onSearch={ this.onSearch }
    onCancel={ this.onCancel }
  />
</View>
 
```

### 搜索框内容对齐

通过 `inputAlign` 属性可以设置搜索框内容的对齐方式。

```jsx
<View>
  <Search
    value={ this.state.value }
    inputAlign="center"
    placeholder="请输入搜索关键词"
  />
</View>
 
```

### 禁用搜索框

通过 `disabled` 属性可以将组件设置为禁用状态。

```jsx
<View>
  <Search
    disabled={ true }
    value={ this.state.value }
    placeholder="请输入搜索关键词"
  />
</View>
 
```

### 自定义背景色

通过`background`属性可以设置搜索框外部的背景色，通过`shape`属性设置搜索框的形状，可选值为`round`。

```jsx
<View>
  <Search
    value={ this.state.value }
    shape="round"
    background="#4fc08d"
    placeholder="请输入搜索关键词"
  />
</View>
 
```

### 自定义按钮

```jsx
<View>
  <Search
    value={ this.state.value }
    label="地址"
    placeholder="请输入搜索关键词"
    onChange={ this.onChange }
    onSearch={ this.onSearch }
    renderAction={ (
          <View
            onTap={ this.onClick }
          >
            搜索
          </View>

        ) }
  />
</View>
 
```

```js
this.state = {
  value: ''
};

function onChange(e) {
  this.setState({
    value: e.detail
  });
}

function onSearch() {
  Toast('搜索' + this.data.value);
}

function onClick() {
  Toast('搜索' + this.data.value);
} 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  name  | 在表单内提交时的标识符 | _string_ | - |
|  label  | 搜索框左侧文本 | _string\|ReactNode_ | - |
|  shape  | 形状，可选值为 `round` | _string_ | `square` |
|  value  | 当前输入的值 | _string \| number_ | - |
|  background  | 搜索框背景色 | _string_ | `#f2f2f2` |
|  showAction  | 是否在搜索框右侧显示取消按钮 | _boolean_ | `false` |
|  actionText `v1.0.0`  | 取消按钮文字 | _string\|ReactNode_ | `取消` |
|  focus  | 获取焦点 | _boolean_ | `false` |
|  error  | 是否将输入内容标红 | _boolean_ | `false` |
|  disabled  | 是否禁用输入框 | _boolean_ | `false` |
|  readonly  | 是否只读 | _boolean_ | `false` |
|  clearable  | 是否启用清除控件 | _boolean_ | `true` |
|  clearTrigger `v1.8.4`  | 显示清除图标的时机，`always` 表示输入框不为空时展示，<br>`focus` 表示输入框聚焦且不为空时展示 | _string_ | `focus` |
|  clearIcon `v1.8.4`  | 清除[图标名称](#/icon)或图片链接 | _string_ | `clear` |
|  maxlength  | 最大输入长度，设置为 -1 的时候不限制最大长度 | _number_ | `-1` |
|  placeholder  | 输入框为空时占位符 | _string_ | - |
|  placeholderStyle  | 指定占位符的样式 | _string_ | - |
|  inputAlign  | 输入框内容对齐方式，可选值为 `center` `right` | _string_ | `left` |
|  leftIcon  | 输入框左侧图标名称或图片链接，可选值见 Icon 组件| _string_ | `search` |
|  rightIcon  | 输入框右侧图标名称或图片链接，可选值见 Icon 组件| _string_ | - |

### Events

|  事件名            | 说明               | 参数                     |
| ---------------- | ------------------ | ------------------------ |
|  onSearch       | 确定搜索时触发     | event.detail: 当前输入值 |
|  onChange       | 输入内容变化时触发 | event.detail: 当前输入值 |
|  onCancel       | 取消搜索搜索时触发 | -                        |
|  onFocus        | 输入框聚焦时触发   | -                        |
|  onBlur         | 输入框失焦时触发   | -                        |
|  onClear        | 点击清空控件时触发 | -                        |
|  onClickInput  | 点击搜索区域时触发 | -                        |
