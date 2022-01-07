import type { ComponentClass, ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface SubmitBarProps extends StandardProps {
  tip?: string
  tipIcon?: string
  price?: number
  label?: string
  loading?: boolean
  disabled?: boolean
  buttonText?: string
  currency?: string
  buttonType?: 'default' | 'primary' | 'info' | 'warning' | 'danger'
  decimalLength?: number
  suffixLabel?: string
  safeAreaInsetBottom?: boolean
  children?: ReactNode
  renderTop?: ReactNode
  renderTip?: ReactNode
  onSubmit?: (event: ITouchEvent) => void
}

declare const SubmitBar: ComponentClass<SubmitBarProps>

export { SubmitBar }
