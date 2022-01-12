import { Contact, Radio } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import { useState } from 'react'

const data = {
  name: '张三',
  tel: '13000000000',
}
const list = Array.from(new Array(10)).map((_val, i) => ({
  ...data,
  id: i,
  tel: `130123420${i}`,
}))

export default () => {
  const [ value, setValue ] = useState()

  return (
    <DemoPage title='Contact 联系人卡片'>
      <DemoBlock title='基础用法'>
        <Contact.Card />
      </DemoBlock>
      <DemoBlock title='编辑联系人'>
        <Contact.Card type='edit' {...data} onClick={(e) => console.log(e)} />
      </DemoBlock>
      <DemoBlock title='不可编辑'>
        <Contact.Card type='edit' disabled {...data} />
      </DemoBlock>
      <DemoBlock title='联系人列表'>
        <Radio.Group value={value}>
          {list.map((item, index) => (
            <Contact
              data={item}
              key={index}
              onClick={() => setValue(item.id)}
              telField='tel'
            />
          ))}
        </Radio.Group>
      </DemoBlock>
    </DemoPage>
  )
}
