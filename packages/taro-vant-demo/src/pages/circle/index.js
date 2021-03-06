import { Component } from 'react'
import { Button, Circle } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

const format = (rate) => Math.min(Math.max(rate, 0), 100)
export default class Index extends Component {
  state = {
    value: 25,
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24',
    },
  }
  run = (e) => {
    const step = parseFloat(e.currentTarget.dataset.step)
    this.setState({
      value: format(this.state.value + step),
    })
  }

  render() {
    const { value, gradientColor } = this.state
    return (
      <DemoPage title='Circle 进度条'>
        <DemoBlock title='基础用法'>
          <Circle type='2d' value={value} text={value + '%'} />
        </DemoBlock>
        <DemoBlock title='样式定制'>
          <Circle value={value} strokeWidth={6} text='宽度定制' />
          <Circle
            value={value}
            layerColor='#eee'
            color='#ee0a24'
            text='颜色定制'
          />
          <Circle value={value} color={gradientColor} text='渐变色' />
          <Circle
            value={value}
            color='#07c160'
            clockwise={false}
            text='逆时针'
          />
          <Circle value={value} size='120' text='大小定制' />
        </DemoBlock>
        <Button
          type='primary'
          size='small'
          onClick={(e) => {
            this.run({
              detail: e.detail,
              currentTarget: {
                dataset: { step: '10' },
              },
              target: {
                dataset: { step: '10' },
              },
            })
          }}
        >
          增加
        </Button>
        <Button
          type='danger'
          size='small'
          onClick={(e) => {
            this.run({
              detail: e.detail,
              currentTarget: {
                dataset: { step: '-10' },
              },
              target: {
                dataset: { step: '-10' },
              },
            })
          }}
        >
          减少
        </Button>
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Circle 进度条',
  enableShareAppMessage: true,
})
