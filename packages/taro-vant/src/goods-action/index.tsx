import GoodsAction from './GoodsAction'
import GoodsActionButton from './GoodsActionButton'
import GoodsActionIcon from './GoodsActionIcon'

const GoodsActionNamespace = Object.assign(GoodsAction, {
  Icon: GoodsActionIcon,
  Button: GoodsActionButton,
})
export default GoodsActionNamespace
export { GoodsActionNamespace as GoodsAction, GoodsActionButton, GoodsActionIcon }
export type { GoodsActionProps, GoodsActionIconProps, GoodsActionButtonProps } from './PropsType'
