import type { StandardProps } from '@tarojs/components'

export interface SkuAction  {
  text?: string;
  color?: string;
  onClick?: () => void;
  show?: boolean;
}

export type Spec = {
  name: string;
  imgUrl?: string;
}
export type SpuSpec = {
  id: string;
  name: string;
  values: Spec[]
}
export type SpuProp = {
  id: string;
  name: string;
  multiple?: boolean;
  values: Spec[],
  skuKeyStr: string
}
export type Sku = {
  tree: SpuSpec[]
  list: Record<any, any>[]
}
export type Goods = {
  imgUrl: string,
  price: number,
  stock: number,
}
export interface SkuProps extends StandardProps {
  /**
   * 可见
   */
  visible?: boolean;
  /**
   * sku数据
   */
  sku: Sku;
  /**
   * 商品默认数据
   */
  goods: Goods;

  /**
   * 库存阀值 超过会标红
   * @default 50
   */
  stockThreshold?: number;
  /**
   * 加入购物车属性
   */
  cart?: SkuAction;
  /**
   * 购买属性
   */
  buy?: SkuAction;
  /**
   * 隐藏库存
   */
  hideStock?: boolean;
  /**
   * 起购数
   */
  limit?: number;
  /**
   * 限购数
   */
  quota?: number;
  /**
   * 属性
   */
  properties?: SpuProp[];
  /**
   * 取消事件
   */
  onCancel?: () => void;
  /**
   * 提交事件
   * @param type 类型
   * @param value 选中的值
   */
  onSubmit?: (type: string, value: any) => void;
}

export interface SkuItemProps extends StandardProps {
  skuKeyStr?: string;
  skuValue?: any;
  selectedSku?: Record<string, any>;
  skuList?: any [];
  multiple?: boolean;
  onSelect?: (val: any) => void;
}

export interface SkuPropProps extends StandardProps {
  skuKeyStr?: string;
  skuValue?: any;
  selectedProp?: Record<string, any>;
  multiple?: boolean;
  onSelect?: (val: any) => void;
}

export interface SkuHeaderProps extends SkuProps{
  selectedSku: any;
  selectedSkuComb: any;
  stockNum: number;
  selectedTip?: string
}
export type SkuBodyProps = StandardProps

export interface SkuStepperProps {
  onChange?: (val: number | string, detail?: {
    name: string;
  }) => void;
  limit: number;
  stockNum: number;
  quota: number;
  value?: number;
}

export interface SkuActionProps {
  /**
   * 购买属性
   */
  buy: SkuAction;
  /**
   * 购物车属性
   */
  cart: SkuAction;

}
export interface SkuRowProps{
  /**
   * 名称
   */
  name: string;
  /**
   * 多选标志
   */
  multiple?: boolean;
}
