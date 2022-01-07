import Checkbox from './Checkbox'
import CheckboxGroup from './CheckboxGroup'

const CheckBoxNameSpace = Object.assign(Checkbox, { Group: CheckboxGroup })
export default CheckBoxNameSpace
export { CheckBoxNameSpace as Checkbox }
export type { CheckboxProps, CheckboxGroupProps } from './PropsType'
