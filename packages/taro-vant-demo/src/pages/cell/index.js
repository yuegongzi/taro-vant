import { Component } from 'react'
import { View } from '@tarojs/components'
import { Tag, Icon, Cell } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'

import DemoBlock from '../../components/demo-block/index'
import './index.scss'


export default class Index extends Component {
  constructor() {
    super()
  }
  state = {}

  render() {
    return (
      <DemoPage title='Cell 单元格'>
        <>
          <DemoBlock title='基础用法'>
            <Cell.Group>
              <Cell title='单元格' value='内容' />
              <Cell
                title='单元格'
                value='内容'
                label='描述信息'
                border={false}
               />
            </Cell.Group>
          </DemoBlock>
          <DemoBlock title='卡片风格'>
            <Cell.Group inset>
              <Cell title='单元格' value='内容' />
              <Cell title='单元格' value='内容' label='描述信息' />
            </Cell.Group>
          </DemoBlock>
          <DemoBlock title='单元格大小'>
            <Cell.Group>
              <Cell title='单元格' value='内容' size='large' />
              <Cell
                title='单元格'
                value='内容'
                size='large'
                border={false}
                renderLabel={
                  <>
                    <View>描述信息</View>
                  </>
                }
               />
            </Cell.Group>
          </DemoBlock>
          <DemoBlock title='展示图标'>
            <Cell
              title='单元格'
              value='内容'
              icon='location-o'
              border={false}
             />
          </DemoBlock>
          <DemoBlock title='展示箭头'>
            <Cell title='单元格' isLink />
            <Cell title='单元格' value='内容' isLink />
            <Cell
              title='单元格'
              isLink
              arrowDirection='down'
              value='内容'
              border={false}
             />
          </DemoBlock>
          <DemoBlock title='页面跳转'>
            <Cell title='单元格' isLink url='/pages/dashboard/index' />
            <Cell
              title='单元格'
              isLink
              url='/pages/dashboard/index'
              linkType='redirectTo'
             />
          </DemoBlock>
          <DemoBlock title='分组标题'>
            <Cell.Group title='分组 1'>
              <Cell title='单元格' value='内容' />
            </Cell.Group>
            <Cell.Group title='分组 2'>
              <Cell title='单元格' value='内容' />
            </Cell.Group>
          </DemoBlock>
          <DemoBlock title='使用插槽'>
            <Cell
              value='内容'
              icon='shop-o'
              isLink
              renderTitle={
                <>
                  <View>
                    <View className='title'>单元格</View>
                    <Tag type='danger'>标签</Tag>
                  </View>
                </>
              }
             />
            <Cell
              title='单元格'
              border={false}
              renderRightIcon={
                <>
                  <Icon name='search' />
                </>
              }
             />
          </DemoBlock>
          <DemoBlock title='垂直居中'>
            <Cell center title='单元格' value='内容' label='描述信息' />
          </DemoBlock>
        </>
      </DemoPage>
    )
  }
}
