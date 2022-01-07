import './style/index.less'
import React, { forwardRef, memo, useImperativeHandle } from 'react'
import Form, { useForm } from 'rc-field-form'
import type { FormProps, IFormInstanceAPI } from './PropsType'
import FormContext from './formContext'
import Cell from '../cell'
import message from './message'
import { createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('form')

function Index(props: FormProps, ref: React.ForwardedRef<IFormInstanceAPI>): JSX.Element {
  const [ form ] = useForm()
  const {
    initialValues = {},
    className,
    onFinish,
    children,
    labelWidth = '5.2em',
    layout,
    inset = false,
    border = true,
    ...options
  } = props
  const _onFinish = (values: any) => {
    onFinish?.(values)
  }

  useImperativeHandle(ref, () => ({ form }))
  return (<FormContext.Provider value={{ labelWidth, layout }}>
      {/*@ts-ignore*/}
      <Form
        {...options}
        initialValues={initialValues}
        component={false}
        form={form}
        validateMessages={message}
        onFinish={_onFinish}
        className={clsx(bem(), className)}>
        <Cell.Group inset={inset} border={border}>
          {children}
        </Cell.Group>

      </Form>
    </FormContext.Provider>
  )
}
const FormIndex = memo(forwardRef(Index));

FormIndex.displayName = 'Form'

export default FormIndex
