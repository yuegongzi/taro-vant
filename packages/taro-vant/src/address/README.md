# Address 地址组件

### 介绍

用于地址信息的展示和编辑

### 引入

在 Taro 文件中引入组件

```js
import { Address } from "taro-vant"; 
```

## 代码演示

### 基础用法

展示基本地址信息

```jsx
const data = {
  recipient: '张三',
  phone: '13888888888',
  province: '浙江省',
  city: '杭州市',
  district: '西湖区',
  address: '文三路 138 号东方通信大厦 7 楼 501 室'
}

<View>
  <Address data={data} />
</View>

```

### 默认效果

右上角显示默认标签

```jsx

<View>
  <Address data={{ ...data, defaults: true }} />
</View>

```

### 地址选择

单个地址可选择

```jsx

<View>
  <Address checked data={data} onClick={(e) => console.log(e)} />
</View>

```

### 地址列表

大多数情况下我们的地址都是列表展示,针对列表的数据进行展示和编辑 `list` 数据必须包含id作为唯一键

```jsx
<Address.List color='#f44336' onEdit={(d) => console.log(d)}
              onChange={(e) => setValue(e.detail.value.id)} list={list} value={value} />
```

## API

### Address Props

| 参数        | 说明     | 类型            | 默认值       |
|-----------|--------|---------------|-----------|
| data      | 地址数据   | _AddressData_ | -         |
| checked   | 是否可选   | _boolean_     | `false`   |
| edit      | 是否可编辑  | _boolean_     | `false`   |
| clickable | 点击反馈效果 | _boolean_     | `false`   |
| color     | 颜色     | _string_      | `#1890ff` |

### AddressList Props

| 参数    | 说明      | 类型              | 默认值 |
|-------|---------|-----------------|-----|
| list  | 地址数据列表  | _AddressData[]_ | `-` |
| value | 默认选中的id | _string_        | `-` |

### Address Events

| 事件      | 说明          | 回调参数       |
|---------|-------------|------------|
| onClick | 点击整个地址卡片的回调 | 会将数据通过事件传递 |
| onEdit  | 点击编辑时的回调    | -          |

### AddressList Events

| 事件       | 说明      | 回调参数         |
|----------|---------|--------------|
| onChange | 选项改变时触发 | 变化的数据项通过事件获取 |

### AddressData

| 名称        | 说明   | 必填      |
|-----------|------|---------|
| id        | 地址id | 列表传递时必填 |
| phone     | 电话   | `flase` |
| recipient | 姓名   | `flase` |
| province  | 省    | `flase` |
| city      | 市    | `flase` |
| district  | 区    | `flase` |
| address   | 详细地址 | `flase` |
| defaults  | 是否默认 | `flase` |
