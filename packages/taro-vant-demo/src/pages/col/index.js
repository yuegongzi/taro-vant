import { Component } from 'react'
import { Col, Row } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  render() {
    return (
      <DemoPage title='Layout 布局'>
        <DemoBlock title='基础用法' padding>
          <Row>
            <Col span='8' className='dark'>
              span: 8
            </Col>
            <Col span='8' className='light'>
              span: 8
            </Col>
            <Col span='8' className='dark'>
              span: 8
            </Col>
          </Row>
          <Row>
            <Col span='4' className='dark'>
              span: 4
            </Col>
            <Col span='10' offset='4' className='light'>
              offset: 4, span: 10
            </Col>
          </Row>
          <Row>
            <Col offset='12' span='12' className='dark'>
              offset: 12, span: 12
            </Col>
          </Row>
        </DemoBlock>
        <DemoBlock title='在列元素之间增加间距' padding>
          <Row gutter='20'>
            <Col span='8' className='dark'>
              span: 8
            </Col>
            <Col span='8' className='light'>
              span: 8
            </Col>
            <Col span='8' className='dark'>
              span: 8
            </Col>
          </Row>
        </DemoBlock>
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Layout 布局',
  enableShareAppMessage: true,
})
