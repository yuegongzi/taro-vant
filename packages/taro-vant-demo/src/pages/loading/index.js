import { Component } from 'react'
import { Loading } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  render() {
    return (
      <DemoPage title='Loading 加载'>
        <DemoBlock title='加载类型' padding>
          <Loading className='demo-loading' />
          <Loading className='demo-loading' type='spinner' />
          <Loading className='demo-loading' type='ball' />
        </DemoBlock>
        <DemoBlock title='自定义颜色' padding>
          <Loading className='demo-loading' color='#1989fa' />
          <Loading className='demo-loading' type='spinner' color='#1989fa' />
        </DemoBlock>
        <DemoBlock title='加载文案' padding>
          <Loading className='demo-loading' size='24px'>
            加载中...
          </Loading>
        </DemoBlock>
        <DemoBlock title='垂直排列' padding>
          <Loading className='demo-loading' size='24px' vertical>
            加载中...
          </Loading>
        </DemoBlock>
      </DemoPage>
    )
  }
}
