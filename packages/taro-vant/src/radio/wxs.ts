import { addUnit, computedStyle } from '../utils'

function iconStyle(data: any) {
  const styles: any = {
    'font-size': addUnit(data.iconSize),
  }

  if (
    data.checkedColor &&
    !(data.disabled || data.parentDisabled) &&
    data.value === data.name
  ) {
    styles['border-color'] = data.checkedColor
    styles['background-color'] = data.checkedColor
  }

  return computedStyle(styles)
}

export { iconStyle }
