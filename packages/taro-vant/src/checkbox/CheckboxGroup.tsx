import { View } from '@tarojs/components'
import type { CheckboxGroupProps } from './PropsType'
import CheckboxGroupContext from './context'
import { assembly, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('checkbox-group')

function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    max,
    value = [],
    disabled = false,
    direction = 'vertical',
    onChange,
    style,
    className,
    children,
    ...others
  } = props
  const _onChange = (e: any) => {
    onChange?.(assembly(e, e.detail))
  }
  return (
    <CheckboxGroupContext.Provider
      value={{ value, max, disabled, direction, onChange: _onChange }}
    >
      <View
        className={clsx(
          bem({
            horizontal: direction === 'horizontal',
          }),
          className,
        )}
        style={style}
        {...others}
      >
        {children}
      </View>
    </CheckboxGroupContext.Provider>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
export default CheckboxGroup
