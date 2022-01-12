import type { FC } from 'react'
import type { ContactProps } from './PropsType'
import { assembly, createNamespace, noop } from '../utils'
import classNames from 'clsx'
import Cell from '../cell'
import Radio from '../radio'
import Icon from '../icon'
import type { ITouchEvent } from '@tarojs/components'

const [ bem ] = createNamespace('contact-list')

const Contact: FC<ContactProps> = (props) => {
  const {
    className,
    nameField = 'name',
    telField = 'phone',
    data = {},
    onClick = noop,
    onEdit = noop,
  } = props
  const onPress = (event: ITouchEvent) => {
    event.stopPropagation()
    onEdit(assembly(event, data))
  }
  return (
    <Cell
      className={classNames(bem('item'), className)}
      onClick={onClick}
      title={
        <>
          {data[nameField]}，{data[telField]}
        </>
      }
      center
      clickable
      icon={<Icon onClick={onPress} name='edit' />}
      rightIcon={<Radio name={data['id']} />}
    />
  )
}

Contact.defaultProps = {}

export default Contact
