import type { ComponentClass, ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface RadioGroupProps extends StandardProps {
  value?: any
  direction?: 'vertical' | 'horizontal'
  disabled?: boolean
  children?: ReactNode
  onChange?: (event: ITouchEvent) => any
}

declare const RadioGroup: ComponentClass<RadioGroupProps>

export { RadioGroup }
