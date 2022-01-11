import { Component } from 'react'
import { Button, Steps, Toast } from 'taro-vant'
import icons from '@vant/icons'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'

const steps1 = [
  {
    text: '买家下单',
  },
  {
    text: '商家接单',
  },
  {
    text: '买家提货',
  },
  {
    text: '交易完成',
  },
]

const steps = [
  {
    text: '步骤一',
    desc: '描述信息',
  },
  {
    text: '步骤二',
    desc: '描述信息',
  },
  {
    text: '步骤三',
    desc: '描述信息',
  },
  {
    text: '步骤四',
    desc: '描述信息',
  },
]

const steps2 = [
  {
    text: '【城市】物流状态1',
    desc: '2016-07-12 12:40',
  },
  {
    text: '【城市】物流状态',
    desc: '2016-07-11 11:00',
  },
  {
    text: '快件已发货',
    desc: '2016-07-10 09:30',
  },
]

export default class Index extends Component {
  state = {
    active: 1,
    steps,
    customIconSteps: steps.map((item, index) => ({
      ...item,
      inactiveIcon: icons.outline[index],
      activeIcon: icons.basic[index],
    })),
  }

  constructor() {
    super()
  }

  nextStep = () => {
    this.setState({
      active: (1 + this.state.active) % 4,
    })
  }

  onClick = (event) => {
    Toast.show(`Index: ${event.detail}`)
  }

  render() {
    const { steps, active, customIconSteps } = this.state
    return (
      <DemoPage title='Steps 步骤条'>
        <>
          <DemoBlock title='基础用法'>
            <Steps
              steps={steps1}
              active={active}
              onClickStep={this.onClick}
              className='demo-margin-bottom'
            />
            <Button className='demo-margin-left' onClick={this.nextStep}>
              下一步
            </Button>
          </DemoBlock>
          <DemoBlock title='自定义样式'>
            <Steps
              steps={steps}
              active={active}
              activeIcon='success'
              activeColor='#38f'
              inactiveIcon='arrow'
            />
          </DemoBlock>
          <DemoBlock title='自定义图标'>
            <Steps steps={customIconSteps} active={active} />
          </DemoBlock>
          <DemoBlock title='竖向步骤条'>
            <Steps
              steps={steps2}
              active={0}
              direction='vertical'
              activeColor='#07C160'
            />
          </DemoBlock>
          <Toast id='van-toast' />
        </>
      </DemoPage>
    )
  }
}
