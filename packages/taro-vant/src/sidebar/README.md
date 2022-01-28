# Sidebar 侧边导航

### 介绍

垂直展示的导航栏，用于在不同的内容区域之间进行切换。

### 引入

在 Taro 文件中引入组件

```js
import { Sidebar } from "taro-vant";
const SidebarItem = SiderBarItem
```

## 代码演示

### 基础用法

通过在`Sidebar`上设置`activeKey`属性来控制选中项。

```jsx
<View>
  <Sidebar activeKey={ this.state.activeKey }>
    <SidebarItem title="标签名" />
    <SidebarItem title="标签名" />
    <SidebarItem title="标签名" />
  </Sidebar>
</View>
 
```

```js
this.state = {
  activeKey: 0
}; 
```

### 徽标提示

设置`dot`属性后，会在右上角展示一个小红点。设置`badge`属性后，会在右上角展示相应的徽标。

```jsx
<View>
  <Sidebar activeKey={ this.state.activeKey }>
    <SidebarItem
      title="标签名"
      dot={ true }
    />
    <SidebarItem
      title="标签名"
      badge="5"
    />
    <SidebarItem
      title="标签名"
      badge="99+"
    />
  </Sidebar>
</View>
 
```

### 禁用选项

通过`disabled`属性禁用选项。

```jsx
<View>
  <Sidebar activeKey={ this.state.activeKey }>
    <SidebarItem title="标签名" />
    <SidebarItem
      title="标签名"
      disabled={ true }
    />
    <SidebarItem title="标签名" />
  </Sidebar>
</View>
 
```

### 监听切换事件

设置`change`方法来监听切换导航项时的事件。

```jsx
<View>
  <Sidebar
    activeKey={ this.state.activeKey }
    onChange={ this.onChange }
  >
    <SidebarItem title="标签名 1" />
    <SidebarItem title="标签名 2" />
    <SidebarItem title="标签名 3" />
  </Sidebar>
  <Notify id="vanNotify" />
</View>
 
```

```js
import { notify } from 'taro-vant';
this.state = {
  activeKey: 0
};

function onChange(event) {
  notify({
    type: 'primary',
    message: event.detail
  });
} 
```

## API

### Sidebar Props

|  参数       | 说明         | 类型               | 默认值 |
| --------- | ------------ | ------------------ | ------ |
|  activekey  | 选中项的索引 | _string \| number_ | `0`    |

### Sidebar Event

|  事件名  | 说明           | 参数               |
| ------ | -------------- | ------------------ |
|  onChange  | 切换徽章时触发 | 当前选中徽章的索引 |


### SidebarItem Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  title  | 内容 | _string\|ReactNode_ | `''` |
|  dot  | 是否显示右上角小红点 | _boolean_ | `false` |
|  badge | 图标右上角徽标的内容 | _string \| number_ | `''` |
|  disabled  | 是否禁用该项 | _boolean_ | `false` |



### SidebarItem Event

|  事件名  | 说明           | 参数                            |
| ------ | -------------- | ------------------------------- |
|  onClick   | 点击徽章时触发 | `event.detail` 为当前徽章的索引 |

