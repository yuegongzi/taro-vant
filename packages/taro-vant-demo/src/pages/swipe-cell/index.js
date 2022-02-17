import { Component } from 'react'
import { View } from '@tarojs/components'
import { Cell, Dialog, Notify, SwipeCell } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

const CellGroup = Cell.Group
export default class Index extends Component {
  onClose = (event) => {
    const { position, instance } = event.detail
    switch (position) {
      case 'left':
      case 'cell':
        instance.close()
        break
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close()
        })
        break
    }
  }
  onOpen = (event) => {
    const { position, name } = event.detail
    switch (position) {
      case 'left':
        Notify.show({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`,
        })
        break
      case 'right':
        Notify.show({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`,
        })
        break
    }
  }

  render() {
    return (
      <DemoPage title='SwipeCell 滑动单元格'>
        <DemoBlock title='基础用法'>
          <SwipeCell
            rightWidth={65}
            leftWidth={0}
            left={<View className='van-swipe-cell__left_'>选择</View>}
            right={<View className='van-swipe-cell__right_'>删除</View>}
          >
            <CellGroup>
              <Cell title='单元格' value='内容' />
            </CellGroup>
          </SwipeCell>
        </DemoBlock>
        <DemoBlock title='异步关闭'>
          <SwipeCell
            id='swipe-cell'
            rightWidth={65}
            leftWidth={65}
            asyncClose
            onClose={this.onClose}
            left={<View className='van-swipe-cell__left_'>选择</View>}
            right={<View className='van-swipe-cell__right_'>删除</View>}
          >
            <CellGroup>
              <Cell title='单元格' value='内容' />
            </CellGroup>
          </SwipeCell>
        </DemoBlock>
        <DemoBlock title='主动打开'>
          <SwipeCell
            id='swipe-cell2'
            rightWidth={65}
            leftWidth={65}
            name='示例'
            onOpen={this.onOpen}
            left={<View className='van-swipe-cell__left_'>选择</View>}
            right={<View className='van-swipe-cell__right_'>删除</View>}
          >
            <CellGroup>
              <Cell title='单元格' value='内容' />
            </CellGroup>
          </SwipeCell>
        </DemoBlock>
        <Dialog id='van-dialog' />
        <Notify id='van-notify' />
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'SwipeCell 滑动单元格',
  enableShareAppMessage: true,
})
