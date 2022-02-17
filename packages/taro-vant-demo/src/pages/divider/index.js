import { Component } from 'react'
import { Divider } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  render() {
    return (
      <DemoPage title='Divider 分割线'>
        <DemoBlock className='white' title='基础用法' padding>
          <Divider />
        </DemoBlock>
        <DemoBlock className='white' title='内容位置' padding>
          <Divider contentPosition='center'>文本</Divider>
          <Divider contentPosition='left'>文本</Divider>
          <Divider contentPosition='right'>文本</Divider>
        </DemoBlock>
        <DemoBlock className='white' title='虚线' padding>
          <Divider dashed />
        </DemoBlock>
        <DemoBlock className='white' title='自定义样式' padding>
          <Divider
            contentPosition='center'
            style='color: #1989fa;border-color: #1989fa;font-size: 18px;'
          >
            文本
          </Divider>
        </DemoBlock>
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Divider 分割线',
  enableShareAppMessage: true,
})
