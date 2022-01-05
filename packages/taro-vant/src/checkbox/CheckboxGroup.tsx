import './style/index.less';
import { View } from '@tarojs/components'
import type { CheckboxGroupProps } from './PropsType'
import CheckboxGroupContext from './context'
import { createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('checkbox')

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

  return (
    <CheckboxGroupContext.Provider
      value={{ value, max, disabled, direction, onChange }}
    >
      <View
        className={clsx(bem({
          horizontal: direction === 'horizontal',
        }),className)}
        style={style}
        {...others}
      >
        {children}
      </View>
    </CheckboxGroupContext.Provider>
  )
}
export default CheckboxGroup
