import type { FC } from 'react'
import type { SkuItemProps } from './PropsType'
import { createNamespace, noop } from '../utils'
import Image from '../image'
import classNames from 'clsx'
import { isSkuChoosable } from './utils/helper'
import { View, Text } from '@tarojs/components'

const [ bem ] = createNamespace('sku-row')

const SkuItem: FC<SkuItemProps> = (props) => {
  const {
    skuValue = {},
    skuKeyStr = '',
    selectedSku = {},
    skuList = [],
    onSelect = noop,
  } = props
  const choosable = isSkuChoosable(skuList, selectedSku, {
    key: skuKeyStr,
    valueId: skuValue.name,
  })
  const choosed = skuValue.name === selectedSku[skuKeyStr]
  const cls = classNames(
    bem('item', {
      active: choosed,
      disabled: !choosable,
    }),
  )
  const onTap = () => {
    if (choosable) {
      onSelect({ ...skuValue, skuKeyStr })
    }
  }
  return (
    <View className={cls} onClick={onTap}>
      {skuValue.imgUrl && (
        <Image
          className={classNames(bem('item-img'))}
          src={skuValue.imgUrl}
          fit='cover'
        />
      )}
      <Text className={classNames(bem('item-name'))}>{skuValue.name}</Text>
    </View>
  )
}

SkuItem.defaultProps = {}

export default SkuItem
