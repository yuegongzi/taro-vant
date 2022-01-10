import './style/index.less'
import { useCallback, useEffect, useState } from 'react'
import { Block, View } from '@tarojs/components'
import { computedStyle, createNamespace, ele, getRect, getSystemInfoSync, Navbar } from '../utils'
import type { NavBarProps } from './PropsType'
import Icon from '../icon'
import { barStyle } from './wxs'
import clsx from 'clsx'

const [ bem ] = createNamespace('nav-bar')

function NavBar(props: NavBarProps) {
  const [ height, setHeight ] = useState(46)
  const [ statusBarHeight, setStatusBarHeight ] = useState(44)
  const {
    fixed,
    placeholder,
    border = true,
    zIndex = Navbar,
    safeAreaInsetTop = true,
    leftArrow,
    leftText,
    title,
    rightText,
    onClickLeft,
    onClickRight,
    style,
    className,
    ...others
  } = props
  const setNextHeight = useCallback(
    function() {
      if (!fixed || !placeholder) {
        return
      }
      getRect(null, '.van-nav-bar').then((res: any) => {
        if (res && 'height' in res) {
          setHeight(res.height)
        }
      })
    },
    [ fixed, placeholder ],
  )

  useEffect(function() {
    const { statusBarHeight } = getSystemInfoSync()
    setHeight(46 + statusBarHeight)
    setStatusBarHeight(statusBarHeight)
  }, [])

  useEffect(
    function() {
      setNextHeight()
    },
    [ setNextHeight ],
  )
  return (
    <Block>
      {fixed && placeholder && (
        <View style={'height: ' + height + 'px;'} />
      )}
      <View className={clsx(bem({ fixed }), { 'van-hairline--bottom': border }, className)}
            style={computedStyle([
              barStyle({
                zIndex,
                statusBarHeight,
                safeAreaInsetTop,
              }) +
              '; ' +
              style,
            ])}
            {...others}
      >
        <View className={clsx(bem('content'))}>
          <View className={clsx(bem('left'))} onClick={onClickLeft}>
            {ele(leftArrow, <Icon
              size={64}
              name='arrow-left'
              className={clsx(bem('arrow'))}
            />)}
            {ele(leftText,<View
              className={clsx(bem('text'))}
              hoverClass={clsx(bem('text', [ 'hover' ], true))}
              hoverStayTime={70}
            >
              {leftText}
            </View>)}
          </View>
          <View className={clsx(bem('title'), 'van-ellipsis')}>
            {title }
          </View>
          <View className={clsx(bem('right'))} onClick={onClickRight}>
            {ele(rightText, <View
              className={clsx(bem('text'))}
              hoverClass={clsx(bem('text', [ 'hover' ], true))}
              hoverStayTime={70}
            >
              {rightText}
            </View>)}
          </View>
        </View>
      </View>
    </Block>
  )
}
NavBar.displayName = 'NavBar'
export default NavBar
