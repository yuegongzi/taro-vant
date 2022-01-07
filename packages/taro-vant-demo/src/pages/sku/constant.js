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