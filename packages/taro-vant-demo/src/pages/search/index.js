import { Component } from 'react'
import { showToast } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Search } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'

export default class Index extends Component {
  state = {
    value: '',
  }
  onChange = (e) => {
    this.setState({
      value: e.detail,
    })
  }
  onSearch = () => {
    if (this.state.value) {
      showToast({
        title: '搜索：' + this.state.value,
        icon: 'none',
      })
    }
  }
  onClick = () => {
    if (this.state.value) {
      showToast({
        title: '搜索：' + this.state.value,
        icon: 'none',
      })
    }
  }
  onCancel = () => {
    showToast({
      title: '取消',
      icon: 'none',
    })
  }
  onClear = () => {
    showToast({
      title: '清空',
      icon: 'none',
    })
  }

  render() {
    const { value } = this.state
    return (
      <DemoPage title='Search 搜索'>
        <DemoBlock title='基本用法'>
          <Search
            defaultValue={value}
            placeholder='请输入搜索关键词'
            onSearch={this.onSearch}
          />
        </DemoBlock>
        <DemoBlock title='事件监听'>
          <Search
            defaultValue={value}
            showAction
            placeholder='请输入搜索关键词'
            onSearch={this.onSearch}
            onCancel={this.onCancel}
            onClear={this.onClear}
          />
        </DemoBlock>
        <DemoBlock title='搜索框内容对齐'>
          <Search
            defaultValue={value}
            inputAlign='center'
            placeholder='请输入搜索关键词'
          />
        </DemoBlock>
        <DemoBlock title='禁用搜索框'>
          <Search
            disabled
            defaultValue={value}
            placeholder='请输入搜索关键词'
          />
        </DemoBlock>
        <DemoBlock title='自定义背景色'>
          <Search
            defaultValue={value}
            shape='round'
            background='#4fc08d'
            placeholder='请输入搜索关键词'
          />
        </DemoBlock>
        <DemoBlock title='自定义按钮'>
          <Search
            value={value}
            label='地址'
            shape='round'
            placeholder='请输入搜索关键词'
            onSearch={this.onSearch}
            onChange={this.onChange}
            showAction
            actionText={
              <View style={{ color: 'red' }} onClick={this.onClick}>
                搜索
              </View>
            }
          />
        </DemoBlock>
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Search 搜索',
  enableShareAppMessage: true,
})
