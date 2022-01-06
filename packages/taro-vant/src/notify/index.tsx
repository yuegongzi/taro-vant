import Notify from './Notify'
import notify from './notify-func'

const NotifyNamespace = Object.assign(Notify,{
  show:notify,clear:notify.clear
})
export default NotifyNamespace
export { NotifyNamespace as Notify }
export type { NotifyProps } from './PropsType'
