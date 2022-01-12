import type { FC } from 'react'
import type { AddressListProps } from './PropsType'
import Radio from '../radio'
import { assembly, createNamespace, noop } from '../utils'
import classNames from 'clsx'
import Address from './Address'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'

const [ bem ] = createNamespace('address-list')

const AddressList: FC<AddressListProps> = (props) => {
  const { className, list, value, onChange = noop, ...options } = props
  const onSelect = (e: ITouchEvent) => {
    const id = e.detail.value
    const select = list.filter((item) => item.id === id)
    if (select?.[0]) {
      onChange(assembly(e, select?.[0]))
    }
  }
  return (
    <View className={classNames(className, bem())}>
      <Radio.Group onChange={onSelect} value={value}>
        {list.map((item, index) => (
          <Address
            {...options}
            onClick={onSelect}
            data={item}
            key={index}
            checked
          />
        ))}
      </Radio.Group>
    </View>
  )
}

AddressList.defaultProps = {
  list: [],
}

export default AddressList
