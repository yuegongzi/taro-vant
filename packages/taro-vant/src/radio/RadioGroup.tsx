import './style/index.less';
import { View } from '@tarojs/components'
import type { RadioGroupProps } from './PropsType'
import RadioGroupContext from './context'
import { assembly, createNamespace } from '../utils'
import clsx from 'clsx'
const [ bem ] = createNamespace('radio-group')

function RadioGroup(props: RadioGroupProps) {
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
      <View className={clsx(bem([ direction ]),className)}
        style={style}
        {...others}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
}
export default RadioGroup
