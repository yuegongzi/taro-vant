import type { ComponentClass, ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface SearchProps extends StandardProps {
  value?: string | number
  defaultValue?: string | number
  label?: string | ReactNode
  focus?: boolean
  error?: boolean
  disabled?: boolean
  readonly?: boolean
  inputAlign?: string
  showAction?: boolean
  leftIcon?: string
  rightIcon?: string
  placeholder?: string
  placeholderStyle?: string
  actionText?: string | ReactNode
  background?: string
  maxlength?: number
  shape?: string
  clearable?: boolean
  clearTrigger?: string
  clearIcon?: string
  onChange?: (e: ITouchEvent) => void
  onSearch?: (e: ITouchEvent) => void
  onFocus?: (e: ITouchEvent) => void
  onBlur?: (e: ITouchEvent) => void
  onClear?: () => void
  onCancel?: () => void
  onClickInput?: () => void
}

declare const Search: ComponentClass<SearchProps>

export { Search }
