import type { ReactNode } from 'react'
import type {
  CommonEventFunction,
  ITouchEvent,
  StandardProps,
} from '@tarojs/components'
import type { TextareaProps } from '@tarojs/components/types/Textarea'

export interface FieldProps extends StandardProps {
  value?: string | number
  placeholder?: string
  placeholderStyle?: string
  placeholderClass?: string
  disabled?: boolean
  maxlength?: number
  cursorSpacing?: number
  autoFocus?: boolean
  focus?: boolean
  cursor?: number
  selectionStart?: number
  selectionEnd?: number
  adjustPosition?: boolean
  holdKeyboard?: boolean
  type?: 'number' | 'text' | 'idcard' | 'digit' | 'textarea' | 'password'
  password?: boolean
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
  confirmHold?: boolean
  autoHeight?: boolean
  fixed?: boolean
  showConfirmBar?: boolean
  disableDefaultPadding?: boolean
  size?: 'large'
  label?: string | ReactNode
  error?: boolean
  center?: boolean
  isLink?: boolean
  leftIcon?: string
  rightIcon?: string
  autosize?: boolean | TaroGeneral.IAnyObject
  required?: boolean
  iconClass?: string
  labelClass?: string
  clickable?: boolean
  inputAlign?: string
  style?: string
  errorMessage?: string
  arrowDirection?: 'left' | 'up' | 'down'
  showWordLimit?: boolean
  errorMessageAlign?: string
  alwaysEmbed?: boolean
  readonly?: boolean
  clearable?: boolean
  clearTrigger?: string
  border?: boolean
  titleWidth?: string
  clearIcon?: string
  button?: ReactNode
  onInput?: (e: ITouchEvent) => void
  onChange?: (e: ITouchEvent) => void
  onConfirm?: (e: ITouchEvent) => void
  onClickIcon?: () => void
  onFocus?: (e: ITouchEvent) => void
  onBlur?: (e: ITouchEvent) => void
  onClear?: () => void
  onClickInput?: () => void
  onLineChange?: CommonEventFunction<TextareaProps.onLineChangeEventDetail>
  onKeyboardHeightChange?: CommonEventFunction<TextareaProps.onKeyboardHeightChangeEventDetail>
  children?: ReactNode
}
