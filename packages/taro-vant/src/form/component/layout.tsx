import Label from './label'
import Message from './message'
import { View } from '@tarojs/components'
import { createNamespace } from '../../utils'
import clsx from 'clsx'
import type { ReactNode } from 'react'

const [ bem ] = createNamespace('form-item')

type FormItemLayoutProps = {
  layout?: 'vertical' | 'horizontal',
  label?: string;
  required?: boolean;
  labelClass?: string;
  className?: string;
  message?: string;
  children?: ReactNode
  right?: ReactNode,
  labelWidth?: string;
}

export default (props: FormItemLayoutProps) => {
  const {
    layout = 'horizontal',
    label,
    required = false,
    labelClass = '',
    className = '',
    message,
    labelWidth,
    right,
  } = props
  return (<View className={clsx(bem('wrapper'))}>
      <View className={clsx(bem([ layout ]), className)}>
        <Label
          required={required}
          className={labelClass}
          labelWidth={labelWidth}
          label={label} />
        <View className={clsx(bem('control'))}>
          <View className={clsx(bem('control-item'))}>
            {props.children}
            {right}
          </View>
          <Message message={message} />
        </View>
      </View>
    </View>
  )
}
