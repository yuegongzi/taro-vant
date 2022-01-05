import { createContext } from 'react'
import type { IFormInstanceAPI } from '.././PropsType'

const FormContext = createContext<IFormInstanceAPI>(null as any)

export default FormContext
