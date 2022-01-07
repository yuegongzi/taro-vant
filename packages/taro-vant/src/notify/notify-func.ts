import type { NotifyProps } from './PropsType'
import { trigger } from './events'

const notify = function(options: NotifyProps | string) {
  trigger('notify_show', options)
}

notify.clear = function(options?: NotifyProps) {
  trigger('notify_clear', options)
}

export default notify
