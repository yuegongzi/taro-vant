import './style/index.less'
import type { ButtonProps } from './PropsType'
import Taro from '@tarojs/taro'
import { Block, Button , View } from '@tarojs/components'
import Icon from '../icon'
import Loading from '../loading'
import { rootStyle,loadingColor } from './wxs'
import { createNamespace,computedStyle } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('button')

function Index(props: ButtonProps) {
  const {
    type = 'default',
    size = 'normal',
    block,
    round,
    plain,
    square,
    loading,
    disabled,
    hairline,
    color,
    loadingSize = Taro.pxTransform(40),
    loadingType = 'circular',
    loadingText,
    icon,
    classPrefix = 'van-icon',
    onClick,
    children,
    style,
    className,
    ...others
  } = props

  return (
    <Button
      className={clsx(bem([
        type,
        size,
        {
          block,
          round,
          plain,
          square,
          loading,
          disabled,
          hairline,
          unclickable: disabled || loading,
        },
      ]), { ['van-hairline--surround']: hairline }, className)
      }
      hoverClass={clsx(bem('',[ 'active' ],true))}
      style={computedStyle([
        rootStyle({
          plain,
          color,
        }),
        style,
      ])}
      onClick={disabled || loading ? undefined : onClick}
      {...others}
    >
      {loading ? (
        <View style='display: flex'>
          <Loading
            size={loadingSize}
            type={loadingType}
            color={loadingColor({
              type,
              color,
              plain,
            })}
          />
          {loadingText && (
            <View className={clsx(bem('loading-text'))}>{loadingText}</View>
          )}
        </View>
      ) : (
        <Block>
          {icon && (
            <Icon
              size='1.2em'
              name={icon}
              classPrefix={classPrefix}
              className={clsx(bem('icon'))}
            />
          )}
          <View className={clsx(bem('text'))}>{children}</View>
        </Block>
      )}
    </Button>
  )
}

export default Index
