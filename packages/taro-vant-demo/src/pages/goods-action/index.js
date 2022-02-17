import { Component } from 'react'
import { GoodsAction, Toast } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

const GoodsActionButton = GoodsAction.Button
const GoodsActionIcon = GoodsAction.Icon
export default class Index extends Component {
  onClickIcon = () => {
    Toast.show('点击图标')
  }
  onClickButton = () => {
    Toast.show('点击按钮')
  }

  render() {
    return (
      <DemoPage title='GoodsAction 商品导航'>
        <DemoBlock title='基础用法'>
          <GoodsAction
            className='goods-action-position'
            safeAreaInsetBottom={false}
          >
            <GoodsActionIcon icon='chat-o' text='客服' openType='contact' />
            <GoodsActionIcon
              icon='cart-o'
              text='购物车'
              onClick={this.onClickIcon}
            />
            <GoodsActionButton
              text='加入购物车'
              type='warning'
              onClick={this.onClickButton}
            />
            <GoodsActionButton text='立即购买' onClick={this.onClickButton} />
          </GoodsAction>
        </DemoBlock>
        <DemoBlock title='提示信息'>
          <GoodsAction
            className='goods-action-position'
            safeAreaInsetBottom={false}
          >
            <GoodsActionIcon icon='chat-o' text='客服' dot />
            <GoodsActionIcon icon='cart-o' text='购物车' badge='5' />
            <GoodsActionIcon icon='shop-o' text='店铺' badge='12' />
            <GoodsActionButton text='加入购物车' type='warning' />
            <GoodsActionButton text='立即购买' />
          </GoodsAction>
        </DemoBlock>
        <DemoBlock title='自定义按钮颜色'>
          <GoodsAction
            className='goods-action-position'
            safeAreaInsetBottom={false}
          >
            <GoodsActionIcon icon='chat-o' text='客服' />
            <GoodsActionIcon icon='shop-o' text='店铺' />
            <GoodsActionButton
              color='#be99ff'
              type='warning'
              text='加入购物车'
            />
            <GoodsActionButton color='#7232dd' text='立即购买' />
          </GoodsAction>
        </DemoBlock>
        <DemoBlock title='朴素按钮'>
          <GoodsAction
            className='goods-action-position'
            safeAreaInsetBottom={false}
          >
            <GoodsActionIcon icon='chat-o' text='客服' />
            <GoodsActionIcon icon='shop-o' text='店铺' />
            <GoodsActionButton
              color='#7232dd'
              text='加入购物车'
              type='warning'
            />
            <GoodsActionButton
              type='primary'
              plain
              color='#7232dd'
              text='立即购买'
            />
          </GoodsAction>
        </DemoBlock>
        <Toast id='van-toast' />
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'GoodsAction 商品导航',
  enableShareAppMessage: true,
})
