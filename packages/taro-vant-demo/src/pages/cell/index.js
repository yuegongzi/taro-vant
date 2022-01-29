import { Component } from 'react'
import { View } from '@tarojs/components'
import { Cell, Icon, Tag } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  render() {
    return (
      <DemoPage title='Cell 单元格'>
        <DemoBlock title='基础用法'>
          <Cell.Group>
            <Cell title='单元格' value='内容' />
            <Cell title='单元格' value='内容' label='描述信息' border={false} />
            <Cell value='无标题' />
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
              label={<View>描述信息</View>}
            />
          </Cell.Group>
        </DemoBlock>
        <DemoBlock title='展示图标'>
          <Cell title='单元格' value='内容' icon='location-o' border={false} />
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
        <DemoBlock title='自定义'>
          <Cell
            value='内容'
            icon='shop-o'
            isLink
            title={
              <View>
                <View className='title'>单元格</View>
                <Tag type='danger'>标签</Tag>
              </View>
            }
          />
          <Cell
            title='单元格'
            border={false}
            rightIcon={<Icon color='black' name='search' />}
          />
        </DemoBlock>
        <DemoBlock title='垂直居中'>
          <Cell center title='单元格' value='内容' label='描述信息' />
        </DemoBlock>
      </DemoPage>
    )
  }
}
