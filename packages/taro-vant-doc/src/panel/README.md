# Panel 面板

### 引入

在 Taro 文件中引入组件

```js
import { Panel } from "taro-vant"; 
```

## 代码演示

### 基础用法

面板只是一个容器，里面可以放入自定义的内容。

```jsx
<View>
  <Panel
    title="标题"
    desc="描述信息"
    status="状态"
  >
    <View>
      内容
    </View>
  </Panel>
</View>
 
```

### 高级用法

```jsx
<View>
  <Panel
    title="标题"
    desc="描述信息"
    status="状态"
    renderFooter={(
      <View>
        <Button size="small">
          按钮
        </Button>
        <Button
          size="small"
          type="danger"
        >
          按钮
        </Button>
      </View>
    )}
  >
    <View>
      内容
    </View>
  </Panel>
</View>
 
```

## API

### Props

|  参数    | 说明 | 类型     | 默认值 |
| ------ | ---- | -------- | ------ |
|  title   | 标题 | _string_ | -      |
|  desc    | 描述 | _string_ | -      |
|  status  | 状态 | _string_ | -      |

### Slot

|  名称    | 说明                                                           |
| ------ | -------------------------------------------------------------- |
|         | 自定义内容                                                     |
|  header  | 自定义 header，如果设置了`title`、`desc`、`status`属性则不生效 |
|  footer  | 自定义 footer                                                  |

### 外部样式类

|  类名          | 说明         |
| ------------ | ------------ |
|  customClass  | 根节点样式类 |
|  headerClass  | 头部样式类   |
|  footerClass  | 底部样式类   |
