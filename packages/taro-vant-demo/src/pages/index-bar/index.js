import { Text } from '@tarojs/components'
import { Component, Fragment } from 'react'
import { Cell, IndexBar, Tabs } from 'taro-vant'
import DemoPage from '../../components/demo-page'
const Tab = Tabs.Tab
const IndexAnchor = IndexBar.Anchor
const indexList = []
const charCodeOfA = 'A'.charCodeAt(0)
for (let i = 0; i < 26; i++) {
  indexList.push(String.fromCharCode(charCodeOfA + i))
}

export default class Index extends Component {
  state = {
    activeTab: 0,
    indexList,
    customIndexList: [ 1, 2, 3, 4, 5, 6, 8, 9, 10 ],
    scrollTop: 0,
  }

  constructor() {
    super()
  }

  onChange = (event) => {
    this.setState({
      activeTab: event.detail.name,
    })
  }

  onPageScroll = (event) => {
    this.setState({
      scrollTop: event.scrollTop,
    })
  }

  render() {
    const { activeTab, scrollTop, indexList, customIndexList } = this.state
    return (
      <DemoPage title='IndexBar 索引栏'>
        <Tabs active={activeTab} onChange={this.onChange}>
          <Tab title='基础用法'>
            {activeTab === 0 && (
              <IndexBar scrollTop={scrollTop}>
                {indexList.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <IndexAnchor index={item} />
                      <Cell title='文本' />
                      <Cell title='文本' />
                      <Cell title='文本' />
                    </Fragment>
                  )
                })}
              </IndexBar>
            )}
          </Tab>
          <Tab title='自定义索引列表'>
            {activeTab === 1 && (
              <IndexBar indexList={customIndexList} scrollTop={scrollTop}>
                {customIndexList.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <IndexAnchor index={item}>
                        <Text>{'标题' + item}</Text>
                      </IndexAnchor>
                      <Cell title='文本' />
                      <Cell title='文本' />
                      <Cell title='文本' />
                    </Fragment>
                  )
                })}
              </IndexBar>
            )}
          </Tab>
        </Tabs>
      </DemoPage>
    )
  }
}
