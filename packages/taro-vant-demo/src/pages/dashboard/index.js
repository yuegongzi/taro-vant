import { Component } from 'react'

import list from '../../config'

import DemoHome from '../../components/demo-home/index'

export default class Index extends Component {
  state = {
    list,
  }

  constructor() {
    super()
  }

  render() {
    const { list } = this.state
    return <DemoHome list={list} />
  }
}
