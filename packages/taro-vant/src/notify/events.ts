// import { Events } from '@tarojs/taro'
//TODO 3.3.18以后已经修复 等待修复h5问题后回滚
import Events = TaroGeneral.Events

type EventNames = 'notify_clear' | 'notify_show'

const events = new Events()

function trigger(eventName: EventNames, ...args: any[]): boolean {
  return events.trigger(eventName, ...args)
}

function on(eventName: EventNames, listener: (...args: any[]) => void): Events {
  return events.on(eventName, listener)
}

function off(
  eventName: EventNames,
  listener?: ((...args: any[]) => void) | undefined,
): Events {
  return events.off(eventName, listener)
}

export { on, off, trigger }
