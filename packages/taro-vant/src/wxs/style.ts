import * as array from './array'
import * as object from './object'

function kebabCase(word: any) {
  return word.replace(new RegExp('[A-Z]', 'g'), function(i: any) {
    return '-' + i
  })?.toLowerCase()
}

export function computedStyle(styles: any): string {
  if (array.isArray(styles)) {
    return styles.
      filter(function(item: any) {
        return item != null && item !== ''
      }).
      map(function(item: any) {
        return computedStyle(item)
      }).
      join(';')
  }

  if (toString.call(styles) === '[object Object]') {
    return object.
      keys(styles).
      filter(function(key: any) {
        return styles[key] != null && styles[key] !== ''
      }).
      map(function(key: any) {
        return [ kebabCase(key), [ styles[key] ] ].join(':')
      }).
      join(';')
  }

  return styles
}

export { computedStyle as style }

