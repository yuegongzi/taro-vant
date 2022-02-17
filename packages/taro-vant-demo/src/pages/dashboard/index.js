import list from '../../config'
import { DemoHome } from 'components'

export default () => {
  return <DemoHome list={list} />
}

definePageConfig({
  navigationBarTitleText: 'taro-vant',
  enableShareAppMessage: true,
})
