import { Component } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, DropdownMenu, Switch } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

const DropdownItem = DropdownMenu.Item
export default class Index extends Component {
  state = {
    switchTitle1: '包邮',
    switchTitle2: '团购',
    itemTitle: '筛选',
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
    switch1: true,
    switch2: false,
    value1: 0,
    value2: 'a',
  }

  constructor() {
    super()
    this.instance = null
  }

  onConfirm = () => {
    this.instance.toggle()
  }
  onSwitch1Change = ({ detail }) => {
    this.setState({ switch1: detail })
  }
  onSwitch2Change = ({ detail }) => {
    this.setState({ switch2: detail })
  }

  render() {
    const {
      value1,
      option1,
      value2,
      option2,
      itemTitle,
      switchTitle1,
      switch1,
      switchTitle2,
      switch2,
    } = this.state
    return (
      <DemoPage title='Dropdown Menu'>
        <DemoBlock className='white' title='基础用法'>
          <DropdownMenu>
            <DropdownItem value={value1} options={option1} />
            <DropdownItem value={value2} options={option2} />
          </DropdownMenu>
        </DemoBlock>
        <DemoBlock className='white' title='自定义菜单内容'>
          <DropdownMenu>
            <DropdownItem value={value1} options={option1} />
            <DropdownItem ref={(el) => (this.instance = el)} title={itemTitle}>
              <Cell
                title={switchTitle1}
                rightIcon={
                  <Switch
                    size='24px'
                    style='height: 26px'
                    checked={switch1}
                    activeColor='#ee0a24'
                    onChange={this.onSwitch1Change}
                  />
                }
              />
              <Cell
                title={switchTitle2}
                rightIcon={
                  <Switch
                    size='24px'
                    style='height: 26px'
                    checked={switch2}
                    activeColor='#ee0a24'
                    onChange={this.onSwitch2Change}
                  />
                }
              />
              <View style='padding: 5px 16px;'>
                <Button type='danger' block round onClick={this.onConfirm}>
                  确认
                </Button>
              </View>
            </DropdownItem>
          </DropdownMenu>
        </DemoBlock>
        <DemoBlock className='white' title='自定义选中状态颜色'>
          <DropdownMenu activeColor='#1989fa'>
            <DropdownItem value={value1} options={option1} />
            <DropdownItem value={value2} options={option2} />
          </DropdownMenu>
        </DemoBlock>
        <DemoBlock className='white' title='向上展开'>
          <DropdownMenu direction='up'>
            <DropdownItem value={value1} options={option1} />
            <DropdownItem value={value2} options={option2} />
          </DropdownMenu>
        </DemoBlock>
        <DemoBlock className='white' title='禁用菜单'>
          <DropdownMenu>
            <DropdownItem value={value1} disabled options={option1} />
            <DropdownItem value={value2} disabled options={option2} />
          </DropdownMenu>
        </DemoBlock>
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Dropdown Menu',
  enableShareAppMessage: true,
})
