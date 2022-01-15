import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'

type ImageFit = 'contain' | 'cover' | 'fill' | 'widthFix' | 'heightFix' | 'none'
export interface ImageProps extends StandardProps {
  src: string
  round?: boolean
  width?: number
  height?: number
  radius?: number
  lazyLoad?: boolean
  showMenuByLongpress?: boolean
  fit?: ImageFit
  showError?: boolean
  showLoading?: boolean
  loadingIcon?: ReactNode | string
  errorIcon?: ReactNode | string
}
