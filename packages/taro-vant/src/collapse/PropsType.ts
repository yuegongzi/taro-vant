import type { ComponentClass, ReactNode } from 'react'
import type { ITouchEvent, StandardProps } from '@tarojs/components'

export interface CollapseProps extends StandardProps {
  value?: (string | number)[]
  accordion?: boolean
  border?: boolean
  children?: ReactNode[]
  onChange?: (event: ITouchEvent) => any
  onOpen?: (event: ITouchEvent) => any
  onClose?: (event: ITouchEvent) => any
}

declare const Collapse: ComponentClass<CollapseProps>

export { Collapse }
