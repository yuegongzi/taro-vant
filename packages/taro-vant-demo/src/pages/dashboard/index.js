import { Component } from 'react'
import list from '../../config'
import { DemoHome } from 'components'

export default class Index extends Component {
  state = {
    list,
  }

  render() {
    const { list } = this.state
    return <DemoHome list={list} />
  }
}

definePageConfig({
  navigationBarTitleText: 'taro-vant',
  enableShareAppMessage: true,
})
