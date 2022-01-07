import './style/index.less'
import RcForm , { useForm } from 'rc-field-form'
import type { FormProps } from './PropsType'
import FormContext from './formContext'
import Cell from '../cell'
import message from './message'
import { createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('form')

function Form(props: FormProps): JSX.Element {
  const {
    initialValues = {},
    className,
    onFinish,
    children,
    labelWidth = '5.2em',
    layout,
    inset = false,
    border = true,
    form,
    ...options
  } = props
  const _onFinish = (values: any) => {
    onFinish?.(values)
  }

  return (<FormContext.Provider value={{ labelWidth, layout }}>
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
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'
Form.useForm = useForm
export default Form
