import { useCallback, useEffect, useState } from 'react'
import { useForm as useFieldForm } from 'rc-field-form'
import { isEmptyObject } from '../utils'

export type FormOption = {
  /**
   * 初始化值
   */
  value?: any;
  /**
   * 同步变化
   */
  sync?: boolean;
};

export function useForm(option: FormOption = {}) {
  const { value, sync } = option
  const [ form ] = useFieldForm()
  const [ once, setOnce ] = useState(false)
  const set = useCallback((values: any) => {
    form?.setFieldsValue(values)
  }, [])
  const get = useCallback((name: string) => {
    return form?.getFieldValue(name)
  }, [])

  const submit = useCallback(() => {
    form?.submit()
  }, [])

  const clear = useCallback(() => {
    form?.resetFields()
  }, [])

  const getAll = useCallback(() => {
    return form?.getFieldsValue()
  }, [])
  useEffect(() => {
    if (!isEmptyObject(value)) {
      if (sync) {
        //同步监听
        set(value)
      } else {
        //只进行一次初始化,即数据不为空的情况
        if (!once) {
          set(value)
          setOnce(true)
        }
      }
    }
  }, [ value ])

  return [
    form,
    {
      set,
      get,
      submit,
      clear,
      getAll,
    },
  ]
}
