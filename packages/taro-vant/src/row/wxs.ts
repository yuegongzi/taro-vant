import { addUnit,computedStyle } from '../utils'


function rootStyle(data: any) {
  if (!data.gutter) {
    return ''
  }

  return computedStyle({
    'margin-right': addUnit(-data.gutter / 2),
    'margin-left': addUnit(-data.gutter / 2),
  })
}

export { rootStyle }
