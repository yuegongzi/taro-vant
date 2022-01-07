import type { FormItemProps } from './PropsType'
import FormContext from './formContext'
import React from 'react'
import { Field } from 'rc-field-form'
import FormItemLayout from './component/layout'
import { isAnyBlank } from '../utils'

function FormItem(props: FormItemProps) {
  const {
    name, rules, labelClass, label, layout, labelWidth, valuePropName,right,
    required = false, hide = false, customField, children,trigger,validateTrigger,
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
          const _layout = layout || form.layout
          const _valuePropName = getValuePropsName(displayName)
          const placeholder = `请填写${label}`;
          return (
            <Field name={name}
                   valuePropName={_valuePropName}
                   trigger={trigger}
                   validateTrigger={validateTrigger}
                   getValueFromEvent={value => {
                     // console.log('value',value)
                     return value.detail.value
                   }}
                   rules={r}>
              {(control, meta) => {
                const errorMessage = meta.errors?.[0]
                const childProps = { placeholder,...children.props, onInput: control['onChange'], ...control }
                if (isFieldChildren) {
                  const fieldProps = { ...childProps, label, required, errorMessage,titleWidth: _labelWidth,renderButton: right }
                  return React.cloneElement(children, fieldProps)
                }
                const childNode = React.cloneElement(children, childProps)
                return (
                  <FormItemLayout
                    layout={_layout}
                    labelClass={labelClass}
                    errorMessage={errorMessage}
                    required={required}
                    titleWidth={_labelWidth}
                    right={right}
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
