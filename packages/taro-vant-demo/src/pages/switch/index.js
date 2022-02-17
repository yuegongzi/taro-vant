import { Component } from 'react'
import { Dialog, Switch } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  state = {
    checked: true,
    checked2: true,
  }
  onChange = ({ detail }) => {
    this.setState({ checked: detail })
  }
  onChange2 = ({ detail }) => {
    Dialog.confirm({
      selector: '#switch-demo',
      title: '提示',
      message: '是否切换开关？',
    }).
      then(() => {
        this.setState({ checked2: detail })
      }).
      catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { checked, checked2 } = this.state
    return (
      <DemoPage title='Switch 开关'>
        <DemoBlock title='基础用法' padding>
          <Switch checked={checked} onChange={this.onChange} />
        </DemoBlock>
        <DemoBlock title='禁用状态' padding>
          <Switch checked={checked} disabled onChange={this.onChange} />
        </DemoBlock>
        <DemoBlock title='加载状态' padding>
          <Switch checked={checked} loading onChange={this.onChange} />
        </DemoBlock>
        <DemoBlock title='自定义大小' padding>
          <Switch checked={checked} size='24px' onChange={this.onChange} />
        </DemoBlock>
        <DemoBlock title='自定义颜色' padding>
          <Switch
            checked={checked}
            activeColor='#07c160'
            inactiveColor='#ee0a24'
            onChange={this.onChange}
          />
        </DemoBlock>
        <DemoBlock title='异步控制' padding>
          <Switch checked={checked2} size='36px' onChange={this.onChange2} />
        </DemoBlock>
        <Dialog id='switch-demo' />
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Switch 开关',
  enableShareAppMessage: true,
})
