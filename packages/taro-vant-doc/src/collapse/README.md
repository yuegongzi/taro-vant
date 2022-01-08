# Collapse 折叠面板

### 介绍

将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。

### 引入

在 Taro 文件中引入组件

```js
import { Collapse } from "taro-vant";
import { CollapseItem } from "taro-vant"; 
```

## 代码演示

### 基础用法

通过`value`控制展开的面板列表，`activeNames`为数组格式。

```jsx
<View>
  <Collapse
    value={ this.state.activeNames }
    onChange={ this.onChange }
  >
    <CollapseItem
      title="有赞微商城"
      name="1"
    >
      提供多样店铺模板，快速搭建网上商城
    </CollapseItem>
    <CollapseItem
      title="有赞零售"
      name="2"
    >
      网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
    </CollapseItem>
    <CollapseItem
      title="有赞美业"
      name="3"
      disabled={ true }
    >
      线上拓客，随时预约，贴心顺手的开单收银
    </CollapseItem>
  </Collapse>
</View>
 
```

```js
this.state = {
  activeNames: ['1']
};

function onChange(event) {
  this.setState({
    activeNames: event.detail
  });
} 
```

### 手风琴

通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式。

```jsx
<View>
  <Collapse
    accordion={ true }
    value={ this.state.activeName }
    onChange={ this.onChange }
  >
    <CollapseItem
      title="有赞微商城"
      name="1"
    >
      提供多样店铺模板，快速搭建网上商城
    </CollapseItem>
    <CollapseItem
      title="有赞零售"
      name="2"
    >
      网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
    </CollapseItem>
    <CollapseItem
      title="有赞美业"
      name="3"
    >
      线上拓客，随时预约，贴心顺手的开单收银
    </CollapseItem>
  </Collapse>
</View>
 
```

```js
this.state = {
  activeName: '1'
};

function onChange(event) {
  this.setState({
    activeName: event.detail
  });
} 
```

### 事件监听

`vanCollapse` 提供了 `change`, `open` 和 `close` 事件。`change` 事件在面板切换时触发，`open` 事件在面板展开时触发，`close` 事件在面板关闭时触发。

```jsx
<View>
  <Collapse
    value={ this.state.activeNames }
    onChange={ this.onChange }
    onOpen={ this.onOpen }
    onClose={ this.onClose }
  >
    <CollapseItem
      title="有赞微商城"
      name="1"
    >
      提供多样店铺模板，快速搭建网上商城
    </CollapseItem>
    <CollapseItem
      title="有赞零售"
      name="2"
    >
      网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
    </CollapseItem>
    <CollapseItem
      title="有赞美业"
      name="3"
    >
      线上拓客，随时预约，贴心顺手的开单收银
    </CollapseItem>
  </Collapse>
</View>
 
```

```js
this.state = {
  activeNames: ['1']
};

function onChange(event) {
  this.setState({
    activeNames: event.detail
  });
}

function onOpen(event) {
  Toast(`展开: ${event.detail}`);
}

function onClose(event) {
  Toast(`关闭: ${event.detail}`);
} 
```

### 自定义标题内容

```jsx
<View>
  <Collapse
    value={ this.state.activeNames }
    onChange={ this.onChange }
  >
    <CollapseItem 
      name="1" 
      renderTitle={(
        <View>
          有赞微商城
          <Icon name="questionO" />
        </View>
      )}
      >
      提供多样店铺模板，快速搭建网上商城
    </CollapseItem>
    <CollapseItem
      title="有赞零售"
      name="2"
      icon="shopO"
    >
      网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
    </CollapseItem>
  </Collapse>
</View>
 
```

```js
this.state = {
  activeNames: ['1']
};

function onChange(event) {
  this.setState({
    activeNames: event.detail
  });
} 
```

## API

### Collapse Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  value  | 当前展开面板的 name | 非手风琴模式：_(string \| number)[]_<br>手风琴模式：_string \| number_ | - |
|  accordion  | 是否开启手风琴模式 | _boolean_ | `false` |
|  border  | 是否显示外边框 | _boolean_ | `true` |

### Collapse Event

|  事件名  | 说明           | 参数                            |
| ------ | -------------- | ------------------------------- |
|  onChange  | 切换面板时触发 | activeNames: _string \| Array_  |
|  onOpen    | 展开面板时触发 | currentName: _string \| number_ |
|  onClose   | 关闭面板时触发 | currentName: _string \| number_ |

### CollapseItem Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  name  | 唯一标识符，默认为索引值 | _string \| number_ | `index` |
|  title  | 标题栏左侧内容 | _string \| number_ | - |
|  icon  | 标题栏左侧图标名称或图片链接，可选值见 [Icon 组件](#/icon) | _string_ | - |
|  value  | 标题栏右侧内容 | _string \| number_ | - |
|  label  | 标题栏描述信息 | _string_ | - |
|  border  | 是否显示内边框 | _boolean_ | `true` |
|  isLink  | 是否展示标题栏右侧箭头并开启点击反馈 | _boolean_ | `true` |
|  clickable  | 是否开启点击反馈 | _boolean_ | `false` |
|  disabled  | 是否禁用面板 | _boolean_ | `false` |

### CollapseItem Slot

|  名称        | 说明                          |
| ---------- | ----------------------------- |
|             | 面板内容                      |
|  value       | 自定义显示内容                |
|  icon        | 自定义`icon`                  |
|  title       | 自定义`title`                 |
|  rightIcon  | 自定义右侧按钮，默认是`arrow` |


