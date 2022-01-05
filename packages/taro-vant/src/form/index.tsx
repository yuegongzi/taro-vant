import Form from './Form'
import FormItem from './FormItem'

const FormNameSpace = Object.assign(Form, { Item: FormItem })
export default FormNameSpace
export { FormNameSpace as Form }
export type { FormProps, FormItemProps } from './PropsType'
