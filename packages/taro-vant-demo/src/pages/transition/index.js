import { Component } from 'react'
import { Cell, Transition } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  state = {
    show: false,
    name: 'fade',
    showCustom: false,
  }
  onClickFade = () => {
    this.trigger('fade')
  }
  onClickFadeUp = () => {
    this.trigger('fade-up')
  }
  onClickFadeDown = () => {
    this.trigger('fade-down')
  }
  onClickFadeLeft = () => {
    this.trigger('fade-left')
  }
  onClickFadeRight = () => {
    this.trigger('fade-right')
  }
  onClickSlideUp = () => {
    this.trigger('slide-up')
  }
  onClickSlideDown = () => {
    this.trigger('slide-down')
  }
  onClickSlideLeft = () => {
    this.trigger('slide-left')
  }
  onClickSlideRight = () => {
    this.trigger('slide-right')
  }
  trigger = (name) => {
    this.setState({ name, show: true })
    setTimeout(() => {
      this.setState({ show: false })
    }, 500)
  }
  onClickCustom = () => {
    this.setState({ showCustom: true })
    setTimeout(() => {
      this.setState({ showCustom: false })
    }, 1000)
  }
  onBeforeEnter = () => {
    console.log('before enter')
  }
  onEnter = () => {
    console.log('enter')
  }
  onAfterEnter = () => {
    console.log('after enter')
  }
  onBeforeLeave = () => {
    console.log('before leave')
  }
  onLeave = () => {
    console.log('leave')
  }
  onAfterLeave = () => {
    console.log('after leave')
  }

  render() {
    const { show, name, showCustom } = this.state
    return (
      <DemoPage title='Transition 动画'>
        <DemoBlock title='基础用法' padding>
          <Cell title='Fade' onClick={this.onClickFade} isLink />
          <Cell title='Fade Up' onClick={this.onClickFadeUp} isLink />
          <Cell title='Fade Down' onClick={this.onClickFadeDown} isLink />
          <Cell title='Fade Left' onClick={this.onClickFadeLeft} isLink />
          <Cell title='Fade Right' onClick={this.onClickFadeRight} isLink />
          <Cell title='Slide Up' onClick={this.onClickSlideUp} isLink />
          <Cell title='Slide Down' onClick={this.onClickSlideDown} isLink />
          <Cell title='Slide Left' onClick={this.onClickSlideLeft} isLink />
          <Cell title='Slide Right' onClick={this.onClickSlideRight} isLink />
          <Cell title='Custom' onClick={this.onClickCustom} isLink />
          <Transition visible={show} name={name} className='block' />
          <Transition
            visible={showCustom}
            name=''
            duration={{
              enter: 300,
              leave: 1000,
            }}
            className='block'
            enterClass='van-enter-class'
            enterActiveClass='van-enter-active-class'
            leaveActiveClass='van-leave-active-class'
            leaveToClass='van-leave-to-class'
            onBeforeEnter={this.onBeforeEnter}
            onEnter={this.onEnter}
            onAfterEnter={this.onAfterEnter}
            onBeforeLeave={this.onBeforeLeave}
            onLeave={this.onLeave}
            onAfterLeave={this.onAfterLeave}
          />
        </DemoBlock>
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Transition 动画',
  enableShareAppMessage: true,
})
