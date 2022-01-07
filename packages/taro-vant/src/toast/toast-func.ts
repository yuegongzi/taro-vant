import { isObj } from '../utils'
import type { ToastProps } from './PropsType'
import { trigger } from './events'

function parseOptions(message: ToastProps | string) {
  return isObj(message) ? message : { message: message as string }
}

const createMethod = (type: string) => (options: ToastProps | string) =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Toast(Object.assign({ type }, parseOptions(options)))

const Toast = function(options: ToastProps | string) {
  trigger('toast_show', options)
}

Toast.loading = createMethod('loading')
Toast.success = createMethod('success')
Toast.fail = createMethod('fail')
Toast.clear = function(options?: ToastProps) {
  trigger('toast_clear', options)
}
Toast.setDefaultOptions = (options: ToastProps) => {
  trigger('toast_setDefaultOptions', options)
}
Toast.resetDefaultOptions = () => {
  trigger('toast_resetDefaultOptions')
}

export default Toast
