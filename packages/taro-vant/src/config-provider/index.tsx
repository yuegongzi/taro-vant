import { View } from '@tarojs/components'
import type { ConfigProviderProps } from './PropsType'
import * as utils from '../wxs/utils'
import * as computed from './wxs'

export function ConfigProvider(props: ConfigProviderProps) {
  const { themeVars = {}, children, style, className, ...others } = props
  return (
    <View
      className={`van-config-provider ${className || ''}`}
      style={utils.style([ computed.mapThemeVarsToCSSVars(themeVars), style ])}
      {...others}
    >
      {children}
    </View>
  )
}

export default ConfigProvider
