import type { FormItemProps } from './PropsType'
import FormContext from './formContext'
import React from 'react'
import { Field } from 'rc-field-form'
import FormItemLayout from './component/layout'
import { COMPONENT_TYPE_KEY, isAnyBlank } from '../utils'
import { FIELD_KEY } from '../field/Field'
import { SWITCH_KEY } from '../switch/Switch'

function FormItem(props: FormItemProps) {
  const {
    name, rules, labelClass, label, layout, labelWidth, valuePropName ,
    required = false, hide = false, customField, children,
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
  const getValuePropsName = (componentType: any) => {
    if (!isAnyBlank(valuePropName)) {
      return valuePropName
    }
    switch (componentType) {
      case SWITCH_KEY:
        return 'checked'
    }
    return 'value'
  }

  return (<FormContext.Consumer>
      {
        (form) => {
          // @ts-ignore
          const componentType = (children as { type: unknown }).type?.[COMPONENT_TYPE_KEY]
          const isFieldChildren = componentType === FIELD_KEY || customField
          const _labelWidth = labelWidth || form.labelWidth
          const _layout = layout || form.layout
          const _valuePropName = getValuePropsName(componentType)
          return (
            <Field name={name}
                   valuePropName={_valuePropName}
                   getValueFromEvent={value => {
                     // console.log('value',value)
                     return value.detail.value
                   }}
                   rules={r}>
              {(control, meta) => {
                const message = meta.errors?.[0]
                const childProps = { ...children.props, onInput: control['onChange'], ...control }
                if (isFieldChildren) {
                  const fieldProps = { ...childProps, label, required, errorMessage: message, titleWidth: _labelWidth }
                  return React.cloneElement(children, fieldProps)
                }
                const childNode = React.cloneElement(children, childProps)
                return (
                  <FormItemLayout
                    layout={_layout}
                    labelClass={labelClass}
                    message={message}
                    required={required}
                    labelWidth={_labelWidth}
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

export default FormItem
