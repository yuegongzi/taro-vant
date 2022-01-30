# Popover 气泡弹出框

### 介绍

弹出式的气泡菜单。

### 引入

```js
import { Popover } from 'taro-vant';
```

## 代码演示

### 基础用法

当 Popover 弹出时，会基于 `children` 属性的内容进行定位。

```jsx
import { Popover, Button, Toast } from 'taro-vant';

const actions = [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }];

export default () => {
  const onSelect = (item) => Toast.info(item.text);

  return (
    <Popover
      placement="bottom-start"
      actions={actions}
      onSelect={onSelect}>
      <Button type="primary">浅色风格</Button>
    </Popover>
  );
};
```

### 深色风格

Popover 支持浅色和深色两种风格，默认为浅色风格，将 `theme` 属性设置为 `dark` 可切换为深色风格。

```jsx
<Popover
  theme="dark"
  actions={actions}
  onSelect={onSelect}>
  <Button type="primary">浅色风格</Button>
</Popover>
```

### 弹出位置

通过 `placement` 属性来控制气泡的弹出位置。

```jsx
<Popover placement="top" />
```

`placement` 支持以下值：

```bash
top           # 顶部中间位置
top-start     # 顶部左侧位置
top-end       # 顶部右侧位置
left          # 左侧中间位置
left-start    # 左侧上方位置
left-end      # 左侧下方位置
right         # 右侧中间位置
right-start   # 右侧上方位置
right-end     # 右侧下方位置
bottom        # 底部中间位置
bottom-start  # 底部左侧位置
bottom-end    # 底部右侧位置
```

### 展示图标

在 `actions` 数组中，可以通过 `icon` 字段来定义选项的图标，支持传入名称和自定义节点。

```jsx
const actions = [
  { text: '选项一', icon: 'add-o' },
  { text: '选项二', icon: 'music-o' },
  { text: '选项三', icon: 'more-o' },
];

<Popover
  actions={actions}
  onSelect={onSelect}>
  <Button type="primary">浅色风格</Button>
</Popover>;
```

### 禁用选项

在 `actions` 数组中，可以通过 `disabled` 字段来禁用某个选项。

```jsx
const actions = [
  { text: '选项一', disabled: true },
  { text: '选项二', disabled: true },
  { text: '选项三' },
];

<Popover
  actions={actions}
  onSelect={onSelect}
  >
  <Button type="primary">浅色风格</Button>
</Popover>
```



## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 选项列表 | _Action[]_ | `[]` |
| placement | 弹出位置 | _string_ | `bottom` |
| theme | 主题风格，可选值为 `dark` | _string_ | `light` |
| duration | 动画时长，单位秒，设置为 0 可以禁用动画 | _number \| string_ | `0.3` |
| closeOnClickAction | 是否在点击选项后关闭 | _boolean_ | `true` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭菜单 | _boolean_ | `true` |
| children | 触发 Popover 显示的元素内容 | _React.ReactNode_ | - |

### Action 数据结构

`actions` 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| text | 选项文字 | _string_ |
| icon | 文字左侧的图标| _string\|ReactNode_ |
| color | 选项文字颜色 | _string_ |
| disabled | 是否为禁用状态 | _boolean_ |
| className | 为对应选项添加额外的类名 | _string_ |

### Events

| 事件名   | 说明           | 回调参数                        |
| -------- | -------------- | ------------------------------- |
| onSelect | 点击选项时触发 | _action: Action, index: number_ |
| onOpen          | 打开菜单时触发           | -                               |
| onClose         | 关闭菜单时触发           | -                               |
