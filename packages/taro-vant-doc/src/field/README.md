# Field 输入框

### 介绍

用户可以在文本框内输入或编辑文字。

### 引入

在 Taro 文件中引入组件

```js
import { Field } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <CellGroup>
    <Field
      value={ this.state.value }
      placeholder="请输入用户名"
      border={ false }
      onChange={ this.onChange }
    />
  </CellGroup>
</View>
 
```

```js
this.state = {
  value: ''
};

function onChange(event) {
  // event.detail 为当前输入的值
  console.log(event.detail);
} 
```

### 双向绑定

最低基础库版本在 2.9.3 以上时，可以使用[简易双向绑定](https://developers.weixin.qq.com/miniprogram/dev/framework/view/twoWayBindings.html)。

```jsx
<View>
  <CellGroup>
    <Field
      model={ true }
      value={ this.state.value }
      placeholder="请输入用户名"
      border={ false }
    />
  </CellGroup>
</View>
 
```

```js
this.state = {
  value: ''
}; 
```

### 自定义类型

根据`type`属性定义不同类型的输入框。

```jsx
<View>
  <CellGroup>
    <Field
      value={ this.state.username }
      required={ true }
      clearable={ true }
      label="用户名"
      icon="questionO"
      placeholder="请输入用户名"
      onClickIcon={ onClickIcon }
    />
    <Field
      value={ this.state.password }
      type="password"
      label="密码"
      placeholder="请输入密码"
      required={ true }
      border={ false }
    />
  </CellGroup>
</View>
 
```

### 禁用输入框

```jsx
<View>
  <CellGroup>
    <Field
      value="输入框已禁用"
      label="用户名"
      leftIcon="contact"
      disabled={ true }
      border={ false }
    />
  </CellGroup>
</View>
 
```

### 错误提示

通过`error`或者`errorMessage`属性增加对应的错误提示。

```jsx
<View>
  <CellGroup>
    <Field
      value={ this.state.username }
      label="用户名"
      placeholder="请输入用户名"
      error={ true }
    />
    <Field
      value={ this.state.phone }
      label="手机号"
      placeholder="请输入手机号"
      errorMessage="手机号格式错误"
      border={ false }
    />
  </CellGroup>
</View>
 
```

### 内容对齐方式

可以通过`inputAlign`属性设置内容的对齐方式。

```jsx
<View>
  <CellGroup>
    <Field
      value={ this.state.username3 }
      label="用户名"
      placeholder="请输入用户名"
      inputAlign="right"
    />
  </CellGroup>
</View>
 
```

### 高度自适应

对于 textarea，可以通过`autosize`属性设置高度自适应。

```jsx
<View>
  <CellGroup>
    <Field
      value={ this.state.message }
      label="留言"
      type="textarea"
      placeholder="请输入留言"
      autosize={ true }
      border={ false }
    />
  </CellGroup>
</View>
 
```

### 插入按钮

```jsx
<View>
  <CellGroup>
    <Field
      value={ this.state.sms }
      center={ true }
      clearable={ true }
      label="短信验证码"
      placeholder="请输入短信验证码"
      border={ false }
      button={ (
          <Button 
            size="small" 
            type="primary"
          >
            发送验证码
          </Button>

        ) }
    />
  </CellGroup>
</View>
 
```

## 常见问题

### 真机上为什么会出现聚焦时 placeholder 加粗、闪烁的现象？

由于微信小程序的 input 组件和 textarea 组件是原生组件，聚焦时会将原生的输入框覆盖在对应位置上，导致了这个现象的产生。

相关的讨论可以查看[微信开放社区](https://developers.weixin.qq.com/community/search?query=placeholder%20%E9%97%AA%E7%83%81%20%E5%8A%A0%E7%B2%97)。

### 真机上 placeholder 为什么会盖过 popup 等其它组件？

由于微信小程序的 input 组件和 textarea 组件是原生组件，遵循原生组件的限制，详情可以查看[原生组件说明](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)。

### textarea 的 placeholder 在真机上为什么会偏移？

微信小程序的 textarea 组件在 Android 和 iOS 中默认样式不同，在 iOS 中会有默认的 `padding`，且无法置 0。

同时 `placeholder-style` 对 `vertical-align`、`line-height` 等大量 css 属性都不生效。

这一系列的问题导致了 placeholder 在真机上可能会出现偏移。

微信已经在 `2.10.0` 基础库版本后支持移除默认的 `padding`，但低版本仍有问题。详情可以查看 [微信开放社区](https://developers.weixin.qq.com/community/develop/issue/96)。

### 手写输入法为什么会丢失部分字符 / 手写输入法为什么不会触发 input 事件？

这是微信小程序的 input 组件本身的问题，如果需要兼容手写输入法的场景，可以在 `blur` 事件中取到输入的值。

相关的讨论可以查看[微信开放社区](https://developers.weixin.qq.com/community/search?query=input%20%E6%89%8B%E5%86%99%E8%BE%93%E5%85%A5&page=1&block=1&random=1567079239098)。

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  name  | 在表单内提交时的标识符 | _string_ | - |
|  label  | 输入框左侧文本 | _string_ | - |
|  size  | 单元格大小，可选值为 `large` | _string_ | - |
|  value  | 当前输入的值 | _string \| number_ | - |
|  type  | 可设置为任意原生类型, 如 `number` `idcard` `textarea` `digit` | _string_ | `text` |
|  fixed  | 如果 type 为 `textarea` 且在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true | _boolean_ | `false` |
|  focus  | 获取焦点 | _boolean_ | `false` |
|  border  | 是否显示内边框 | _boolean_ | `true` |
|  disabled  | 是否禁用输入框 | _boolean_ | `false` |
|  readonly  | 是否只读 | _boolean_ | `false` |
|  clearable  | 是否启用清除控件 | _boolean_ | `false` |
|  clickable  | 是否开启点击反馈 | _boolean_ | `false` |
|  required  | 是否显示表单必填星号 | _boolean_ | `false` |
|  center  | 是否使内容垂直居中 | _boolean_ | `false` |
|  password  | 是否是密码类型 | _boolean_ | `false` |
|  titleWidth  | 标题宽度 | _string_ | `6.2em` |
|  maxlength  | 最大输入长度，设置为 -1 的时候不限制最大长度 | _number_ | `-1` |
|  placeholder  | 输入框为空时占位符 | _string_ | - |
|  placeholderStyle  | 指定 placeholder 的样式 | _string_ | - |
|  customStyle  | 自定义样式 | _string_ | - |
|  isLink  | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
|  arrowDirection  | 箭头方向，可选值为 `left` `up` `down` | _string_ | - |
|  showWordLimit  | 是否显示字数统计，需要设置`maxlength`属性 | _boolean_ | `false` |
|  error  | 是否将输入内容标红 | _boolean_ | `false` |
|  errorMessage  | 底部错误提示文案，为空时不展示 | _string_ | `''` |
|  errorMessageAlign  | 底部错误提示文案对齐方式，可选值为 `center` `right` | _string_ | `''` |
|  inputAlign  | 输入框内容对齐方式，可选值为 `center` `right` | _string_ | `left` |
|  autosize  | 是否自适应内容高度，只对 textarea 有效，<br>可传入对象,如 { maxHeight: 100, minHeight: 50 }，<br>单位为`px` | _boolean \| object_ | `false` |
|  leftIcon  | 左侧图标 | _ReactNode\|string_ | - |
|  rightIcon  | 右侧图标 | _ReactNode\|string_ | - |
|  confirmType  | 设置键盘右下角按钮的文字，仅在 type='text' 时生效 | _string_ | `done` |
|  confirmHold  | 点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效 | _boolean_ | `false` |
|  holdKeyboard  | focus 时，点击页面的时候不收起键盘 | _boolean_ | `false` |
|  cursorSpacing  | 输入框聚焦时底部与键盘的距离 | _number_ | `50` |
|  adjustPosition  | 键盘弹起时，是否自动上推页面 | _boolean_ | `true` |
|  showConfirmBar  | 是否显示键盘上方带有”完成“按钮那一栏，只对 textarea 有效 | _boolean_ | `true` |
|  selectionStart  | 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用 | _number_ | `-1` |
|  selectionEnd  | 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用 | _number_ | `-1` |
|  autoFocus  | 自动聚焦，拉起键盘 | _boolean_ | `false` |
|  disableDefaultPadding  | 是否去掉 iOS 下的默认内边距，只对 textarea 有效 | _boolean_ | `true` |
|  cursor  | 指定 focus 时的光标位置 | _number_ | `-1` |
|  clearTrigger `v1.8.4`  | 显示清除图标的时机，`always` 表示输入框不为空时展示，<br>`focus` 表示输入框聚焦且不为空时展示 | _string_ | `focus` |
|  alwaysEmbed `v1.9.2`  | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效) |  _boolean_ | `false` |

### Events

|  事件  | 说明 | 回调参数 |
| --- | --- | --- |
|  onInput  | 输入内容时触发 | event.detail: 当前输入值 |
|  onChange  | 输入内容时触发 | event.detail: 当前输入值 |
|  onConfirm  | 点击完成按钮时触发 | event.detail: 当前输入值 |
|  onClickIcon  | 点击尾部图标时触发 | - |
|  onFocus  | 输入框聚焦时触发 | event.detail.value: 当前输入值; <br>event.detail.height: 键盘高度 |
|  onBlur  | 输入框失焦时触发 | event.detail.value: 当前输入值; <br>event.detail.cursor: 游标位置(如果 `type` 不为 `textarea`，值为 `0`) |
|  onClear  | 点击清空控件时触发 | - |
|  onClickInput  | 点击输入区域时触发 | - |
|  onLineChange  | 输入框行数变化时调用，只对 textarea 有效 | event.detail = { height: 0, heightRpx: 0, lineCount: 0 } |
|  onKeyboardHeightChange  | 键盘高度发生变化的时候触发此事件 | event.detail = { height: height, duration: duration } |
