# PinNav 图钉导航

### 介绍

图钉固定体验交互，用于快捷导航

### 引入
    
``` javascript
import { PinNav } from 'taro-vant';
```

## 代码演示
### 基础用法


``` jsx
const navList = [
  {
    text: '首页',
    icon: 'home-o'
  },
  {
    text: '店铺',
    icon: 'shop-o'
  },
  {
    text: '购物车',
    badge: 2,
    icon: 'cart-o'
  },
  {
    text: '我的',
    icon: 'user-circle-o'
  },
]

<PinNav visible={visible}
        unActiveText='基础使用'
        position={{ top: '70px' }}
        onChange={setVisible}
        navList={navList} />
              
```

### 左侧效果

``` jsx
<PinNav visible={visible2}
              type='left'
              position={{ top: '140px' }}
              unActiveText='左侧展开'
              onChange={setVisible2}
              navList={navList} />
```



### 背景遮罩

``` jsx
 <PinNav visible={visible3}
              unActiveText='显示遮罩'
              overlay
              position={{ top: '210px' }}
              onChange={setVisible3}
              navList={navList} />
```


### 自定义渲染

``` jsx

<PinNav visible={visible5}
              unActiveText='自定渲染'
              position={{ top: '350px' }}
              onChange={setVisible5}>
        {[ 1,2,3,4,5 ].map((item,index)=>(
          <View key={index} className='item'>
            {item}
          </View>
        ))}
      </PinNav>
      
```




## API

### Prop
| 参数           | 说明                       | 类型    | 默认值                       |
|:---------------|:---------------------------|:--------|:-----------------------------|
| visible        | 是否打开                   | Boolean | false                        |
| navList       | 悬浮列表内容数据           | PinNavItem[]   | []                           |
| activeText    | 收起列表按钮文案           | String  | 收起导航                     |
| unActiveText | 展开列表按钮文案           | String  | 快速导航                     |
| type           | 导航方向,可选值 `left` | String  | right                        |
| overlay        | 展开时是否显示遮罩         | Boolean | true                         |
| position       | fixed 垂直位置             | Object  | {top: 'auto',bottom: 'auto'} |
| children       | 自定义展开列表内容             | HTMLElement  | - |
| icon       | 自定义展开图标            | string  | `arrow-left` |


### Event

| 事件名     | 说明         | 回调参数                 |
|----------|--------------|--------------------------|
| onChange | 展开收起按钮回调 | (value:boolean)=>void |
| onSelect | 选择之后触发 | (item:item) =>void|

### PinNavItem

| 参数     | 说明         | 类型                 |
|----------|--------------|--------------------------|
| icon | 图标 | string\|ReactNode |
| text | 底部文字 | string|
| badge | 徽标 | string\|number|
| url | 路径 | string|
| linkType | 跳转方式 | string|

    
