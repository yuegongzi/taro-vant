
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
