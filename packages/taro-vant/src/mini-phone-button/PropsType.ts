import type { ComponentClass } from 'react'
import type { BaseEventOrig } from '@tarojs/components/types/common.d'
import type { ButtonProps as TaroButtonProps } from '@tarojs/components'
import type { ButtonProps } from '../button/PropsType'

export interface MiniPhoneButtonProps extends ButtonProps {
  onFail: (
    error:
      | Taro.General.CallbackResult
      | BaseEventOrig<TaroButtonProps.onGetPhoneNumberEventDetail>,
  ) => void
  onGetPhone: (phoneInfo: TaroButtonProps.onGetPhoneNumberEventDetail) => void
}

declare const MiniPhoneButton: ComponentClass<MiniPhoneButtonProps>

export { MiniPhoneButton }
export default MiniPhoneButton
