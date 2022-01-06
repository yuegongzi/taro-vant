import { Text, View } from '@tarojs/components'
import { Component } from 'react'

import { Col, Image, Loading, Row } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'

import DemoBlock from '../../components/demo-block/index'
import './index.scss'

export default class Index extends Component {
  state = {
    fits: [
      'contain',
      'cover',
      'fill',
      'none',
      'scaleDown',
      'widthFix',
      'heightFix',
    ],
    src: 'https://img.yzcdn.cn/vant/cat.jpeg',
  }

  constructor() {
    super()
  }

  render() {
    const { src, fits } = this.state
    return (
      <DemoPage title='Image 图片'>
        <>
          <DemoBlock title='基础用法' padding>
            <Row>
              <Image width='100' height='100' src={src} />
            </Row>
          </DemoBlock>
          <DemoBlock title='填充模式' padding>
            <Row gutter='20'>
              {fits.map((fit) => {
                return (
                  <Col key={fit.fit} span='8'>
                    <Image
                      fit={fit}
                      width='100%'
                      height='27vw'
                      src={src}
                    />
                    <View className='text'>{fit}</View>
                  </Col>
                )
              })}
            </Row>
          </DemoBlock>
          <DemoBlock title='圆形图片' padding>
            <Row gutter='20'>
              {fits.map((fit) => {
                return (
                  <Col key={fit.fit} span='8'>
                    <Image
                      round
                      fit={fit}
                      width='100%'
                      height='27vw'
                      src={src}
                    />
                    <View className='text'>{fit}</View>
                  </Col>
                )
              })}
            </Row>
          </DemoBlock>
          <DemoBlock title='加载中提示' padding>
            <Row gutter='20'>
              <Col span='8'>
                <Image width='100%' height='27vw' />
                <View className='text'>默认提示</View>
              </Col>
              <Col span='8'>
                <Image
                  width='100%'
                  height='27vw'
                  renderLoading={
                    <>
                      <Loading type='spinner' size='20' vertical />
                    </>
                  }
                />
                <View className='text'>自定义提示</View>
              </Col>
            </Row>
          </DemoBlock>
          <DemoBlock title='加载失败提示' padding>
            <Row gutter='20'>
              <Col span='8'>
                <Image width='100%' height='27vw' src='x' />
                <View className='text'>默认提示</View>
              </Col>
              <Col span='8'>
                <Image
                  width='100%'
                  height='27vw'
                  src='x'
                  renderError={
                    <>
                      <Text>加载失败</Text>
                    </>
                  }
                />
                <View className='text'>自定义提示</View>
              </Col>
            </Row>
          </DemoBlock>
        </>
      </DemoPage>
    )
  }
}
