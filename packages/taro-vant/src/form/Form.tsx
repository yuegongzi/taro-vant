import './style/index.less'
import React, { forwardRef, memo, useImperativeHandle } from 'react'
import Form, { useForm } from 'rc-field-form'
import type { FormProps, IFormInstanceAPI } from './PropsType'
import FormContext from './formContext'
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
    ...options
  } = props
  const _onFinish = (values: any) => {
    onFinish?.(values)
  }

  useImperativeHandle(ref, () => ({ form }))
  return (<FormContext.Provider value={{ labelWidth,layout }}>
      {/*@ts-ignore*/}
      <Form
        {...options}
        initialValues={initialValues}
        component={false}
        form={form}
        validateMessages={message}
        onFinish={_onFinish}
        className={clsx(bem(), className)}>
        {children}
      </Form>
    </FormContext.Provider>
  )
}

export default memo(forwardRef(Index))
