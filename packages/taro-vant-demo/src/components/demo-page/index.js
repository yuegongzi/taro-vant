import { Icon } from 'taro-vant'
import { View } from '@tarojs/components'
import {
  navigateBack,
  pageScrollTo,
  useRouter,
  useShareAppMessage,
} from '@tarojs/taro'
import React, { useEffect } from 'react'
import './index.less'

export default function Page(props) {
  const { title, className = '', children } = props
  const { path } = useRouter()
  useEffect(() => {
    if (process.env.LIBRARY_ENV === 'react') {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    } else {
      pageScrollTo({
        scrollTop: 0,
      })
    }
  }, [ path ])
  useShareAppMessage(() => {
    return {
      title: 'Taro Vant 组件库演示',
      path,
    }
  })
  return (
    <View className={`demo-page ${className}`}>
      {'h5' === process.env.TARO_ENV && (
        <View className='demo-nav'>
          <Icon
            name='arrow-left'
            className='demo-nav__back'
            onClick={() => navigateBack()}
          />
          <View className='demo-nav__title'>{title} </View>
        </View>
      )}
      {children}
    </View>
  )
}
