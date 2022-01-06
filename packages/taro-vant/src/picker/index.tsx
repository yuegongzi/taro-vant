import Picker from './Picker'
import PickerColumn from './PickerColumn'

const PickerNamespace = Object.assign(Picker, { Column: PickerColumn })
export default PickerNamespace
export { PickerNamespace as Picker }
export type { PickerProps, PickerEvents, PickerChangeEvents, PickerColumnProps } from './PropsType'
