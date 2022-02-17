import { Text } from '@tarojs/components'
import { Component } from 'react'
import { CountDown, Grid, Toast } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

const GridItem = Grid.Item
export default class Index extends Component {
  state = {
    time: 30 * 60 * 60 * 1000,
    timeData: {},
  }
  onChange = (e) => {
    this.setState({
      timeData: e.detail,
    })
  }
  start = () => {
    const countDown = this.controlCountDown
    countDown.start()
  }
  pause = () => {
    const countDown = this.controlCountDown
    countDown.pause()
  }
  reset = () => {
    const countDown = this.controlCountDown
    countDown.reset()
  }
  finished = () => {
    Toast.show('倒计时结束')
  }

  render() {
    const { time, timeData } = this.state
    return (
      <DemoPage title='CountDown 倒计时'>
        <DemoBlock title='基础用法'>
          <CountDown time={time} />
        </DemoBlock>
        <DemoBlock title='自定义格式'>
          <CountDown time={time} format='DD 天 HH 时 mm 分 ss 秒' />
        </DemoBlock>
        <DemoBlock title='毫秒级渲染'>
          <CountDown millisecond time={time} format='HH:mm:ss:SSS' />
        </DemoBlock>
        <DemoBlock title='自定义样式'>
          <CountDown time={time} onChange={this.onChange}>
            <Text className='item'>{timeData.hours}</Text>
            <Text className='item'>{timeData.minutes}</Text>
            <Text className='item'>{timeData.seconds}</Text>
          </CountDown>
        </DemoBlock>
        <DemoBlock title='手动控制'>
          <CountDown
            className='control-count-down'
            ref={(c) => {
              this.controlCountDown = c
            }}
            millisecond
            time={3000}
            autoStart={false}
            format='ss:SSS'
            onFinish={this.finished}
          />
          <Grid clickable columnNum='3'>
            <GridItem text='开始' icon='play-circle-o' onClick={this.start} />
            <GridItem text='暂停' icon='pause-circle-o' onClick={this.pause} />
            <GridItem text='重置' icon='replay' onClick={this.reset} />
          </Grid>
        </DemoBlock>
        <Toast id='van-toast' />
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'CountDown 倒计时',
  enableShareAppMessage: true,
})
