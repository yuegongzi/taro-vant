import NavBar from './NavBar'
import MiniNavBar from './MiniNavBar'

const NavBarNamespace = Object.assign(NavBar, { MiniNavBar })
export default NavBarNamespace
export { NavBarNamespace as NavBar }
export type { NavBarProps, MiniNavBarProps } from './PropsType'
