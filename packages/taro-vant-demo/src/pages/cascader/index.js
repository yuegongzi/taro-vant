import { Field, Popup, Cascader } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import { useState } from 'react'

const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          {
            text: '上城区',
            value: '330102',
          },
          {
            text: '下城区',
            value: '330103',
          },
          {
            text: '江干区',
            value: '330104',
          },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          {
            text: '海曙区',
            value: '330203',
          },
          {
            text: '江北区',
            value: '330205',
          },
          {
            text: '北仑区',
            value: '330206',
          },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          {
            text: '鹿城区',
            value: '330302',
          },
          {
            text: '龙湾区',
            value: '330303',
          },
          {
            text: '瓯海区',
            value: '330304',
          },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          {
            text: '玄武区',
            value: '320102',
          },
          {
            text: '秦淮区',
            value: '320104',
          },
          {
            text: '建邺区',
            value: '320105',
          },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          {
            text: '锡山区',
            value: '320205',
          },
          {
            text: '惠山区',
            value: '320206',
          },
          {
            text: '滨湖区',
            value: '320211',
          },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          {
            text: '鼓楼区',
            value: '320302',
          },
          {
            text: '云龙区',
            value: '320303',
          },
          {
            text: '贾汪区',
            value: '320305',
          },
        ],
      },
    ],
  },
]
export default () => {
  const [ value, setValue ] = useState(0)

  return (
    <DemoPage title='Cascader 级联选择'>
      <DemoBlock title='默认用法'>
        <Field isLink onClickInput={() => setValue(1)} />
        <Popup show={value === 1} position='bottom'>
          <Cascader
            title='请选择所在地区'
            options={options}
            onClose={() => setValue(0)}
            onFinish={(e) => {
              console.log(e)
            }}
          />
        </Popup>
      </DemoBlock>
    </DemoPage>
  )
}
