import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type {
  FormInstance,
  NamePath,
  Rule,
  Store,
} from 'rc-field-form/es/interface'

export interface FormProps extends StandardProps {
  initialValues?: Store
  children: ReactNode
  className?: string
  onFinish: (values: any) => Promise<boolean>
  labelWidth?: string
  inset?: boolean
  border?: boolean
  form?: FormInstance
  submitter?: boolean
  buttonProps?: Record<any, any>
  showValidateMessage?: boolean
}
export interface FormItemProps extends StandardProps {
  name: NamePath
  children: any
  label: string
  labelClass?: string
  required?: boolean
  className?: string
  type?: 'tel' | 'bank' | 'idcard'
  labelWidth?: string
  valuePropName?: string
  rules?: Rule[]
  hide?: boolean
  tooltip?: string
  leftIcon?: string
  rightIcon?: string
  button?: ReactNode
  customField?: boolean
  noStyle?: boolean
  showValidateMessage?: boolean
}
