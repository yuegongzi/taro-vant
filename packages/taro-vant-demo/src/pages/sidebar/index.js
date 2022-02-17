import { Component } from 'react'
import { Grid, Notify, Sidebar } from 'taro-vant'
import { DemoPage } from 'components'
import './index.scss'
import { Text } from '@tarojs/components'

const GridItem = Grid.Item
const SidebarItem = Sidebar.Item
export default class Index extends Component {
  onChange = (event) => {
    Notify.show({
      type: 'primary',
      message: `切换至第${event.detail}项`,
    })
  }

  render() {
    return (
      <DemoPage title='Sidebar 侧边导航'>
        <Grid columnNum={2} border={false}>
          <GridItem>
            <Text className='demo-sidebar-title'>基础用法</Text>
            <Sidebar className='custom-sidebar' activeKey={0}>
              <SidebarItem title='标签名' />
              <SidebarItem title='标签名' />
              <SidebarItem title='标签名' />
            </Sidebar>
          </GridItem>
          <GridItem>
            <Text className='demo-sidebar-title'>徽标提示</Text>
            <Sidebar className='custom-sidebar' activeKey={0}>
              <SidebarItem title='标签名' dot />
              <SidebarItem title='标签名' badge='5' />
              <SidebarItem title='标签名' badge='99+' />
            </Sidebar>
          </GridItem>
          <GridItem>
            <Text className='demo-sidebar-title'>禁用选项</Text>
            <Sidebar className='custom-sidebar' activeKey={0}>
              <SidebarItem title='标签名' />
              <SidebarItem title='标签名' disabled />
              <SidebarItem title='标签名' />
            </Sidebar>
          </GridItem>
          <GridItem>
            <Text className='demo-sidebar-title'>监听切换事件</Text>
            <Sidebar
              className='custom-sidebar'
              onChange={this.onChange}
              activeKey={0}
            >
              <SidebarItem title='标签名 1' />
              <SidebarItem title='标签名 2' />
              <SidebarItem title='标签名 3' />
            </Sidebar>
          </GridItem>
        </Grid>
        <Notify id='van-notify' />
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Sidebar 侧边导航',
  enableShareAppMessage: true,
})
