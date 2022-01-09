import type { FormItemProps } from './PropsType'
import FormContext from './formContext'
import React from 'react'
import { Field } from 'rc-field-form'
import FormItemLayout from './component/layout'
import { isAnyBlank } from '../utils'

function FormItem(props: FormItemProps) {
  const {
    name, rules,  label, labelClass, labelWidth, valuePropName,rightIcon,
    required = false, hide = false, customField, children,type,
    ...other
  } = props
  if (hide) {
    return null
  }
  const r = rules || []
  if (required) {
    r.push({
      required: true,
      message: `请填写${label}`,
    })
  }

  switch (type) {
    case 'tel':
      r.push({
        pattern: /^([1-9]{1})(\d{10})$/,
        message: '请填写合法手机号',
      });
      break;
    case 'bank':
      r.push({
        pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
        message: '请填写合法银行卡号',
      });
      break;
    case 'idcard':
      r.push({
        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: '请填写合法身份证号',
      });
      break;
    default:
      break;
  }

  if (isAnyBlank(name)) {
    console.error('formItem必须传递name参数')
    return null
  }
  const getValuePropsName = (displayName: string) => {
    if (!isAnyBlank(valuePropName)) {
      return valuePropName
    }
    switch (displayName) {
      case 'Switch':
        return 'checked'
    }
    return 'value'
  }


  return (<FormContext.Consumer>
      {
        (form) => {
          const displayName = children.type?.displayName;
          const isFieldChildren = displayName === 'Field' ||  customField
          const _labelWidth = labelWidth || form.labelWidth
          const _valuePropName = getValuePropsName(displayName)
          const placeholder = `请填写${label}`;
          return (
            <Field getValueFromEvent={value => value.detail.value}
                   {...other}
                   name={name}
                   valuePropName={_valuePropName}
                   rules={r}>
              {(control, meta) => {
                const errorMessage = meta.errors?.[0]
                const childProps = { placeholder,...children.props, onInput: control['onChange'], ...control }
                if (isFieldChildren) {
                  const fieldProps = { ...childProps, label, required, errorMessage,titleWidth: _labelWidth,rightIcon }
                  return React.cloneElement(children, fieldProps)
                }
                const childNode = React.cloneElement(children, childProps)
                return (
                  <FormItemLayout
                    errorMessage={errorMessage}
                    required={required}
                    titleWidth={_labelWidth}
                    rightIcon={rightIcon}
                    labelClass={labelClass}
                    label={label}>
                    {childNode}
                  </FormItemLayout>
                )
              }}

            </Field>

          )
        }
      }
    </FormContext.Consumer>
  )
}
FormItem.displayName = 'FormItem'
export default FormItem
