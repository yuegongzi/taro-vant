# Sku 商品规格

### 介绍

用于商品选择

### 引入

在 Taro 文件中引入组件

```js
import { Sku } from "taro-vant"; 
```

## 代码演示

### 基本用法

```jsx
import React, { useState } from 'react';
import { Block, Page } from 'Demo';
import { Sku } from 'taro-vant';
import { sku,goods,properties } from './constant'

export default () => {
  const [ state,setState ] = useState(1)
  const onCancel = ()=>{
    setState(-1)
  }
  return (
    <Page>
      <Block title='基本使用'>
        <Sku visible={state === 1}
             onCancel={onCancel}
             sku={sku}
             limit={5}
             properties={properties}
             quota={10}
             stockThreshold={100}
             onSubmit={(arg1,arg2)=>console.log(arg1,arg2)}
             goods={goods}
        />
      </Block>
    </Page>
  );
}
 
```

```js
 export const sku = {
    tree:[
        {
            id: '2681',//规格类目ID
            name: '颜色', //规格类目名称
            values: [//规格列表
                { name: '粉色', imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png' },
                { name: '黄色', imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png' },
                { name: '蓝色', imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-3.png' },
            ],
        },
        {
            id: '2682',
            name: '尺寸',
            values: [
                { name: '小' },
                { name: '大' },
            ]
        },
        {
            id: '2683',
            name: '码数',
            values: [
                { name: '38码' },
                { name: '40码' },
            ]
        },
        {
            id: 'unit',
            name: '单位',
            values: [
                { name: '箱' },
                { name: '瓶' },
                { name: '盒' },
            ]
        }
    ],
    list: [
        {
            id: 2259, // skuId
            price: 12000, // 价格（单位分）
            stock: 20, // 当前 sku 组合对应的库存
            2681: '粉色', // 规格类目 id 为 2681 的对应规格值
            2682: '大', // 规格类目 id 为 2681 的对应规格值
            2683: '38码', // 规格类目 id 为 1 的对应规格值
            unit: '箱', // 规格类目 id 为 1 的对应规格值
            imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
        },
        {
            id: 2259, // skuId
            price: 2000, // 价格（单位分）
            stock: 20, // 当前 sku 组合对应的库存
            2681: '粉色', // 规格类目 id 为 2681 的对应规格值
            2682: '大', // 规格类目 id 为 2681 的对应规格值
            2683: '38码', // 规格类目 id 为 1 的对应规格值
            unit: '瓶', // 规格类目 id 为 1 的对应规格值
            imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
        },
        {
            id: 2260,
            price: 1900,
            stock: 10,
            2681: '黄色',
            2682: '小',
            2683: '40码',
            unit: '瓶',
            imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-2.png'
        },
        {
            id: 2261,
            price: 1900,
            stock: 12,
            2681: '蓝色',
            2682: '小',
            unit: '盒',
            2683: '38码',
            imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-3.png'
        }
    ]
}

export const goods = { //默认商品信息
    imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-1.png',
    price: 2000,
    stock: 42,
}

export const properties = [
    // 商品属性
    {
        id: 123, // 属性id
        name: '加料', // 属性名
        multiple: true, // 是否可多选
        values: [
            {
                id: 1222, // 属性值id
                name: '珍珠', // 属性值名
                price: 200, // 属性值加价
            },
            {
                id: 1223,
                name: '椰果',
                price: 200,
            },
            {
                id: 1224,
                name: '牛奶',
                price: 200,
            },
        ],
    },
    {
        id: 124, // 属性id
        name: '调料', // 属性名
        multiple: true, // 是否可多选
        values: [
            {
                id: 2222, // 属性值id
                name: '多盐', // 属性值名
                price: 100, // 属性值加价
            },
            {
                id: 2223,
                name: '味精',
                price: 100,
            },
            {
                id: 2224,
                name: '辣椒',
                price: 100,
            },
            {
                id: 2225,
                name: '花椒',
                price: 100,
            },
        ],
    },
];
```

## API

### Props

| 参数                  | 说明                                                             | 类型                              | 默认值            |
|---------------------|----------------------------------------------------------------|---------------------------------|----------------|
| sku                 | 商品 sku 数据                                                      | _object_                        | -              |
| goods               | 商品信息                                                           | _object_                        | -              |
| stockThreshold      | 库存阈值。低于这个值会把库存数高亮显示                                            | _boolean_                       | `50`           |
| showAddCartBtn      | 是否显示加入购物车按钮                                                    | _boolean_                       | `true`         |
| buyText             | 购买按钮文字                                                         | _string_                        | `立即购买`         |
| addCartText         | 加入购物车按钮文字                                                      | _string_                        | `加入购物车`        |
| quota               | 限购数，0 表示不限购                                                    | _number_                        | `0`            |
| quotaUsed           | 已经购买过的数量                                                       | _number_                        | `0`            |
| resetOnHide         | 隐藏时重置选择的商品数量                                                   | _boolean_                       | `false`        |
| disableStepperInput | 是否禁用步进器输入                                                      | _boolean_                       | `false`        |
| closeOnClickOverlay | 是否在点击遮罩层后关闭                                                    | _boolean_                       | `true`         |
| stepperTitle        | 数量选择组件左侧文案                                                     | _ReactNode_                     | `购买数量`         |
| customStepperConfig | 步进器相关自定义配置                                                     | _object_                        | `{}`           |
| customSkuValidator  | 自定义 sku 校验规则                                                   | _(type,selectedValue) => void \ | boolean \      | Promise\<boolean\>_ | - |
| initialSku          | 默认选中的 sku，具体参考高级用法                                             | _object_                        | -              |
| getContainer        | 指定挂载的节点，[用法示例](#/zh-CN/popup#zhi-ding-gua-zai-wei-zhi)         | _string \                       | () => Element_ | - |
| showSoldoutSku      | 是否展示售罄的 sku，默认展示并置灰                                            | _boolean_                       | `true`         |
| disableSoldoutSku   | 是否禁用售罄的 sku                                                    | _boolean_                       | `true`         |
| safeAreaInsetBottom | 是否开启[底部安全区适配](#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei) | _boolean_                       | `true`         |
| startSaleNum        | 起售数量                                                           | _number_                        | `1`            |
| properties          | 商品属性                                                           | _array_                         | -              |
| previewOnClickImage | 是否在点击商品图片时自动预览                                                 | _boolean_                       | `true`         |
| showHeaderImage     | 是否展示头部图片                                                       | _boolean_                       | `true`         |
| lazyload            | 是否开启图片懒加载                                                      | _boolean_                       | `false`        |
| bodyOffsetTop       | sku 距视窗顶部距离                                                    | _number_                        | 200            |

### Events

| 事件名      | 说明     | 回调参数                  |
|----------|--------|-----------------------|
| onSubmit | 提交时的回调 | type, skuData: object |
