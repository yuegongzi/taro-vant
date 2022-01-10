
import RcForm , { useForm } from 'rc-field-form'
import type { FormProps } from './PropsType'
import FormContext from './formContext'
import Cell from '../cell'
import Button from '../button'
import message from './message'
import { createNamespace } from '../utils'
import clsx from 'clsx'
import { View } from '@tarojs/components'
import { useState } from 'react'

const [ bem ] = createNamespace('form')

function Form(props: FormProps): JSX.Element {
  const {
    initialValues = {},
    className,
    onFinish,
    children,
    labelWidth = '5.2em',
    inset = false,
    border = true,
    form,
    submitter = true,
    buttonProps,
    ...options
  } = props
  const [ loading,setLoading ] = useState<boolean>(false)
  const _onFinish = async (values: any) => {
    setLoading(true)
    await onFinish(values)
    setLoading(false)
  }

  return (<FormContext.Provider value={{ labelWidth }}>
      {/*@ts-ignore*/}
      <RcForm
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
      </RcForm>
      {submitter && (
        <View className={clsx(bem('submitter',{ inset }))}>
          <Button type='primary'
                  loading={loading}
                  disabled={loading}
                  onClick={()=>form?.submit()}
                  round block {...buttonProps}>提 交</Button>
        </View>
      )}
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'
Form.useForm = useForm
export default Form
