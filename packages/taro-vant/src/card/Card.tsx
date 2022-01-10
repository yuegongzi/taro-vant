
import { Image, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { createNamespace, ele, jumpLink } from '../utils'
import Tag from '../tag'
import type { CardProps } from './PropsType'
import clsx from 'clsx'

const [ bem ] = createNamespace('card')

function Card(props: CardProps) {
  const {
    tag,
    num,
    desc,
    thumb,
    title,
    price,
    centered,
    lazyLoad,
    thumbLink,
    originPrice,
    thumbMode = 'aspectFit',
    currency = '¥',
    footer,
    bottom,
    priceTop,
    tags,
    style,
    className,
    ...others
  } = props
  const [ state, setState ] = useState({
    integerStr: '',
    decimalStr: '',
  })
  const { integerStr, decimalStr } = state
  useEffect(
    function() {
      const priceArr = price.toString().split('.')
      setState((pre: any) => {
        return {
          ...pre,
          integerStr: priceArr[0],
          decimalStr: priceArr[1] ? `.${priceArr[1]}` : '',
        }
      })
    },
    [ price ],
  )
  return (
    <View className={clsx(bem(), className)} style={style} {...others}>
      <View
        className={clsx(bem('header', { center: centered }))}
      >
        <View
          className={clsx(bem('thumb'))}
          onClick={() => {
            if (thumbLink) {
              jumpLink(thumbLink)
            }
          }}
        >
          {/*@ts-ignore*/}
          {ele(thumb, <Image src={thumb}
                             mode={thumbMode}
                             lazyLoad={lazyLoad}
                             className={clsx(bem('img'))}
          />)}
          {ele(tag, <Tag mark type='danger' className={clsx(bem('tag'))}>
            {tag}
          </Tag>)}
        </View>
        <View
          className={clsx(bem('content', {
            center: centered,
          }))}
        >
          <View>
            <View className={
              clsx(bem('title'))
            }>{title}</View>
            <View className={clsx(bem('desc'))}>{desc}</View>
            {tags}
          </View>
          <View className={clsx(bem('bottom'))}>
            {priceTop}
            <View className={clsx(bem('price'))}>
              <Text>{currency}</Text>
              <Text className={clsx(bem('price-integer'))}>{integerStr}</Text>
              <Text className={clsx(bem('price-decimal'))}>{decimalStr}</Text>
            </View>
            <View className={clsx(bem('origin-price'))}>
              {ele(originPrice, `${currency}  ${originPrice}`)}
            </View>
            <View className={clsx(bem('num'))}>
              {ele(num, `x ${num}`)}
            </View>
            {bottom}
          </View>
        </View>
      </View>
      <View className={clsx(bem('footer'))}>{footer}</View>
    </View>
  )
}

Card.displayName='Card'
export default Card
