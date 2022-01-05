import { addUnit,computedStyle } from '../utils'

export function iconStyle(data: any) {
  const styles: any = {
    'font-size': addUnit(data.iconSize),
  }

  if (
    data.checkedColor &&
    data.value &&
    !data.disabled &&
    !data.parentDisabled
  ) {
    styles['border-color'] = data.checkedColor
    styles['background-color'] = data.checkedColor
  }

  return computedStyle(styles)
}
