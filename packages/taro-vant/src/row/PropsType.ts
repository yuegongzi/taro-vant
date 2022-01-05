import type { ComponentClass } from 'react';
import type React from 'react'
import type { StandardProps } from '@tarojs/components'

export interface RowProps extends StandardProps {
  gutter?: number | string
  children: React.ReactNode
}

declare const Row: ComponentClass<RowProps>

export { Row }
