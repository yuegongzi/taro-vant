import { Component } from 'react'
import { View } from '@tarojs/components'
import { Badge, Icon } from 'taro-vant'
import DemoPage from '../../components/demo-page'
import DemoBlock from '../../components/demo-block'
import './index.scss'

export default class Index extends Component {
  state = {}

  constructor() {
    super()
  }

  render() {
    return (
      <DemoPage title='Badge 徽标' className='badge-page'>
        <>
          <DemoBlock title='基础用法' padding>
            <View className='row'>
              <Badge content='5'>
                <View className='child' />
              </Badge>
              <Badge content='10'>
                <View className='child' />
              </Badge>
              <Badge content='hot'>
                <View className='child' />
              </Badge>
              <Badge dot>
                <View className='child' />
              </Badge>
            </View>
          </DemoBlock>
          <DemoBlock title='最大值' padding>
            <View className='row'>
              <Badge content='20' max='9'>
                <View className='child' />
              </Badge>
              <Badge content='50' max={20}>
                <View className='child' />
              </Badge>
              <Badge content={200} max={99}>
                <View className='child' />
              </Badge>
            </View>
          </DemoBlock>
          <DemoBlock title='自定义颜色' padding>
            <View className='row'>
              <Badge content='5' color='#1989fa'>
                <View className='child' />
              </Badge>
              <Badge content='10' color='#1989fa'>
                <View className='child' />
              </Badge>
              <Badge dot color='#1989fa'>
                <View className='child' />
              </Badge>
            </View>
          </DemoBlock>
          <DemoBlock title='自定义内容' padding>
            <View className='row'>
              <Badge content={<Icon name='success' className='badge-icon' />}>
                <View className='child' />
              </Badge>
            </View>
          </DemoBlock>
        </>
      </DemoPage>
    )
  }
}
