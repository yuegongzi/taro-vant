import type { FC } from 'react'
import type { AddressProps } from './PropsType'
import { assembly, createNamespace, noop } from '../utils'
import Cell from '../cell'
import Radio from '../radio'
import Icon from '../icon'
import Tag from '../tag'
import './style/index.less'
import classNames from 'clsx'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'

const [ bem ] = createNamespace('address-item')

const Address: FC<AddressProps> = (props) => {
  const {
    className,
    data,
    checked,
    edit,
    clickable,
    onEdit = noop,
    onClick = noop,
    color,
  } = props
  const renderAddress = () => {
    return (
      <>
        <View className={classNames(bem('name'))}>
          {data.recipient} {data.phone}
          {data.defaults && (
            <Tag
              className={classNames(bem('tag'))}
              type='primary'
              color={color}
              round
            >
              默认
            </Tag>
          )}
        </View>
        <View className={classNames(bem('address'))}>
          {data.province}
          {data.city}
          {data.district}
          {data.address}
        </View>
      </>
    )
  }
  const clickIcon = clickable ? (
    <Icon name='arrow' className={classNames(bem('edit'))} />
  ) : null
  const rightIcon = edit ? (
    <Icon
      onClick={(e: ITouchEvent) => onEdit(assembly(e, data))}
      name='edit'
      className={classNames(bem('edit'))}
    />
  ) : (
    clickIcon
  )

  const onTap = (e: ITouchEvent) => {
    if (clickable) {
      onClick(assembly(e, data))
    }
  }
  const _onClick = (e: ITouchEvent) => {
    onClick(assembly(e, data))
  }

  return (
    <View className={classNames(className, bem())}>
      <Cell
        onClick={onTap}
        titleClass={classNames(bem('value', { edit: clickable || edit }))}
        title={
          checked ? (
            <Radio name={data.id} onClick={_onClick} checkedColor={color}>
              {renderAddress()}
            </Radio>
          ) : (
            renderAddress()
          )
        }
        rightIcon={rightIcon}
        clickable={clickable}
      />
    </View>
  )
}

Address.defaultProps = {
  data: {},
  checked: false,
  edit: true,
  clickable: false,
}
Address.displayName = 'Address'
export default Address
