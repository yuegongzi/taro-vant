import type { ComponentClass, ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface ConfigProviderProps extends StandardProps {
  themeVars: Normal.IAnyObject
  children: ReactNode
}

declare const ConfigProvider: ComponentClass<ConfigProviderProps>

export { ConfigProvider }
