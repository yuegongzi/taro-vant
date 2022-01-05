import type { ComponentClass } from 'react'
import type { StandardProps } from '@tarojs/components'

export interface InfoProps extends StandardProps {
  dot?: boolean
  info?: string | number
  style?: string
}

declare const Info: ComponentClass<InfoProps>

export { Info }
