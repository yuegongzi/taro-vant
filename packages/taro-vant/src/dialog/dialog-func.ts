import type { DialogProps } from './PropsType'
import { off, on, trigger } from './events'
import { ZIndex } from '../utils'

const _defaultOptions = {
  visible: false,
  title: '',
  width: null,
  theme: 'default',
  message: '',
  zIndex: ZIndex.Dialog,
  overlay: true,
  className: '',
  asyncClose: false,
  transition: 'scale',
  messageAlign: '',
  overlayStyle: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: '',
}
export default {
  defaultOptions: { ..._defaultOptions },
  alert(options: DialogProps) {
    const p = new Promise<void>((resolve, reject) => {
      const confirmFn = () => {
        off('confirm', confirmFn)
        resolve()
      }

      const cancelFn = () => {
        off('cancel', cancelFn)
        reject()
      }
      on('confirm', confirmFn)
      on('cancel', cancelFn)
    })

    trigger('alert', {
      ...this.defaultOptions,
      ...options,
      // ...innerOptions,
      visible: true,
    })
    return p
  },
  confirm(options: DialogProps) {
    return this.alert({
      ...options,
      showCancelButton: true,
    })
  },
  close() {
    off('confirm')
    off('cancel')
    trigger('close')
  },
  stopLoading() {
    trigger('stopLoading')
  },
  setDefaultOptions(options: DialogProps) {
    ;(this as any).defaultOptions = {
      ...this.defaultOptions,
      ...options,
    }
  },
  resetDefaultOptions() {
    ;(this as any).defaultOptions = { ..._defaultOptions }
  },
}
