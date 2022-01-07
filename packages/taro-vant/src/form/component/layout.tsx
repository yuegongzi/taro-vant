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
  errorMessage?: string;
  children?: ReactNode
  right?: ReactNode,
  titleWidth?: string;
}

export default (props: FormItemLayoutProps) => {
  const {
    layout = 'horizontal',
    label,
    required = false,
    labelClass = '',
    className = '',
    errorMessage,
    titleWidth,
    right,
  } = props
  return (<View className={clsx(bem('wrapper'))}>
      <View className={clsx(bem([ layout ]), className)}>
        <Label
          required={required}
          className={labelClass}
          titleWidth={titleWidth}
          label={label} />
        <View className={clsx(bem('control'))}>
          <View className={clsx(bem('control-item'))}>
            {props.children}
            <View className={clsx(bem('right'))}>
              {right}
            </View>
          </View>
          <Message errorMessage={errorMessage} />
        </View>
      </View>
    </View>
  )
}
