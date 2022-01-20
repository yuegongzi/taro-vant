import { Component } from 'react'
import { goods, properties, sku } from './constant'
import { Cell, Sku } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import './index.scss'

export default class Index extends Component {
  state = {
    visible: false,
  }

  render() {
    const { visible } = this.state

    return (
      <DemoPage title='Slider 滑块'>
        <DemoBlock title='基础用法'>
          <Cell
            title='使用'
            isLink
            onClick={() =>
              this.setState({
                visible: true,
              })
            }
          />
          <Sku
            visible={visible}
            sku={sku}
            limit={5}
            properties={properties}
            quota={10}
            stockThreshold={100}
            onSubmit={(arg1, arg2) => console.log(arg1, arg2)}
            goods={goods}
          />
        </DemoBlock>
      </DemoPage>
    )
  }
}
