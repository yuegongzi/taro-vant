import { computedStyle, keys } from '../utils'

function kebabCase(word: any) {
  return word.replace(/[A-Z]/g, function(i: any) {
    return '-' + i
  })?.toLowerCase().replace(/^-/, '')
}

function mapThemeVarsToCSSVars(themeVars: any) {
  const cssVars: any = {}
  keys(themeVars).forEach(function (key: any) {
    const cssVarsKey = '--' + kebabCase(key)
    cssVars[cssVarsKey] = themeVars[key]
  })

  return computedStyle(cssVars)
}

export { kebabCase, mapThemeVarsToCSSVars }
