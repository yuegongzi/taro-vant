import {  isDef } from './type'
import { isValidElement } from 'react'

export function assembly(event: any, value: any) {
  return Object.assign(event, {
    detail: {
      value,
    },
  })
}

export function ele(children: any, Node: any) {
  if (! isDef(children)) {
    return null
  }
  if (isValidElement(children)) {
    return children
  }
  return Node
}
