import type { ComponentClass, ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface CheckboxGroupProps extends StandardProps {
  max?: number
  value?: any[]
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
  children?: ReactNode[]
  onChange?: (event: ITouchEvent) => any
}

declare const CheckboxGroup: ComponentClass<CheckboxGroupProps>

export { CheckboxGroup }
