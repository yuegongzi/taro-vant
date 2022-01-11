import type { StandardProps } from '@tarojs/components'

export interface SkuAction {
  text?: string
  color?: string
  onClick?: () => void
  show?: boolean
}
export type Spec = {
  name: string
  imgUrl?: string
}
export type SpuSpec = {
  id: string
  name: string
  values: Spec[]
}
export type SpuProp = {
  id: string
  name: string
  multiple?: boolean
  values: Spec[]
  skuKeyStr: string
}
export type Sku = {
  tree: SpuSpec[]
  list: Record<any, any>[]
}
export type Goods = {
  imgUrl: string
  price: number
  stock: number
}
export interface SkuProps extends StandardProps {
  visible?: boolean
  sku: Sku
  goods: Goods
  stockThreshold?: number
  cart?: SkuAction
  buy?: SkuAction
  hideStock?: boolean
  limit?: number
  quota?: number
  properties?: SpuProp[]
  onCancel?: () => void
  onSubmit?: (type: string, value: any) => void
}
export interface SkuItemProps extends StandardProps {
  skuKeyStr?: string
  skuValue?: any
  selectedSku?: Record<string, any>
  skuList?: any[]
  multiple?: boolean
  onSelect?: (val: any) => void
}
export interface SkuPropProps extends StandardProps {
  skuKeyStr?: string
  skuValue?: any
  selectedProp?: Record<string, any>
  multiple?: boolean
  onSelect?: (val: any) => void
}
export interface SkuHeaderProps extends SkuProps {
  selectedSku: any
  selectedSkuComb: any
  stockNum: number
  selectedTip?: string
}
export type SkuBodyProps = StandardProps
export interface SkuStepperProps {
  onChange?: (
    val: number | string,
    detail?: {
      name: string
    },
  ) => void
  limit: number
  stockNum: number
  quota: number
  value?: number
}
export interface SkuActionProps {
  buy: SkuAction
  cart: SkuAction
}
export interface SkuRowProps {
  name: string
  multiple?: boolean
}
