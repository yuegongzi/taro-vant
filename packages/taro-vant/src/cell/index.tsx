import Cell from './Cell'
import CellGroup from './CellGroup'

const CellNameSpace = Object.assign(Cell, { group: CellGroup })
export { CellNameSpace as Cell }
export default CellNameSpace
export type { CellProps, CellGroupProps } from './PropsType'
