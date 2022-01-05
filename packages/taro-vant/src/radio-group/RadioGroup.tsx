import './style/index.less';
import { View } from '@tarojs/components'

import * as utils from '../wxs/utils'
import type { RadioGroupProps } from './PropsType'
import RadioGroupContext from './context'
import { assembly } from '../utils'

export function RadioGroup(props: RadioGroupProps) {
  const {
    value = null,
    direction = 'vertical',
    disabled = false,
    onChange,
    children,
    style,
    className,
    ...others
  } = props

  const _onChange = (e: any) => {
    onChange?.(assembly(e,e.detail))
  }

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        direction,
        disabled,
        onChange: _onChange,
      }}
    >
      <View
        className={
          utils.bem('radio-group', [ direction ]) + ` ${className || ''}`
        }
        style={style}
        {...others}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
}
export default RadioGroup
