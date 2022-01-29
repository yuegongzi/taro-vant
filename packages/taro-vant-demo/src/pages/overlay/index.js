import { Component } from 'react'
import { View } from '@tarojs/components'
import { Button, Overlay } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  state = {
    show: false,
    showEmbedded: false,
  }
  onClickShow = () => {
    this.setState({ show: true })
  }
  onClickHide = () => {
    this.setState({ show: false })
  }
  onClickShowEmbedded = () => {
    this.setState({ showEmbedded: true })
  }
  onClickHideEmbedded = () => {
    this.setState({ showEmbedded: false })
  }
  noop = () => {}

  render() {
    const { show, showEmbedded } = this.state
    return (
      <DemoPage title='Overlay 遮罩层'>
        <DemoBlock title='基础用法' padding>
          <Button type='primary' onClick={this.onClickShow}>
            显示遮罩层
          </Button>
          <Overlay visible={show} onClick={this.onClickHide} />
        </DemoBlock>
        <DemoBlock title='嵌入内容' padding>
          <Button type='primary' onClick={this.onClickShowEmbedded}>
            嵌入内容
          </Button>
          <Overlay visible={showEmbedded} onClick={this.onClickHideEmbedded}>
            <View className='wrapper'>
              <View className='block' onClick={this.noop} />
            </View>
          </Overlay>
        </DemoBlock>
      </DemoPage>
    )
  }
}
