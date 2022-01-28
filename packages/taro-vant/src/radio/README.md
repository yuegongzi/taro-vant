# Radio 单选框

### 介绍

在一组备选项中进行单选。

### 引入

在 Taro 文件中引入组件

```js
import { Radio } from "taro-vant";
import { RadioGroup } from "taro-vant"; 
```

## 代码演示

### 基础用法

通过`value`绑定值当前选中项的 name 。

```jsx
<View>
  <RadioGroup
    value={ this.state.radio }
    onChange={ this.onChange }
  >
    <Radio name="1">
      单选框 1
    </Radio>
    <Radio name="2">
      单选框 2
    </Radio>
  </RadioGroup>
</View>
 
```

```js
this.state = {
  radio: '1'
};

function onChange(event) {
  this.setState({
    radio: event.detail
  });
} 
```

### 水平排列

将`direction`属性设置为`horizontal`后，单选框组会变成水平排列。

```jsx
<View>
  <RadioGroup
    value={ this.state.radio }
    onChange={ this.onChange }
    direction="horizontal"
  >
    <Radio name="1">
      单选框 1
    </Radio>
    <Radio name="2">
      单选框 2
    </Radio>
  </RadioGroup>
</View>
 
```

### 禁用状态

通过`disabled`属性禁止选项切换，在`Radio`上设置`diabled`可以禁用单个选项。

```jsx
<View>
  <RadioGroup
    value={ this.state.radio }
    disabled={ true }
    onChange={ this.onChange }
  >
    <Radio name="1">
      单选框 1
    </Radio>
    <Radio name="2">
      单选框 2
    </Radio>
  </RadioGroup>
</View>
 
```

### 自定义形状

将`shape`属性设置为`square`，单选框的形状会变成方形。

```jsx
<View>
  <RadioGroup
    value={ this.state.radio }
    onChange={ this.onChange }
  >
    <Radio
      name="1"
      shape="square"
    >
      单选框 1
    </Radio>
    <Radio
      name="2"
      shape="square"
    >
      单选框 2
    </Radio>
  </RadioGroup>
</View>
 
```

### 自定义颜色

通过`checkedColor`属性设置选中状态的图标颜色。

```jsx
<View>
  <RadioGroup
    value={ this.state.radio }
    onChange={ this.onChange }
  >
    <Radio
      name="1"
      checkedColor="#07c160"
    >
      单选框 1
    </Radio>
    <Radio
      name="2"
      checkedColor="#07c160"
    >
      单选框 2
    </Radio>
  </RadioGroup>
</View>
 
```

### 自定义大小

通过`iconSize`属性可以自定义图标的大小。

```jsx
<View>
  <RadioGroup
    value={ this.state.radio }
    onChange={ this.onChange }
  >
    <Radio
      name="1"
      iconSize="24px"
    >
      单选框 1
    </Radio>
    <Radio
      name="2"
      iconSize="24px"
    >
      单选框 2
    </Radio>
  </RadioGroup>
</View>
 
```

### 自定义图标

```jsx
<View>
  <RadioGroup
    value={ this.state.radio }
    onChange={ this.onChange }
  >
    <Radio
      value={ this.state.radio }
      name="1"
      iconRender={({ checked }) => (
        <Image
          src={checked ? icon.active : icon.normal}
          className='icon'
          mode='widthFix'
        />
      )}
    >
      自定义图标
    </Radio>
    <Radio
      value={ this.state.radio }
      name="2"
      iconRender={({ checked }) => (
        <Image
          src={checked ? icon.active : icon.normal}
          className='icon'
          mode='widthFix'
        />
      )}
    >
      自定义图标
    </Radio>
  </RadioGroup>
</View>
 
```

```js
this.state = {
  radio: true,
  icon: {
    normal: '//img.yzcdn.cn/iconNormal.png',
    active: '//img.yzcdn.cn/iconActive.png'
  }
};

function onChange(event) {
  this.setState({
    radio: event.detail
  });
} 
```

### 禁用文本点击

通过设置`labelDisabled`属性可以禁用单选框文本点击。

```jsx
<View>
  <RadioGroup
    value={ this.state.radio }
    onChange={ this.onChange }
  >
    <Radio
      name="1"
      labelDisabled={ true }
    >
      单选框 1
    </Radio>
    <Radio
      name="2"
      labelDisabled={ true }
    >
      单选框 2
    </Radio>
  </RadioGroup>
</View>
 
```

### 与 Cell 组件一起使用

此时你需要再引入`Cell`和`CellGroup`组件。

```jsx
<View>
  <RadioGroup value={radio5}>
    <CellGroup>
      <Cell
        title="单选框 1"
        clickable
        onClick={(e) => {
          this.onClick({
            detail: e.detail,
            currentTarget: {
              dataset: { name: '1', key: 'radio5' },
            },
            target: {
              dataset: { name: '1', key: 'radio5' },
            },
          })
        }}
      ></Cell>
      <Cell
        title="单选框 2"
        clickable
        onClick={(e) => {
          this.onClick({
            detail: e.detail,
            currentTarget: {
              dataset: { name: '2', key: 'radio5' },
            },
            target: {
              dataset: { name: '2', key: 'radio5' },
            },
          })
        }}
        iconRender={({ checked }) => (
          <Image
            src={checked ? icon.active : icon.normal}
            className='icon'
            mode='widthFix'
          />
        )}
      ></Cell>
    </CellGroup>
  </RadioGroup>
</View>
 
```

```js
this.state = {
  radio: '1'
};

function onChange(event) {
  this.setState({
    radio: event.detail
  });
}

function onClick(event) {
  const {
    name
  } = event.currentTarget.dataset;
  this.setState({
    radio: name
  });
} 
```

## API

### RadioGroup Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  name  | 在表单内提交时的标识符 | _string_ | - |
|  value  | 当前选中项的标识符 | _any_ | - |
|  disabled  | 是否禁用所有单选框 | _boolean_ | `false` |
|  direction | 排列方向，可选值为 `horizontal` | _string_ | `vertical` |

### Radio Props

|  参数            | 说明                      | 类型               | 默认值    |
| -------------- | ------------------------- | ------------------ | --------- |
|  name            | 标识符                    | _string_           | -         |
|  shape           | 形状，可选值为 `square`   | _string_           | `round`   |
|  disabled        | 是否为禁用状态            | _boolean_          | `false`   |
|  labelDisabled  | 是否禁用文本内容点击      | _boolean_          | `false`   |
|  labelPosition  | 文本位置，可选值为 `left` | _string_           | `right`   |
|  iconSize       | 图标大小，默认单位为`px`  | _string \| number_ | `20px`    |
|  checkedColor   | 选中状态颜色              | _string_           | `#1989fa` |
|  iconRender   | 是否使用自定义icon      | _({ disabled,checked }: params) => ReactNode_          | `-`   |

### Radio Event

|  事件名       | 说明                     | 回调参数          |
| ----------- | ------------------------ | ----------------- |
|  onChange  | 当绑定值变化时触发的事件 | 当前选中项的 name |

### RadioGroup Event

|  事件名       | 说明                     | 回调参数          |
| ----------- | ------------------------ | ----------------- |
|  onChange  | 当绑定值变化时触发的事件 | 当前选中项的 name |
