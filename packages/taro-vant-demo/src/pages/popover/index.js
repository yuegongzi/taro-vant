import { DemoBlock, DemoPage } from 'components'
import { Button, Grid, Popover } from 'taro-vant'
import './index.scss'
import { View } from '@tarojs/components'
import { useState } from 'react'

const pl = [
  'top',
  'topRight',
  'topLeft',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'right',
  'rightTop',
  'rightBottom',
  'left',
  'leftBottom',
  'leftTop',
]
const action1 = [ { text: '选项一' }, { text: '选项二' }, { text: '选项三' } ]
const action2 = [
  { text: '选项一', icon: 'add-o' },
  { text: '选项二', icon: 'music-o' },
  { text: '选项三', icon: 'more-o' },
]
export default () => {
  const [ placement, setPlacement ] = useState(0)
  const [ icon, setIcon ] = useState(false)
  const [ theme, setTheme ] = useState(false)
  const changePlacement = () => {
    setPlacement(placement + 1)
  }
  const idx = placement % pl.length
  return (
    <DemoPage title='Popover 气泡弹出框'>
      <DemoBlock title='基础使用' padding>
        <Popover actions={action1}>
          <Button type='primary'>浅色风格</Button>
        </Popover>

        <Popover actions={action1} theme='dark'>
          <View className='demo-popover-margin'>
            <Button type='primary'>深色风格</Button>
          </View>
        </Popover>
      </DemoBlock>
      <DemoBlock title='进阶使用' padding>
        <Popover actions={action2}>
          <Button type='primary'>展示图标</Button>
        </Popover>

        <Popover
          actions={[ ...action1, { text: '选项四', disabled: true } ]}
          theme='dark'
        >
          <View className='demo-popover-margin'>
            <Button type='primary'>禁用选项</Button>
          </View>
        </Popover>
      </DemoBlock>
      <DemoBlock title='变换位置'>
        <View className='demo-popover'>
          <Popover
            onSelect={(...arg) => console.log(arg)}
            theme={theme ? 'dark' : 'light'}
            placement={pl[idx]}
            actions={icon ? action2 : action1}
          >
            <View className='demo-popover-content' />
          </Popover>
        </View>
      </DemoBlock>
      <View className='demo-popover-footer'>
        <Grid columnNum={3} border={false}>
          <Grid.Item>
            <Button block onClick={changePlacement}>
              更换位置
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button block onClick={() => setIcon(!icon)}>
              {icon ? '隐藏' : '展示'}图标
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button block onClick={() => setTheme(!theme)}>
              更换主题
            </Button>
          </Grid.Item>
        </Grid>
      </View>
    </DemoPage>
  )
}

definePageConfig({
  navigationBarTitleText: 'Popover 气泡弹出框',
  enableShareAppMessage: true,
})
