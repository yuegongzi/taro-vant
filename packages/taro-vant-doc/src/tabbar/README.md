# Tabbar 标签栏

### 介绍

底部导航栏，用于在不同页面之间进行切换。

### 引入

在 Taro 文件中引入组件

```js
import { Tabbar } from "taro-vant";
const TabbarItem = Tabar.Item
```

## 代码演示

### 基础用法

```jsx
<View>
  <Tabbar
    active={ this.state.active }
    onChange={ this.onChange }
  >
    <TabbarItem icon="homeO">
      标签
    </TabbarItem>
    <TabbarItem icon="search">
      标签
    </TabbarItem>
    <TabbarItem icon="friendsO">
      标签
    </TabbarItem>
    <TabbarItem icon="settingO">
      标签
    </TabbarItem>
  </Tabbar>
</View>
 
```

```js
this.state = {
  active: 0
};

function onChange(event) {
  // event.detail 的值为当前选中项的索引
  this.setState({
    active: event.detail
  });
} 
```

### 通过名称匹配

在标签指定`name`属性的情况下，`vModel`的值为当前标签的`name`。

```jsx
<View>
  <Tabbar
    active={ this.state.active }
    onChange={ this.onChange }
  >
    <TabbarItem
      name="home"
      icon="homeO"
    >
      标签
    </TabbarItem>
    <TabbarItem
      name="search"
      icon="search"
    >
      标签
    </TabbarItem>
    <TabbarItem
      name="friends"
      icon="friendsO"
    >
      标签
    </TabbarItem>
    <TabbarItem
      name="setting"
      icon="settingO"
    >
      标签
    </TabbarItem>
  </Tabbar>
</View>
 
```

```js
this.state = {
  active: 'home'
};

function onChange(event) {
  this.setState({
    active: event.detail
  });
} 
```

### 显示徽标

```jsx
<View>
  <Tabbar
    active={ this.state.active }
    onChange={ this.onChange }
  >
    <TabbarItem icon="homeO">
      标签
    </TabbarItem>
    <TabbarItem
      icon="search"
      dot={ true }
    >
      标签
    </TabbarItem>
    <TabbarItem
      icon="friendsO"
      info="5"
    >
      标签
    </TabbarItem>
    <TabbarItem
      icon="settingO"
      info="20"
    >
      标签
    </TabbarItem>
  </Tabbar>
</View>
 
```

### 自定义图标

```jsx
<View>
  <Tabbar
    active={ this.state.active }
    onChange={ this.onChange }
  >
  <TabbarItem
    info="3"
    icon={
      <Block>
        <Image
          src={this.state.icon.normal}
          mode="aspectFit"
          style="width: 30px; height: 18px;"
        ></Image>
      </Block>
    }
    active={
      <Block>
        <Image
          src={this.state.icon.active}
          mode="aspectFit"
          style="width: 30px; height: 18px;"
        ></Image>
      </Block>
    }
  >
    自定义
  </TabbarItem>
    <TabbarItem icon="search">
      标签
    </TabbarItem>
    <TabbarItem icon="settingO">
      标签
    </TabbarItem>
  </Tabbar>
</View>
 
```

```js
this.state = {
  active: 0,
  icon: {
    normal: 'https://img.yzcdn.cn/vant/userInactive.png',
    active: 'https://img.yzcdn.cn/vant/userActive.png'
  }
};

function onChange(event) {
  this.setState({
    active: event.detail
  });
} 
```

### 自定义颜色

```jsx
<View>
  <Tabbar
    active={ this.state.active }
    activeColor="#07c160"
    inactiveColor="#000"
    onChange={ this.onChange }
  >
    <TabbarItem icon="homeO">
      标签
    </TabbarItem>
    <TabbarItem icon="search">
      标签
    </TabbarItem>
    <TabbarItem icon="friendsO">
      标签
    </TabbarItem>
    <TabbarItem icon="settingO">
      标签
    </TabbarItem>
  </Tabbar>
</View>
 
```

```js
this.state = {
  active: 0
};

function onChange(event) {
  this.setState({
    active: event.detail
  });
} 
```

### 切换标签事件

```jsx
<View>
  <Tabbar
    active={ this.state.active }
    onChange={ this.onChange }
  >
    <TabbarItem icon="homeO">
      标签1
    </TabbarItem>
    <TabbarItem icon="search">
      标签2
    </TabbarItem>
    <TabbarItem icon="friendsO">
      标签3
    </TabbarItem>
    <TabbarItem icon="settingO">
      标签4
    </TabbarItem>
  </Tabbar>
</View>
 
```

```js
this.state = {
  active: 0
};

function onClick(event) {
  wx.showToast({
    title: `点击标签 ${event.detail + 1}`,
    icon: 'none'
  });
} 
```

### 结合自定义 tabBar

请参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html) 与 [代码片段](https://developers.weixin.qq.com/s/vaXgTsmQ7hnm)。

## API

### Tabbar Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  active  | 当前选中标签的索引 | _number_ | - |
|  fixed  | 是否固定在底部 | _boolean_ | `true` |
|  placeholder  | 固定在底部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false` |
|  border  | 是否展示外边框 | _boolean_ | `true` |
|  zIndex  | 元素 z-index | _number_ | `805` |
|  activeColor  | 选中标签的颜色 | _string_ | `#1989fa` |
|  inactiveColor  | 未选中标签的颜色 | _string_ | `#7d7e80` |
|  safeAreaInsetBottom  | 是否为 iPhoneX 留出底部安全距离 | _boolean_ | `true` |

### Tabbar Event

|  事件名       | 说明           | 参数                                     |
| ----------- | -------------- | ---------------------------------------- |
|  onChange  | 切换标签时触发 | event.detail: 当前选中标签的名称或索引值 |

### TabbarItem Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  name  | 标签名称，作为匹配的标识符 | _string \| number_ | 当前标签的索引值 |
|  icon  | 图标名称或图片链接，可选值见 [Icon 组件](#/icon) | _string\|ReactNode_ | - |
|  iconPrefix  | 图标类名前缀，同 Icon 组件的 [class-prefix 属性](#/icon#props) | _string_ | `van-icon` |
|  dot  | 是否显示小红点 | _boolean_ | - |
|  badge  | 图标右上角提示信息 | _string \| number_ | - |

