# Area 省市区选择

### 介绍

省市区选择组件通常与 [弹出层](#/popup) 组件配合使用。

### 引入

在 Taro 文件中引入组件

```js
import { Area } from "taro-vant"; 
```

## 代码演示

### 基础用法

初始化省市区组件时，需要通过 `areaList` 属性传入省市区数据。

```jsx
<View>
  <Area areaList={  this.areaList } />
</View>
 
```

### areaList 格式

areaList 为对象结构，包含 `province_list`、`city_list`、`county_list` 三个 key。

每项以地区码作为 key，省市区名字作为 value。地区码为 6 位数字，前两位代表省份，中间两位代表城市，后两位代表区县，以 0 补足 6 位。比如北京的地区码为 `11`，以 0 补足 6 位，为 `110000`。

示例数据如下：

```js
const areaList = {
  province_list: {
    110000: '北京市',
    120000: '天津市',
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    // ....
  },
};
```

### @vant/area-data

Vant 官方提供了一份默认的省市区数据，可以通过 [@vant/area-data](https://github.com/youzan/vant/tree/dev/packages/vant-area-data) 引入。

```bash
yarn add @vant/area-data
```

```js
import { areaList } from '@vant/area-data';
this.state = {
  areaList
}; 
```

### 选中省市区

如果想选中某个省市区，需要传入一个`value`属性，绑定对应的省市区`code`。

```jsx
<View>
  <Area
    areaList={ this.state.areaList }
    value="110101"
  />
</View>
 
```

### 配置显示列

可以通过`columnsNum`属性配置省市区显示的列数，默认情况下会显示省市区，当你设置为`2`，则只会显示省市选择。

```jsx
<View>
  <Area
    areaList={  this.state.areaList }
    columnsNum={  2 }
    title="标题"
  />
</View>
 
```

### 配置列占位提示文字

可以通过`columnsPlaceholder`属性配置每一列的占位提示文字。

```jsx
<View>
  <Area
    areaList={  this.state.areaList }
    columnsPlaceholder={  ['请选择', '请选择', '请选择'] }
    title="标题"
  />
</View>
 
```

## 云开发示例

### 使用云开发获取省市区数据

实际项目中，可以通过[小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/gettingStarted.html)的能力，将省市区数据保存在云开发的数据库中，并在小程序中使用云开发的接口异步获取数据。

在小程序中使用云能力之前需要先调用`wx.could.init`方法完成云能力的初始化。

```js
const db = wx.cloud.database();

db.collection('region')
  .limit(1)
  .get()
  .then((res) => {
    if (res.data && res.data.length > 0) {
      this.setState({
        areaList: res.data[0],
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
```

## API

### Props

| 参数                 | 说明                     | 类型         | 默认值     |
|--------------------|------------------------|------------|---------|
| value              | 当前选中的省市区`code`         | _string_   | -       |
| title              | 顶部栏标题                  | _string_   | -       |
| areaList           | 省市区数据，格式见下方            | _object_   | -       |
| columnsNum         | 省市区显示列数，3-省市区，2-省市，1-省 | _string \  | number_ | `3` |
| columnsPlaceholder | 列占位提示文字                | _string[]_ | `[]`    |
| loading            | 是否显示加载状态               | _boolean_  | `false` |
| itemHeight         | 选项高度                   | _number_   | `44`    |
| visibleItemCount   | 可见的选项个数                | _number_   | `6`     |
| confirmButtonText  | 确认按钮文字                 | _string_   | `确认`    |
| cancelButtonText   | 取消按钮文字                 | _string_   | `取消`    |

### Events

| 事件        | 说明        | 回调参数                      |
|-----------|-----------|---------------------------|
| onConfirm | 点击右上方完成按钮 | 一个数组参数，具体格式看下方数据格式章节      |
| onCancel  | 点击取消按钮时   | -                         |
| onChange  | 选项改变时触发   | Picker 实例，所有列选中值，当前列对应的索引 |

