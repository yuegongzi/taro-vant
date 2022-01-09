import Label from './label'
import Message from './message'
import { View } from '@tarojs/components'
import Icon from '../../icon'
import { createNamespace, ele } from '../../utils'
import clsx from 'clsx'
import type { ReactNode } from 'react'

const [ bem ] = createNamespace('form-item')

type FormItemLayoutProps = {
  layout?: 'vertical' | 'horizontal',
  label?: string;
  required?: boolean;
  className?: string;
  labelClass?: string;
  errorMessage?: string;
  children?: ReactNode
  rightIcon?: string | ReactNode,
  titleWidth?: string;
}

export default (props: FormItemLayoutProps) => {
  const {
    layout = 'horizontal',
    label,
    required = false,
    className = '',
    labelClass,
    errorMessage,
    titleWidth,
    rightIcon,
  } = props
  return (<View className={clsx(bem('wrapper'))}>
      <View className={clsx(bem([ layout ]), className)}>
        <Label
          className={labelClass}
          required={required}
          titleWidth={titleWidth}
          label={label} />
        <View className={clsx(bem('control'))}>
          <View className={clsx(bem('control-item'))}>
            {props.children}
            <View className={clsx(bem('right'))}>
              {/* @ts-ignore*/}
              {ele(rightIcon,<Icon name={rightIcon}/>)}
            </View>
          </View>
          <Message errorMessage={errorMessage} />
        </View>
      </View>
    </View>
  )
}
