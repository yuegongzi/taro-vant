import DropdownMenu from './DropdownMenu'
import DropdownItem from './DropdownItem'

const DropdownMenuNameSpace = Object.assign(DropdownMenu, {
  Item: DropdownItem,
})
export { DropdownMenuNameSpace as DropdownMenu }
export default DropdownMenuNameSpace
export type { DropdownMenuProps, DropdownItemProps } from './PropsType'
