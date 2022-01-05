import Collapse from './Collapse'
import CollapseItem from './CollapseItem'

const CollapseNameSpace = Object.assign(Collapse, { Item: CollapseItem })
export default CollapseNameSpace
export { CollapseNameSpace as Collapse }
export type { CollapseProps } from './PropsType'
