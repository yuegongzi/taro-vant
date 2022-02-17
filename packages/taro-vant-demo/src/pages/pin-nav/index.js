import { DemoPage } from 'components'
import { PinNav } from 'taro-vant'
import './index.scss'
import { useState } from 'react'
import { View } from '@tarojs/components'

const navList = [
  {
    text: '首页',
    icon: 'home-o',
  },
  {
    text: '店铺',
    icon: 'shop-o',
  },
  {
    text: '购物车',
    badge: 2,
    icon: 'cart-o',
  },
  {
    text: '我的',
    icon: 'user-circle-o',
    url: '/pages/icon/index',
  },
]
export default () => {
  const [ visible, setVisible ] = useState(false)
  const [ visible2, setVisible2 ] = useState(false)
  const [ visible3, setVisible3 ] = useState(false)
  const [ visible4, setVisible4 ] = useState(false)
  const [ visible5, setVisible5 ] = useState(false)
  return (
    <DemoPage title='PinNav 图钉导航'>
      <PinNav
        visible={visible}
        unActiveText='基础使用'
        position={{ top: '70px' }}
        onChange={setVisible}
        navList={navList}
      />
      <PinNav
        visible={visible2}
        type='left'
        position={{ top: '140px' }}
        unActiveText='左侧展开'
        onChange={setVisible2}
        navList={navList}
      />

      <PinNav
        visible={visible3}
        unActiveText='显示遮罩'
        overlay
        position={{ top: '210px' }}
        onChange={setVisible3}
        navList={navList}
      />
      <PinNav
        visible={visible4}
        unActiveText='自定义开'
        activeText='自定义关'
        type='left'
        icon='exchange'
        position={{ top: '280px' }}
        onChange={setVisible4}
        navList={navList}
      />
      <PinNav
        visible={visible5}
        className='custom'
        unActiveText='自定渲染'
        position={{ top: '350px' }}
        onChange={setVisible5}
      >
        {[ 1, 2, 3, 4, 5 ].map((item, index) => (
          <View key={index} className='item'>
            {item}
          </View>
        ))}
      </PinNav>
    </DemoPage>
  )
}

definePageConfig({
  navigationBarTitleText: 'PinNav 图钉导航',
  enableShareAppMessage: true,
})
