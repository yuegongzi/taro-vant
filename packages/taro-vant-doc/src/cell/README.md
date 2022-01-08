# Cell 单元格

### 介绍

单元格为列表中的单个展示项。

### 引入

在 Taro 文件中引入组件

```js
import { Cell } from "taro-vant";
import { CellGroup } from "taro-vant"; 
```

## 代码演示

### 基础用法

`Cell`可以单独使用，也可以与`CellGroup`搭配使用。`CellGroup`可以为`Cell`提供上下外边框。

```jsx
<View>
  <CellGroup>
    <Cell
      title="单元格"
      value="内容"
    />
    <Cell
      title="单元格"
      value="内容"
      label="描述信息"
      border={ false }
    />
  </CellGroup>
</View>
 
```

### 卡片风格

通过 `CellGroup` 的 `inset` 属性，可以将单元格转换为圆角卡片风格（从 1.7.2 版本开始支持）。

```jsx
<View>
  <CellGroup inset={ true }>
    <Cell
      title="单元格"
      value="内容"
    />
    <Cell
      title="单元格"
      value="内容"
      label="描述信息"
    />
  </CellGroup>
</View>
 
```

### 单元格大小

通过`size`属性可以控制单元格的大小。

```jsx
<View>
  <Cell
    title="单元格"
    value="内容"
    size="large"
  />
  <Cell
    title="单元格"
    value="内容"
    size="large"
    label="描述信息"
  />
</View>
 
```

### 展示图标

通过`icon`属性在标题左侧展示图标。

```jsx
<View>
  <Cell
    title="单元格"
    icon="locationO"
  />
</View>
 
```

### 展示箭头

设置`isLink`属性后会在单元格右侧显示箭头，并且可以通过`arrowDirection`属性控制箭头方向。

```jsx
<View>
  <Cell
    title="单元格"
    isLink={ true }
  />
  <Cell
    title="单元格"
    isLink={ true }
    value="内容"
  />
  <Cell
    title="单元格"
    isLink={ true }
    value="内容"
    arrowDirection="down"
  />
</View>
 
```

### 页面跳转

可以通过`url`属性进行页面跳转，通过`linkType`属性控制跳转类型。

```jsx
<View>
  <Cell
    isLink={ true }
    title="单元格"
    linkType="navigateTo"
    url="/pages/dashboard/index"
  />
</View>
 
```

### 分组标题

通过`CellGroup`的`title`属性可以指定分组标题。

```jsx
<View>
  <CellGroup title="分组1">
    <Cell
      title="单元格"
      value="内容"
    />
  </CellGroup>
  <CellGroup title="分组2">
    <Cell
      title="单元格"
      value="内容"
    />
  </CellGroup>
</View>
 
```

### 自定义渲染内容

如以上用法不能满足你的需求，可以使用`renderTitle`和`renderRightIcon`来渲染内容

```jsx
<View>
  <Cell
    value="内容"
    icon="shop-o"
    isLink
    renderTitle={
      <>
        <View>
          <View className="title">单元格</View>
          <Tag type="danger">标签</Tag>
        </View>
      </>
    }
  ></Cell>
  <Cell
    title="单元格"
    border={false}
    renderRightIcon={
      <>
        <Icon name="search"></Icon>
      </>
    }
  ></Cell>
</View>
 
```

### 垂直居中

通过`center`属性可以让`Cell`的左右内容都垂直居中。

```jsx
<View>
  <Cell
    center={ true }
    title="单元格"
    value="内容"
    label="描述信息"
  />
</View>
 
```

## API

### CellGroup Props

|  参数            | 说明                   | 类型      | 默认值  |
| -------------- | ---------------------- | --------- | ------- |
|  title           | 分组标题               | _string_  | `-`     |
|  inset `v1.7.2`  | 是否展示为圆角卡片风格 | _boolean_ | `false` |
|  border          | 是否显示外边框         | _boolean_ | `true`  |

### CellGroup 外部样式类

|  类名          | 说明         |
| ------------ | ------------ |
|  customClass  | 根节点样式类 |

### Cell Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  icon  | 左侧图标名称或图片链接，可选值见 [Icon 组件](#/icon) | _string_ | - |
|  title  | 左侧标题 | _string \| number_ | - |
|  titleWidth  | 标题宽度，须包含单位 | _string_ | - |
|  value  | 右侧内容 | _string \| number_ | - |
|  label  | 标题下方的描述信息 | _string_ | - |
|  size  | 单元格大小，可选值为 `large` | _string_ | - |
|  border  | 是否显示下边框 | _boolean_ | `true` |
|  center  | 是否使内容垂直居中 | _boolean_ | `false` |
|  url  | 点击后跳转的链接地址 | _string_ | - |
|  linkType  | 链接跳转类型，可选值为 `redirectTo` `switchTab` `reLaunch` | _string_ | `navigateTo` |
|  clickable  | 是否开启点击反馈 | _boolean_ | `false` |
|  isLink  | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
|  required  | 是否显示表单必填星号 | _boolean_ | `false` |
|  arrowDirection  | 箭头方向，可选值为 `left` `up` `down` | _string_ | - |
|  titleStyle `v1.4.0`  | 标题样式 | _string_ | - |

### Cell Event

|  事件名      | 说明             | 参数 |
| ---------- | ---------------- | ---- |
|  onClick  | 点击单元格时触发 | -    |

### 自定义节点

|  名称        | 说明                                                           |
| ---------- | -------------------------------------------------------------- |
|  renderTitle       | 自定义`title`显示内容，如果设置了`title`属性则不生效           |
|  renderLabel       | 自定义`label`显示内容          |
|  renderIcon        | 自定义`icon`显示内容，如果设置了`icon`属性则不生效             |
|  renderRightIcon  | 自定义右侧按钮，默认是`arrow`，如果设置了`is-link`属性则不生效 |

