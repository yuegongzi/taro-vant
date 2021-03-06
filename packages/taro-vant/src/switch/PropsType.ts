import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface SwitchProps extends StandardProps {
  checked?: boolean
  loading?: boolean
  disabled?: boolean
  activeColor?: string
  inactiveColor?: string
  size?: string
  activeValue?: any
  inactiveValue?: any
  onChange?: (event: ITouchEvent) => any
}
