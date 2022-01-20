import { Address } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import { useState } from 'react'

const data = {
  recipient: '张三',
  phone: '13888888888',
  province: '浙江省',
  city: '杭州市',
  district: '西湖区',
  address: '文三路 138 号东方通信大厦 7 楼 501 室',
}

const list = Array.from(new Array(10)).map((_val, i) => ({
  ...data,
  id: i,
  defaults: i === 5,
}))
export default () => {
  const [ value, setValue ] = useState(3)

  return (
    <DemoPage title='Address 地址卡片'>
      <DemoBlock title='默认用法'>
        <Address data={data} />
      </DemoBlock>
      <DemoBlock title='展示默认'>
        <Address data={{ ...data, defaults: true }} />
      </DemoBlock>
      <DemoBlock title='点击效果'>
        <Address
          data={data}
          clickable
          edit={false}
          onClick={(e) => console.log(e)}
        />
      </DemoBlock>
      <DemoBlock title='可选'>
        <Address checked data={data} onClick={(e) => console.log(e)} />
      </DemoBlock>
      <DemoBlock title='列表'>
        <Address.List
          color='#f44336'
          onEdit={(d) => console.log(d)}
          onChange={(e) => setValue(e.detail.value.id)}
          list={list}
          value={value}
        />
      </DemoBlock>
    </DemoPage>
  )
}
