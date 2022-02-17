import { useState } from 'react'
import { View } from '@tarojs/components'
import { ActionSheet, Button } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

const action1 = [
  { name: '选项' },
  { name: '选项' },
  { name: '选项', subname: '描述信息' },
]
const action2 = [
  { name: '着色选项', color: '#ee0a24' },
  { loading: true },
  { name: '禁用选项', disabled: true },
]
const action6 = [
  {
    name: '获取手机号',
    color: '#07c160',
    openType: 'getPhoneNumber',
    onGetPhoneNumber: (e) => console.log(e),
  },
]
export default () => {
  const [ state, setState ] = useState(0)
  const onClose = () => setState(0)
  return (
    <DemoPage title='ActionSheet 动作面板'>
      <DemoBlock title='基础用法' padding>
        <Button type='primary' onClick={() => setState(1)}>
          弹出菜单
        </Button>
        <ActionSheet
          visible={state === 1}
          actions={action1}
          onClose={onClose}
        />
      </DemoBlock>
      <DemoBlock title='选项状态' padding>
        <Button type='primary' onClick={() => setState(2)}>
          弹出菜单
        </Button>
        <ActionSheet
          visible={state === 2}
          actions={action2}
          onClose={onClose}
        />
      </DemoBlock>
      <DemoBlock title='展示取消按钮' padding>
        <Button type='primary' onClick={() => setState(3)}>
          弹出菜单
        </Button>
        <ActionSheet
          visible={state === 3}
          actions={action1}
          cancelText='取消'
          onClose={onClose}
        />
      </DemoBlock>
      <DemoBlock title='展示描述信息' padding>
        <Button type='primary' onClick={() => setState(4)}>
          弹出菜单
        </Button>
        <ActionSheet
          visible={state === 4}
          actions={action1}
          description='这是一段描述信息'
          onClose={onClose}
        />
      </DemoBlock>
      <DemoBlock title='展示标题栏' padding>
        <Button type='primary' onClick={() => setState(5)}>
          弹出菜单
        </Button>
        <ActionSheet visible={state === 5} title='标题' onClose={onClose}>
          <View className='content'>内容</View>
        </ActionSheet>
      </DemoBlock>
      <DemoBlock title='微信开放能力' padding>
        <Button type='primary' onClick={() => setState(6)}>
          弹出菜单
        </Button>
        <ActionSheet
          visible={state === 6}
          title='标题'
          onClose={onClose}
          actions={action6}
        />
      </DemoBlock>
    </DemoPage>
  )
}

definePageConfig({
  navigationBarTitleText: 'ActionSheet 动作面板',
  enableShareAppMessage: true,
})
