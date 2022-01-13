# DropdownMenu 下拉菜单

### 介绍

向下弹出的菜单列表。

### 引入

在 Taro 文件中引入组件

```js
import { DropdownMenu } from "taro-vant";
import { DropdownItem } from "taro-vant"; 
```

## 代码演示

### 基础用法

```jsx
<View>
  <DropdownMenu>
    <DropdownItem
      value={ this.state.value1 }
      options={ this.state.option1 }
    />
    <DropdownItem
      value={ this.state.value2 }
      options={ this.state.option2 }
    />
  </DropdownMenu>
</View>
 
```

```js
this.state = {
  option1: [{
    text: '全部商品',
    value: 0
  }, {
    text: '新款商品',
    value: 1
  }, {
    text: '活动商品',
    value: 2
  }],
  option2: [{
    text: '默认排序',
    value: 'a'
  }, {
    text: '好评排序',
    value: 'b'
  }, {
    text: '销量排序',
    value: 'c'
  }],
  value1: 0,
  value2: 'a'
}; 
```

### 自定义菜单内容

```jsx
<View>
  <DropdownMenu>
    <DropdownItem
      value={ this.state.value1 }
      options={ this.state.option1 }
    />
    <DropdownItem
      id="item"
      title={ this.state.itemTitle }
    >
      <Cell 
        title={ this.state.switchTitle1 }
        renderRightIcon={(
          <Switch
            size="24px"
            style="height: 26px"
            checked={ this.state.switch1 }
            activeColor="#ee0a24"
            onChange={ this.onSwitch1Change }
          />
        )}
      >
      </Cell>
      <Cell 
        title={ this.state.switchTitle2 }
        renderRightIcon={(
          <Switch
            size="24px"
            style="height: 26px"
            checked={ this.state.switch2 }
            activeColor="#ee0a24"
            onChange={ this.onSwitch2Change }
          />
        )}
      >
      </Cell>
      <View style="padding: 5px 16px;">
        <Button
          type="danger"
          block={ true }
          round={ true }
          onClick={ this.onConfirm }
        >
          确认
        </Button>
      </View>
    </DropdownItem>
  </DropdownMenu>
</View>
 
```

```js
this.state = {
  switchTitle1: '包邮',
  switchTitle2: '团购',
  itemTitle: '筛选',
  option1: [{
    text: '全部商品',
    value: 0
  }, {
    text: '新款商品',
    value: 1
  }, {
    text: '活动商品',
    value: 2
  }],
  value1: 0
};

function onConfirm() {
  this.selectComponent('#item').toggle();
}

function onSwitch1Change({
  detail
}) {
  this.setState({
    switch1: detail
  });
}

function onSwitch2Change({
  detail
}) {
  this.setState({
    switch2: detail
  });
} 
```

### 自定义选中状态颜色

```jsx
<View>
  <DropdownMenu activeColor="#1989fa">
    <DropdownItem
      value={ this.state.value1 }
      options={ this.state.option1 }
    />
    <DropdownItem
      value={ this.state.value2 }
      options={ this.state.option2 }
    />
  </DropdownMenu>
</View>
 
```

### 向上展开

```jsx
<View>
  <DropdownMenu direction="up">
    <DropdownItem
      value={ this.state.value1 }
      options={ this.state.option1 }
    />
    <DropdownItem
      value={ this.state.value2 }
      options={ this.state.option2 }
    />
  </DropdownMenu>
</View>
 
```

### 禁用菜单

```jsx
<View>
  <DropdownMenu>
    <DropdownItem
      value={ this.state.value1 }
      disabled={ true }
      options={ this.state.option1 }
    />
    <DropdownItem
      value={ this.state.value2 }
      disabled={ true }
      options={ this.state.option2 }
    />
  </DropdownMenu>
</View>
 
```

## API

### DropdownMenu Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  activeColor  | 菜单标题和选项的选中态颜色 | _string_ | `#ee0a24` |
|  zIndex  | 菜单栏 z-index 层级 | _number_ | `900` |
|  duration  | 动画时长，单位毫秒 | _number_ | `200` |
|  direction  | 菜单展开方向，可选值为 up | _string_ | `down` |
|  overlay  | 是否显示遮罩层 | _boolean_ | `true` |
|  closeOnClickOverlay  | 是否在点击遮罩层后关闭菜单 | _boolean_ | `true` |
|  closeOnClickOutside  | 是否在点击外部 menu 后关闭菜单 | _boolean_ | `true` |

### DropdownItem Props

|  参数         | 说明                   | 类型               | 默认值         |
| ----------- | ---------------------- | ------------------ | -------------- |
|  value        | 当前选中项对应的 value | _number \| string_ | -              |
|  title        | 菜单项标题             | _string_           | 当前选中项文字 |
|  options      | 选项数组               | _Option[]_         | `[]`           |
|  disabled     | 是否禁用菜单           | _boolean_          | `false`        |
|  titleClass  | 标题额外类名           | _string_           | -              |
|  popupStyle  | 自定义弹出层样式       | _string_           | -              |

### DropdownItem Events

|  事件名  | 说明                          | 回调参数 |
| ------ | ----------------------------- | -------- |
|  onChange  | 点击选项导致 value 变化时触发 | value    |
|  onOpen    | 打开菜单栏时触发              | -        |
|  onClose   | 关闭菜单栏时触发              | -        |
|  onOpened | 打开菜单栏且动画结束后触发    | -        |
|  onClosed  | 关闭菜单栏且动画结束后触发    | -        |

### DropdownItem 方法

通过 `ref` 可访问。

|  方法名  | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
|  toggle  | 切换菜单展示状态，传`true`为显示，`false`为隐藏，不传参为取反 | show?: boolean | - |

### Option 数据结构

|  键名   | 说明                             | 类型               |
| ----- | -------------------------------- | ------------------ |
|  text   | 文字                             | _string_           |
|  value  | 标识符                           | _number \| string_ |
|  icon   | 左侧[图标名称](#/icon)或图片链接 | _string_           |


