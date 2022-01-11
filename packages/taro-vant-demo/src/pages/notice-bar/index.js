import { Component } from 'react'
import { NoticeBar } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import './index.scss'

export default class Index extends Component {
  state = {
    text: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
    shortText: '技术是开发它的人的共同灵魂。',
  }

  constructor() {
    super()
  }

  render() {
    const { text, shortText } = this.state
    return (
      <DemoPage title='NoticeBar 通知栏'>
        <>
          <DemoBlock title='基础用法'>
            <NoticeBar text={text} leftIcon='volume-o' />
          </DemoBlock>
          <DemoBlock title='滚动模式'>
            <NoticeBar className='margin-top' scrollable text={shortText} />
            <NoticeBar className='margin-top' scrollable={false} text={text} />
          </DemoBlock>
          <DemoBlock title='多行展示'>
            <NoticeBar wrapable scrollable={false} text={text} />
          </DemoBlock>
          <DemoBlock title='通知栏模式'>
            <NoticeBar mode='closeable' text={shortText} />
            <NoticeBar className='margin-top' mode='link' text={shortText} />
          </DemoBlock>
          <DemoBlock title='自定义样式'>
            <NoticeBar
              text={shortText}
              color='#1989fa'
              background='#ecf9ff'
              leftIcon='info-o'
            />
          </DemoBlock>
          <DemoBlock title='自定义图标'>
            <NoticeBar text={shortText} />
          </DemoBlock>
        </>
      </DemoPage>
    )
  }
}
