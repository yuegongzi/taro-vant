import { Component } from 'react'
import { Picker, Toast } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'

export default class Index extends Component {
  state = {
    column1: [ '杭州', '宁波', '温州', '嘉兴', '湖州' ],
    column2: [
      { text: '杭州', disabled: true },
      { text: '宁波' },
      { text: '温州' },
    ],
    column3: {
      浙江: [ '杭州', '宁波', '温州', '嘉兴', '湖州' ],
      福建: [ '福州', '厦门', '莆田', '三明', '泉州' ],
    },
    column4: [
      {
        values: [ '浙江', '福建' ],
        className: 'column1',
      },
      {
        values: [ '杭州', '宁波', '温州', '嘉兴', '湖州' ],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
  }
  onChange1 = (event) => {
    const { value, index } = event.detail
    Toast.show(`Value: ${value}, Index：${index}`)
  }
  onConfirm = (event) => {
    const { value, index } = event.detail
    Toast.show(`Value: ${value}, Index：${index}`)
  }
  onCancel = () => {
    Toast.show('取消')
  }
  onChange2 = (event) => {
    const { picker, value } = event.detail
    picker.setColumnValues(1, this.state.column3[value[0]])
  }

  render() {
    const { column1, column4, column2 } = this.state
    return (
      <DemoPage title='Picker 选择器'>
        <DemoBlock title='基础用法'>
          <Picker columns={column1} onChange={this.onChange1} />
        </DemoBlock>
        <DemoBlock title='默认选中项'>
          <Picker
            columns={column1}
            defaultIndex={2}
            onChange={this.onChange1}
          />
        </DemoBlock>
        <DemoBlock title='展示顶部栏'>
          <Picker
            showToolbar
            title='标题'
            columns={column1}
            onChange={this.onChange1}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
          />
        </DemoBlock>
        <DemoBlock title='多列联动'>
          <Picker columns={column4} onChange={this.onChange2} />
        </DemoBlock>
        <DemoBlock title='禁用选项'>
          <Picker columns={column2} />
        </DemoBlock>
        <DemoBlock title='加载状态'>
          <Picker loading columns={column4} />
        </DemoBlock>
        <Toast id='van-toast' />
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Picker 选择器',
  enableShareAppMessage: true,
})
