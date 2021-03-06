import { Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import Icon from '../icon'
import Button from '../button'
import type { SubmitBarProps } from './PropsType'
import { createNamespace, ele } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('submit-bar')

function SubmitBar(props: SubmitBarProps) {
  const {
    tipIcon,
    tip,
    label,
    currency = '¥',
    suffixLabel,
    buttonType = 'danger',
    price,
    loading,
    disabled,
    buttonText,
    safeAreaInsetBottom = true,
    top,
    decimalLength,
    onSubmit,
    children,
    style,
    className,
    ...others
  } = props
  const [ state, setState ] = useState({
    integerStr: '',
    decimalStr: '',
    hasPrice: false,
  })
  const { integerStr, decimalStr, hasPrice } = state

  useEffect(
    function () {
      const priceStrArr =
        typeof price === 'number' &&
        (price / 100).toFixed(decimalLength).split('.')
      setState((pre: any) => {
        return {
          ...pre,
          hasPrice: typeof price === 'number',
          integerStr: priceStrArr && priceStrArr[0],
          decimalStr: decimalLength && priceStrArr ? `.${priceStrArr[1]}` : '',
        }
      })
    },
    [ decimalLength, price ],
  )
  return (
    <View className={clsx(bem(), className)} style={style} {...others}>
      {top}
      <View className={clsx(bem('tip'))}>
        {tipIcon && (
          <Icon size='12px' name={tipIcon} className={clsx(bem('tip-icon'))} />
        )}
        {ele(tip, <View className={clsx(bem('tip-text'))}>{tip}</View>)}
      </View>
      <View className={clsx(bem('bar'))}>
        {children}
        {hasPrice && (
          <View className={clsx(bem('text'))}>
            <Text>{label || '合计：'}</Text>
            <Text className={clsx(bem('price'))}>
              <Text className={clsx(bem('currency'))}>{currency}</Text>
              <Text className={clsx(bem('price-integer'))}>{integerStr}</Text>
              <Text>{decimalStr}</Text>
            </Text>
            <Text className={clsx(bem('suffix-label'))}>{suffixLabel}</Text>
          </View>
        )}
        <Button
          round
          type={buttonType}
          loading={loading}
          disabled={disabled}
          className={clsx(bem('button'))}
          onClick={onSubmit}
        >
          {loading ? '' : buttonText}
        </Button>
      </View>
      {safeAreaInsetBottom && <View className={clsx(bem('safe'))} />}
    </View>
  )
}

SubmitBar.displayName = 'SubmitBar'
export default SubmitBar
