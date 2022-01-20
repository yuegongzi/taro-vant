# TreeSelect 分类选择

### 介绍

用于从一组相关联的数据集合中进行选择。

### 引入

在 Taro 文件中引入组件

```js
import { TreeSelect } from "taro-vant"; 
```

## 代码演示

### 单选模式

可以在任意位置上使用 vanTreeSelect 标签。传入对应的数据即可。此组件支持单选或多选，具体行为完全基于事件 clickItem 的实现逻辑如何为属性 activeId 赋值，当 activeId 为数组时即为多选状态。

```jsx
<View>
  <TreeSelect
    items={ this.state.items }
    mainActiveIndex={ this.state.mainActiveIndex }
    activeId={ this.state.activeId }
    onClickNav={ this.onClickNav }
    onClickItem={ this.onClickItem }
  />
</View>
 
```

```js
this.state = {
  mainActiveIndex: 0,
  activeId: null
};

function onClickNav({
  detail = {}
}) {
  this.setState({
    mainActiveIndex: detail.index || 0
  });
}

function onClickItem({
  detail = {}
}) {
  const activeId = this.data.activeId === detail.id ? null : detail.id;
  this.setState({
    activeId
  });
} 
```

### 多选模式

```jsx
<View>
  <TreeSelect
    items={ this.state.items }
    mainActiveIndex={ this.state.mainActiveIndex }
    activeId={ this.state.activeId }
    max={ this.state.max }
    onClickNav={ this.onClickNav }
    onClickItem={ this.onClickItem }
  />
</View>
 
```

```js
this.state = {
  mainActiveIndex: 0,
  activeId: [],
  max: 2
};

function onClickNav({
  detail = {}
}) {
  this.setState({
    mainActiveIndex: detail.index || 0
  });
}

function onClickItem({
  detail = {}
}) {
  const {
    activeId
  } = this.data;
  const index = activeId.indexOf(detail.id);

  if (index > -1) {
    activeId.splice(index, 1);
  } else {
    activeId.push(detail.id);
  }

  this.setState({
    activeId
  });
} 
```

### 自定义内容

```jsx
<View>
  <TreeSelect
    items={ this.state.items }
    height="55vw"
    mainActiveIndex={ this.state.mainActiveIndex }
    activeId={ this.state.activeId }
    onClickNav={ this.onClickNav }
    onClickItem={ this.onClickItem }
  >
    <Image
      src="https://img.yzcdn.cn/vant/apple-1.jpg"
    />
  </TreeSelect>
</View>
 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  items  | 分类显示所需的数据 | _Array_ | `[]` |
|  height  | 高度，默认单位为`px` | _number \| string_ | `300` |
|  mainActiveIndex  | 左侧选中项的索引 | _number_ | `0` |
|  activeId  | 右侧选中项的 id，支持传入数组 | _string \| number \| Array_ | `0` |
|  max  | 右侧项最大选中个数 | _number_ | _Infinity_ |
|  selectedIcon | 自定义右侧栏选中状态的图标 | _string_ | `success` |

### Events

|  事件名  | 说明 | 回调参数 |
| --- | --- | --- |
|  onClickNav  | 左侧导航点击时，触发的事件 | event.detail.index：被点击的导航的索引 |
|  onClickItem  | 右侧选择项被点击时，会触发的事件 | event.detail: 该点击项的数据 |

### items 数据结构

`items` 整体为一个数组，数组内包含一系列描述分类的对象。每个分类里，text 表示当前分类的名称。children 表示分类里的可选项，为数组结构，id 被用来唯一标识每个选项。

```javascript
[
  {
    // 导航名称
    text: '所有城市',
    // 导航名称右上角徽标，1.5.0 版本开始支持
    badge: 3,
    // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
    dot: true,
    // 禁用选项
    disabled: false,
    // 该导航下所有的可选项
    children: [
      {
        // 名称
        text: '温州',
        // id，作为匹配选中状态的标识
        id: 1,
        // 禁用选项
        disabled: true,
      },
      {
        text: '杭州',
        id: 2,
      },
    ],
  },
];
```

### 外部样式类

| 类名                   | 说明               |
| ---------------------- | ------------------ |
| contentActiveClass   | 右侧选项选中样式类 |
| contentDisabledClass | 右侧选项禁用样式类 |
