import type { ComponentClass } from 'react'
import type { ButtonProps } from '../button/PropsType'

export interface MiniLoginButtonProps extends ButtonProps {
  onFail: (error: Taro.General.CallbackResult) => void
  onGetLoginCode: (loginInfo: Taro.login.SuccessCallbackResult) => void
}

declare const MiniLoginButton: ComponentClass<MiniLoginButtonProps>

export { MiniLoginButton }
export default MiniLoginButton
