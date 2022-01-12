import Address from './Address'
import List from './AddressList'
import type { AddressListProps } from './PropsType'

const AddressNameSpace = Object.assign(Address, { List })
export const AddressList = (props: AddressListProps) => props
export default AddressNameSpace
export type { AddressProps, AddressListProps } from './PropsType'
