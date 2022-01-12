import Card from './ContactCard'
import Item from './Contact'

const Contact = Object.assign(Item, { Card })
export default Contact
export type { ContactCardProps, ContactProps } from './PropsType'
