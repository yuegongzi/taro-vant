import type { ComponentClass } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { ScrollViewProps } from '@tarojs/components/types/ScrollView'

export type PullRefreshStatus =
  | 'normal'
  | 'loading'
  | 'loosing'
  | 'pulling'
  | 'success'
interface PullRefreshProps {
  headHeight?: number | string
  successText?: string
  pullingText?: string
  loosingText?: string
  loadingText?: string | React.ReactNode
  pullDistance?: number | string
  successDuration?: number | string
  animationDuration?: number | string
  header?: (params: {
    status: PullRefreshStatus
    distance: number
  }) => React.ReactNode | void
}

export interface ListProps
  extends StandardProps,
    PullRefreshProps,
    Omit<ScrollViewProps, 'onScrollToUpper' | 'onScrollToLower'> {
  offset?: number
  finished?: boolean
  empty?: boolean
  errorText?: string | React.ReactNode
  finishedText?: string | React.ReactNode
  emptyDescription?: string
  emptyImage?: 'error' | 'search' | 'default' | 'network' | string
  onLoad?: () => Promise<void>
  onRefresh?: () => Promise<void>
}
declare const List: ComponentClass<ListProps>
export { List }
