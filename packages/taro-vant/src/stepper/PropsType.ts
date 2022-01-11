import type { ComponentClass } from 'react'
import type { CommonEventFunction, StandardProps } from '@tarojs/components'
import type { InputProps } from '@tarojs/components/types/Input'

export interface StepperProps extends StandardProps {
  name?: string
  value?: string | number
  integer?: boolean
  disabled?: boolean
  inputWidth?: string | number
  buttonSize?: string | number
  asyncChange?: boolean
  disableInput?: boolean
  decimalLength?: number
  min?: string | number
  max?: string | number
  step?: string | number
  showPlus?: boolean
  showMinus?: boolean
  disablePlus?: boolean
  disableMinus?: boolean
  longPress?: boolean
  theme?: 'round'
  alwaysEmbed?: boolean
  onFocus?: CommonEventFunction<InputProps.inputForceEventDetail>
  onChange?: (event: { detail: { value: number | string } }) => void
  onBlur?: CommonEventFunction<InputProps.inputForceEventDetail>
  onOverlimit?: () => void
  onPlus?: () => void
  onMinus?: () => void
}
// Partial
declare const Stepper: ComponentClass<StepperProps>
export { Stepper }
