import { useState } from 'react'
import { Cell, Image, List, Tabs } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import './index.scss'

const Tab = Tabs.Tab
const sleep = (t) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
const mockRequest = async (start)=>{
  await sleep(2000)
  const data = []
  for(let i =1 ; i <= 20;i++){
      data.push(start+i)
  }
  return data;
}

export default ()=>{
  const [ list0,setList0 ] = useState([])
  const [ list1,setList1 ] = useState([])
  const [ err,setErr ] = useState(true)
  const onBasicLoad = async (refresh)=>{
      const response = await mockRequest(refresh ? 0 : list0.length)
      setList0(pre=>{
        return  refresh ? response : [ ...pre,...response ]
      })
  }

  const onErrorLoad = async (refresh)=>{
    const response = await mockRequest(refresh ? 0 : list1.length)
    if(list1.length > 20 && err){
      setErr(false)
      throw  new Error('服务器错误')
    }
    setList1(pre=>{
      return  refresh ? response : [ ...pre,...response ]
    })
  }

  return (
    <DemoPage  title='List 长列表'>
      <Tabs animated>
        <Tab title='基础用法' key='basics'>
          <List onRefresh={()=>onBasicLoad(true)}
                onLoad={onBasicLoad} finished={list0.length > 80}>
            {list0.map((item,index)=>(
              <Cell title='数据列表' key={index} value={item}/>
            ))}
          </List>
        </Tab>
        <Tab title='错误提示' key='error' >
          <List onRefresh={() => onErrorLoad(true)}
                headHeight='80'
                onLoad={onErrorLoad} finished={list1.length > 100}
                header={({ status, distance }) => {
                  if (status === 'pulling') {
                    return (
                      <Image
                        className='doge'
                        src='https://img01.yzcdn.cn/vant/doge.png'
                        style={{ transform: `scale(${distance / 80})` }}
                      />
                    )
                  }
                  if (status === 'loosing') {
                    return (
                      <Image
                        className='doge'
                        src='https://img01.yzcdn.cn/vant/doge.png'
                      />
                    )
                  }
                  if (status === 'loading') {
                    return (
                      <Image
                        className='doge'
                        src='https://img01.yzcdn.cn/vant/doge-fire.jpg'
                      />
                    )
                  }
                }}
          >
            {list1.map((item, index) => (
              <Cell title='数据列表' key={index} value={item} />
            ))}
          </List>
        </Tab>
        <Tab key='search' title='无数据' >
          <List empty refresherEnabled={false}/>
        </Tab>
      </Tabs>
    </DemoPage>
  )
}
