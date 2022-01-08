# SubmitBar 提交订单栏

### 介绍

用于展示订单金额与提交订单。

### 引入

在 Taro 文件中引入组件

```js
import { SubmitBar } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <SubmitBar
    price={ 3050 }
    buttonText="提交订单"
    onSubmit={ this.onSubmit }
  />
</View>
 
```

### 禁用状态

禁用状态下不会触发`submit`事件。

```jsx
<View>
  <SubmitBar
    disabled={ true }
    price={ 3050 }
    buttonText="提交订单"
    tip="您的收货地址不支持同城送, 我们已为您推荐快递"
    tipIcon="infoO"
    onSubmit={ this.onSubmit }
  />
</View>
 
```

### 加载状态

加载状态下不会触发`submit`事件。

```jsx
<View>
  <SubmitBar
    loading={ true }
    price={ 3050 }
    buttonText="提交订单"
    onSubmit={ this.onSubmit }
  />
</View>
 
```

### 高级用法

通过插槽插入自定义内容。

```jsx
<View>
  <SubmitBar
    price={ 3050 }
    buttonText="提交订单"
    onSubmit={ this.onClickButton }
    tip={ true }
    renderTip={(
      <View >
        您的收货地址不支持同城送,
        <Text>
          修改地址
        </Text>
      </View>
    )}
  >
    <Tag type="primary">
      标签
    </Tag>
  </SubmitBar>
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  price  | 价格（单位分） | _number_ | - |
|  label  | 价格文案 | _string_ | `合计：` |
|  suffixLabel  | 价格右侧文案 | _string_ | - |
|  buttonText  | 按钮文字 | _string_ | - |
|  buttonType  | 按钮类型 | _string_ | `danger` |
|  tip  | 提示文案 | _string \| boolean_ | - |
|  tipIcon  | 图标名称或图片链接，可选值见 [Icon 组件](#/icon) | _string_ | - |
|  disabled  | 是否禁用按钮 | _boolean_ | `false` |
|  loading  | 是否显示加载中的按钮 | _boolean_ | `false` |
|  currency  | 货币符号 | _string_ | `¥` |
|  safeAreaInsetBottom  | 是否为 iPhoneX 留出底部安全距离 | _boolean_ | `true` |
|  decimalLength  | 价格小数点后位数 | _number_ | `2` |

### Events

|  事件名  | 说明             | 参数 |
| ------ | ---------------- | ---- |
|  submit  | 按钮点击事件回调 | -    |

### Slot

|  名称  | 说明                       |
| ---- | -------------------------- |
|       | 自定义订单栏左侧内容       |
|  top   | 自定义订单栏上方内容       |
|  tip   | 提示文案中的额外操作和说明 |

### 外部样式类

|  类名          | 说明         |
| ------------ | ------------ |
|  customClass  | 根节点样式类 |
|  priceClass   | 价格样式类   |
|  buttonClass  | 按钮样式类   |
|  barClass     | 订单栏样式类 |
