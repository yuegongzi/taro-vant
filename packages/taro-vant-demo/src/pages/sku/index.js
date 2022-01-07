import { Component } from 'react'
import { showToast } from '@tarojs/taro'
import { sku,goods,properties } from './constant'
import { Slider,Sku } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'

import DemoBlock from '../../components/demo-block/index'
import './index.scss'

export default class Index extends Component {
  state = {
    currentValue: 50,
  }

  constructor() {
    super()
  }

  onChange = (event) => {
    showToast({
      icon: 'none',
      title: `当前值：${event.detail}`,
    })
  }

  onDrag = (event) => {
    this.setState({
      currentValue: event.detail.value,
    })
  }

  render() {
    const { currentValue } = this.state
    return (
      <DemoPage title='Slider 滑块'>
        <>
          <DemoBlock title='基础用法'>
            <Sku visible={true}
                 sku={sku}
                 limit={5}
                 properties={properties}
                 quota={10}
                 stockThreshold={100}
                 onSubmit={(arg1,arg2)=>console.log(arg1,arg2)}
                 goods={goods}
            />
          </DemoBlock>

        </>
      </DemoPage>
    )
  }
}
