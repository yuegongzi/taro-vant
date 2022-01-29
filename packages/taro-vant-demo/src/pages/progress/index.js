import { Component } from 'react'
import { Progress } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  render() {
    return (
      <DemoPage title='Progress 进度条'>
        <DemoBlock title='基础用法'>
          <Progress className='progress-position' percentage='0' />
        </DemoBlock>
        <DemoBlock title='线条粗细'>
          <Progress
            className='progress-position'
            strokeWidth='8'
            percentage='100'
          />
        </DemoBlock>
        <DemoBlock title='置灰'>
          <Progress className='progress-position' inactive percentage='50' />
        </DemoBlock>
        <DemoBlock title='样式定制'>
          <Progress
            className='progress-position'
            pivotText='橙色'
            color='#f2826a'
            percentage='25'
          />
          <Progress
            className='progress-position'
            pivotText='红色'
            color='#ee0a24'
            percentage='50'
          />
          <Progress
            className='progress-position'
            percentage='75'
            pivotText='紫色'
            pivotColor='#7232dd'
            color='linear-gradient(to right, #be99ff, #7232dd)'
          />
        </DemoBlock>
      </DemoPage>
    )
  }
}
