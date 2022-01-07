import { isArray } from './type'


const REGEXP = new RegExp('{|}|"', 'g')

export function keys(obj: any) {
  return JSON.stringify(obj).replace(REGEXP, '').split(',').map(function(item) {
    return item.split(':')[0]
  })
}

function kebabCase(word: any) {
  return word.replace(new RegExp('[A-Z]', 'g'), function(i: any) {
    return '-' + i
  })?.toLowerCase()
}

export function computedStyle(styles: any): string {
  if (isArray(styles)) {
    return styles.filter(function(item: any) {
      return item != null && item !== ''
    }).map(function(item: any) {
      return computedStyle(item)
    }).join(';')
  }

  if (toString.call(styles) === '[object Object]') {
    return keys(styles).filter(function(key: any) {
      return styles[key] != null && styles[key] !== ''
    }).map(function(key: any) {
      return [ kebabCase(key), [ styles[key] ] ].join(':')
    }).join(';')
  }

  return styles
}

function objectToString(style: Record<string, any> | string): string {
  if (style && typeof style === 'object') {
    let styleStr = ''
    Object.keys(style).forEach((key) => {
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1')?.toLowerCase()
      styleStr += `${lowerCaseKey}:${style[key]};`
    })
    return styleStr
  } else if (style && typeof style === 'string') {
    return style
  }
  return ''
}

export function mergeStyle(
  style1: Record<string, any> | string,
  style2: Record<string, any> | string,
): Record<string, any> | string {
  if (
    style1 &&
    typeof style1 === 'object' &&
    style2 &&
    typeof style2 === 'object'
  ) {
    return Object.assign({}, style1, style2)
  }
  return objectToString(style1) + objectToString(style2)
}
