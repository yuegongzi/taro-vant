import './style/index.less';
import type { ButtonProps } from './PropsType'
import Taro from '@tarojs/taro'
import { Block, Button as TaroButton, View } from '@tarojs/components'
import * as utils from '../wxs/utils'
import Icon from '../icon'
import Loading from '../loading'
import * as computed from './wxs'

export function Button(props: ButtonProps) {
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
    <TaroButton
      className={
        ' ' +
        utils.bem('button', [
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
        ]) +
        ' ' +
        (hairline ? 'van-hairline--surround' : '') +
        ` ${className || ''}`
      }
      hoverClass='van-button--active hover-class'
      style={utils.style([
        computed.rootStyle({
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
            className='loading-class'
            size={loadingSize}
            type={loadingType}
            color={computed.loadingColor({
              type,
              color,
              plain,
            })}
          />
          {loadingText && (
            <View className='van-button__loading-text'>{loadingText}</View>
          )}
        </View>
      ) : (
        <Block>
          {icon && (
            <Icon
              size='1.2em'
              name={icon}
              classPrefix={classPrefix}
              className='van-button__icon'
              style='line-height: inherit;'
            />
          )}
          <View className='van-button__text'>{children}</View>
        </Block>
      )}
    </TaroButton>
  )
}

export default Button
