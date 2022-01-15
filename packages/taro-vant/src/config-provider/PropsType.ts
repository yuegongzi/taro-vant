import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface ConfigProviderProps extends StandardProps {
  themeVars: Record<string, any>
  children: ReactNode
}
