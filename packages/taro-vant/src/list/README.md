# List 长列表

### 介绍
采用ScrollView编写实现长列表下拉刷新、上拉加载功能. ScrollView的特性,要求必须为其设置一个固定的高度,List默认给定了一个
100vh的样式,如果想要自定义List的高度 可以通过style方式修改height来实现

### 引入

```js

import { List } from 'taro-vant';

```

## 代码演示

### 基础用法

```jsx

const sleep = (t) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, t)
  })

const mockRequest = async () => {
   await sleep(2000)
  const data = []
  for(let i =1 ; i <= 20;i++){
      data.push(start+i)
  }
  return data;
}

export default ()=>{
  const [ list ,setList ] = useState([])
   const onLoad = async (refresh)=>{
      const response = await mockRequest(refresh ? 0 : list0.length)
      setList0(pre=>{
        return  refresh ? response : [ ...pre,...response ]
      })
  }
  return (
    <List onRefresh={()=>onLoad(true)}
                onLoad={onLoad} finished={list.length > 80}>
         {list.map((item,index)=>(
              <Cell title='数据列表' key={index} value={item}/>
            ))}
    </List>
  )
}

```

### 自定义下拉刷新

```jsx

 <List onRefresh={() => onLoad(true)}
                headHeight='80'
                onLoad={onLoad} finished={list.length > 100}
                header={({ status, distance }) => {
                  if (status === 'pulling') {
                    return (
                      <Image
                        className='doge'
                        src='https://img01.yzcdn.cn/vant/doge.png'
                        style={{ transform: `scale(${distance / 80})` }}
                      />
                    )
                  }
                  if (status === 'loosing') {
                    return (
                      <Image
                        className='doge'
                        src='https://img01.yzcdn.cn/vant/doge.png'
                      />
                    )
                  }
                  if (status === 'loading') {
                    return (
                      <Image
                        className='doge'
                        src='https://img01.yzcdn.cn/vant/doge-fire.jpg'
                      />
                    )
                  }
                }}
          >
            {list.map((item, index) => (
              <Cell title='数据列表' key={index} value={item} />
            ))}
          </List>
```




## API

### Props

| 参数                | 说明                                              | 类型                               | 默认值                |
|-------------------|-------------------------------------------------|----------------------------------|--------------------|
| pullingText       | 下拉过程提示文案                                        | _string_                         | `下拉即可刷新...`        |
| loosingText       | 释放过程提示文案                                        | _string_                         | `释放即可刷新...`        |
| loadingText       | 加载过程提示文案                                        | _string_                         | `加载中...`           |
| successText       | 刷新成功提示文案                                        | _string_                         | `刷新成功`             |
| successDuration   | 刷新成功提示展示时长(ms)                                  | _number \                        | string_            | `500` |
| animationDuration | 动画时长                                            | _number \                        | string_            | `300` |
| header            | 自定义刷新内容                                         | _({status,distance})=>ReactNode_ | `-`                |
| headHeight        | 顶部内容高度                                          | _number \                        | string_            | `50` |
| pullDistance      | 触发下拉刷新的距离                                       | _number \                        | string_            | 与 `headHeight` 一致 |
| finished          | 是否已加载完成，加载完成后不再触发load事件                         | _boolean_                        | `false`            |
| loadingText       | 加载过程中的提示文案                                      | _string\                         | ReactNode_         | `加载中...` |
| finishedText      | 加载完成后的提示文案                                      | _string\                         | ReactNode_         | `我是有底线的` |
| errorText         | 加载失败后的提示文案                                      | _string\                         | ReactNode_         | `请求失败，点击重新加载` |
| empty             | 是否无内容                                           | _boolean_                        | `false`            |
| emptyImage        | 没有内容时，图片类型，可选值为 error network search，支持传入图片 URL | _string_                         | `default`          |
| emptyDescription  | 没有内容时，图片下方的描述文字                                 | _string_                         | `emptyDescription` |
> 其他属性如是否开启下拉刷新等 参见  [ScrollView](https://taro-docs.jd.com/taro/docs/components/viewContainer/scroll-view)

### 自定义刷新header的状态

| 名称      | 说明    | 参数  |
|---------|-------|-----|
| normal  | 正常状态  |
| loading | 加载中状态 | -   |
| loosing | 释放中状态 | -   |
| pulling | 下拉中状态 | -   |
| success | 成功状态  | -   |

### ScrollView 原有属性重写或补充

| 参数               | 说明                                     | 类型        | 默认值    |
|------------------|----------------------------------------|-----------|--------|
| scrollY          | 	允许纵向滚动                                | _boolean_ | `true` |
| refresherEnabled | 开启下拉刷新                                 | _boolean_ | `true` |
| lowerThreshold   | 距底部/右边多远时（单位px），触发`onScrolltolower` 事件 | _number_  | `250`  |

### Events

| 事件名       | 说明       | 回调参数 |
|-----------|----------|------|
| onLoad    | 加载时触发的函数 | -    |
| onRefresh | 刷新时触发的函数 | -    |
