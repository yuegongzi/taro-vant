export function isString(args: unknown): boolean {
  return toString.call(args) === '[object String]'
}

export function isArray(args: unknown): boolean {
  return toString.call(args) === '[object Array]'
}

export function isBoolean(args: unknown): boolean {
  return toString.call(args) === '[object Boolean]'
}

export function isUndefined(args: unknown): boolean {
  return toString.call(args) === '[object Undefined]'
}

export function isNull(args: unknown): boolean {
  return toString.call(args) === '[object Null]'
}

export function isNumber(args: unknown): boolean {
  return toString.call(args) === '[object Number]'
}

export function isNumberOrString(args: unknown) {
  return isNumber(args) || isString(args)
}

export function isNumeric(val: string): boolean {
  return /^\d+(\.\d+)?$/.test(val)
}

export function isObject(args: unknown): boolean {
  return toString.call(args) === '[object Object]'
}

export function isEmptyObject(args: any): boolean {
  if (!isObject(args)) {
    return false
  }

  for (const prop in args) {
    if (!isUndefined(args[prop])) {
      return false
    }
  }

  return true
}
export function isEmpty(args: any): boolean {
  if (isDef(args) && isObject(args)) {
    return JSON.stringify(args) === '{}'
  }
  return true
}

export function isFunction(args: unknown): boolean {
  return toString.call(args) === '[object Function]'
}

export function isSymbol(args: unknown): boolean {
  return toString.call(args) === '[object Symbol]'
}

export function isPlainObject(val: any) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export function isPromise(val: any) {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isDef(value: any) {
  return value !== undefined && value !== null
}

export function isObj(x: any) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i

export function isImageUrl(url: any) {
  return IMAGE_REGEXP.test(url)
}

export function isVideoUrl(url: any) {
  return VIDEO_REGEXP.test(url)
}

const None = [ undefined, null, 'undefined', '', 'null', ' ' ]
export const isAnyBlank = (...args: any) => {
  for (const i of args) {
    if (None.includes(i)) {
      return true
    }
  }
  return false
}
