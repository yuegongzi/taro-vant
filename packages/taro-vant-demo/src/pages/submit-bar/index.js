import { Text, View } from '@tarojs/components'
import { Component } from 'react'
import { Checkbox, SubmitBar, Toast } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import './index.scss'

export default class Index extends Component {
  state = {
    checked: true,
  }
  constructor() {
    super()
  }

  onClickButton = () => {
    Toast.show('点击按钮')
  }
  onClickLink = () => {
    Toast.show('修改地址')
  }

  render() {
    return (
      <DemoPage title='SubmitBar 提交订单栏'>
        <>
          <DemoBlock title='基础用法'>
            <SubmitBar
              price={3050}
              buttonText='提交订单'
              onSubmit={this.onClickButton}
              className='van-submit-bar'
              safeAreaInsetBottom={false}
            />
          </DemoBlock>
          <DemoBlock title='禁用状态'>
            <SubmitBar
              disabled
              price={3050}
              buttonText='提交订单'
              tip='您的收货地址不支持同城送, 我们已为您推荐快递'
              tipIcon='//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png'
              onSubmit={this.onClickButton}
              className='van-submit-bar'
              safeAreaInsetBottom={false}
            />
          </DemoBlock>
          <DemoBlock title='加载状态'>
            <SubmitBar
              loading
              price={3050}
              buttonText='提交订单'
              onSubmit={this.onClickButton}
              className='van-submit-bar'
              safeAreaInsetBottom={false}
            />
          </DemoBlock>
          <DemoBlock title='高级用法'>
            <SubmitBar
              price={3050}
              buttonText='提交订单'
              onSubmit={this.onClickButton}
              className='van-submit-bar'
              safeAreaInsetBottom={false}
              tip={
                <>
                  <View>
                    您的收货地址不支持同城送
                    <Text className='edit-address' onClick={this.onClickLink}>
                      修改地址
                    </Text>
                  </View>
                </>
              }
            >
              <Checkbox
                onChange={() => {
                  this.setState({
                    checked: !this.state.checked,
                  })
                }}
                value={this.state.checked}
              >
                全选
              </Checkbox>
            </SubmitBar>
          </DemoBlock>
          <Toast id='van-toast' />
        </>
      </DemoPage>
    )
  }
}
