import type { ReactNode } from 'react'
import type { StandardProps } from '@tarojs/components'
import type { FormInstance, NamePath, Rule, Store } from 'rc-field-form/es/interface'

/**
 * @title FormProps
 */
export interface FormProps extends StandardProps {
  /**
   * @description 初始化表单仓库值
   */
  initialValues?: Store
  /**
   * @description 第一级必须是FormItem组件
   */
  children: ReactNode
  /**
   * @description 类名
   */
  className?: string
  /**
   * @description 表单提交触发，配合button.formType = submit
   */
  onFinish?: (values: any) => void
  /**
   * @description 垂直 ｜ 水平
   * @default horizontal
   */
  layout?: 'vertical' | 'horizontal'
  /**
   * @description 标签宽度
   * @default 5.2em
   */
  labelWidth?: string;
  /**
   * 是否展示圆角风格
   * @default false
   */
  inset?: boolean;
  /**
   * 是否显示外边框
   * @default true
   */
  border?: boolean
}

/**
 * @title FormItemProps
 */
export interface FormItemProps extends StandardProps {
  /**
   * @description 对应表单字段名
   */
  name: NamePath
  /**
   * @description 第一级操作表单组件
   */
  children: any
  /**
   * @description 表单label
   */
  label: string
  /**
   * @description 垂直 ｜ 水平
   * @default horizontal
   */
  layout?: 'vertical' | 'horizontal'
  /**
   * @description 是否必填
   * @default false
   */
  required?: boolean
  /**
   * @description 验证表单触发方法名
   * @default onChange
   */
  validateTrigger?: string
  /**
   * @description label的外层className
   */
  labelClass?: string
  /**
   * @description formItem最外层className
   */
  className?: string
  /**
   * @description 自定义渲染右边内容
   */
  right?: ReactNode

  /**
   * @description 标签宽度
   * @default 5.2em
   */
  labelWidth?: string;
  /**
   * @description 表单交互触发方法
   * @default onChange
   */
  trigger?: string
  /**
   * @description 表单控制展示的具体值的字段名
   * @default value
   */
  valuePropName?: string
  /**
   * @description 根据表单交互回掉函数（时间）参数的重新定义
   * @default value
   */
  valueFormat?: (
    value: any,
    name: string,
    IFormInstance: IFormInstanceAPI,
  ) => any
  /**
   * @description 正则校验值，或者自定义校验后call回掉函数返回错误信息
   */
  rules?: Rule[],
  /**
   * @description 隐藏该项
   */
  hide?: boolean;
  /**
   * 自定义表单项
   */
  customField?: boolean;

}

/**
 * @title IFormInstance
 * @description 通过ref获取到的form的实例
 */
export type IFormInstanceAPI = {
  form?: FormInstance
}

