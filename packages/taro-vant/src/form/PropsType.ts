import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { FormInstance, NamePath, Rule, Store } from 'rc-field-form/es/interface'


export interface FormProps extends StandardProps {

  initialValues?: Store

  children: ReactNode

  className?: string

  onFinish?: (values: any) => void

  layout?: 'vertical' | 'horizontal'

  labelWidth?: string;

  inset?: boolean;

  border?: boolean

  form?: FormInstance
}


export interface FormItemProps extends StandardProps {

  name: NamePath

  children: any

  label: string

  layout?: 'vertical' | 'horizontal'

  required?: boolean

  labelClass?: string

  className?: string

  right?: ReactNode


  labelWidth?: string;

  valuePropName?: string

  rules?: Rule[],

  hide?: boolean;

  customField?: boolean;

}
