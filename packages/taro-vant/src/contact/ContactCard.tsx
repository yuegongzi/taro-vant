import type { FC } from 'react'
import type { ContactCardProps } from './PropsType'
import Cell from '../cell'
import { createNamespace, noop } from '../utils'
import classNames from 'clsx'
import { View } from '@tarojs/components'

const [ bem ] = createNamespace('contact-card')
const icon: Record<string, string> = {
  add: 'add-square',
  edit: 'contact',
}
const ContactCard: FC<ContactCardProps> = (props) => {
  const {
    className,
    type = 'add',
    addText,
    disabled,
    name,
    tel,
    onClick = noop,
  } = props
  const isLink = () => {
    if (type === 'add') {
      return true
    }
    return !disabled
  }
  return (
    <Cell
      className={classNames(className, bem([ type ]))}
      center
      onClick={onClick}
      title={
        <>
          {type === 'add' ? (
            <View>{addText}</View>
          ) : (
            <>
              <View>姓名：{name}</View>
              <View>电话：{tel}</View>
            </>
          )}
        </>
      }
      isLink={isLink()}
      icon={icon[type]}
    />
  )
}

ContactCard.defaultProps = {
  type: 'add',
  addText: '添加联系人',
  disabled: false,
}

export default ContactCard
