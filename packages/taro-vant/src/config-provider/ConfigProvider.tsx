
import { View } from '@tarojs/components'
import type { ConfigProviderProps } from './PropsType'
import { mapThemeVarsToCSSVars } from './wxs'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('config-provider')

export function ConfigProvider(props: ConfigProviderProps) {
  const { themeVars = {}, children, style, className, ...others } = props
  return (
    <View
      className={clsx(bem(), className)}
      style={computedStyle([ mapThemeVarsToCSSVars(themeVars), style ])}
      {...others}
    >
      {children}
    </View>
  )
}

ConfigProvider.displayName = 'ConfigProvider'
export default ConfigProvider
