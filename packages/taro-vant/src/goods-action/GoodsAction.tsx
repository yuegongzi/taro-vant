
import { cloneElement, isValidElement } from 'react'
import { View } from '@tarojs/components'
import toArray from 'rc-util/lib/Children/toArray'
import type { GoodsActionButtonProps, GoodsActionProps } from './PropsType'
import { createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('goods-action')

function parseTabList(children: React.ReactNode): any[] {
  return toArray(children).map((node: React.ReactElement<GoodsActionButtonProps>) => {
    if (isValidElement(node)) {
      const key = node.key !== undefined ? String(node.key) : undefined
      return {
        key,
        ...node.props,
        node,
      }
    }

    return null
  }).filter((tab) => tab)
}

function GoodsAction(props: GoodsActionProps) {
  const {
    safeAreaInsetBottom = true,
    style,
    children,
    className,
    ...others
  } = props

  const tabs = parseTabList(children)
  const newChildren: any = tabs.map((tab, index) => {
    const isGAB = tab.node?.type?.displayName === 'GoodsActionButton'
    const preIsGAB =
      tabs[index - 1]?.node?.type?.displayName === 'GoodsActionButton'
    const nextIsGAB =
      tabs[index + 1]?.node?.type?.displayName === 'GoodsActionButton'
    return cloneElement(tab.node, {
      key: index,
      index,
      isFirst: !preIsGAB && isGAB,
      isLast: !nextIsGAB && isGAB,
    })
  })

  return (
    <View
      className={clsx(bem({ safe: safeAreaInsetBottom }), className)}
      style={style}
      {...others}
    >
      {newChildren}
    </View>
  )
}

GoodsAction.displayName = 'GoodsAction'
export default GoodsAction
