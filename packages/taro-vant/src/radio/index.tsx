import Radio from './Radio'
import RadioGroup from './RadioGroup'

const RadioNamespace = Object.assign(Radio, { Group: RadioGroup })
export default RadioNamespace
export { RadioNamespace as Radio }
export type { RadioProps, RadioGroupProps } from './PropsType'
