# CountDown 倒计时

### 介绍

用于实时展示倒计时数值，支持毫秒精度。

### 引入

在 Taro 文件中引入组件

```js
import { CountDown } from "taro-vant"; 
```

> Vant Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)。

## 代码演示

### 基本用法

`time`属性表示倒计时总时长，单位为毫秒。

```jsx
<View>
  <CountDown time={ this.state.time } />
</View>
 
```

```js
this.state = {
  time: 30 * 60 * 60 * 1000
}; 
```

### 自定义格式

通过`format`属性设置倒计时文本的内容。

```jsx
<View>
  <CountDown
    time={ this.state.time }
    format="DD 天 HH 时 mm 分 ss 秒"
  />
</View>
 
```

### 毫秒级渲染

倒计时默认每秒渲染一次，设置`millisecond`属性可以开启毫秒级渲染。

```jsx
<View>
  <CountDown
    millisecond={ true }
    time={ this.state.time }
    format="HH:mm:ss:SSS"
  />
</View>
 
```

### 自定义样式

通过`onChange`事件获取`timeData`对象并自行渲染，格式见下方表格。

```jsx
<View>
  <CountDown
    time={ this.state.time }
    onChange={ this.onChange }
  >
    <Text class="item">
      { timeData.hours }
    </Text>
    <Text class="item">
      { timeData.minutes }
    </Text>
    <Text class="item">
      { timeData.seconds }
    </Text>
  </CountDown>
</View>
 
```

```js
this.state = {
  time: 30 * 60 * 60 * 1000,
  timeData: {}
};

function onChange(e) {
  this.setState({
    timeData: e.detail
  });
} 
```

```css
.item {
  display: inlineBlock;
  width: 22px;
  marginRight: 5px;
  color: #fff;
  fontSize: 12px;
  textAlign: center;
  backgroundColor: #1989fa;
  borderRadius: 2px;
}
```

### 手动控制

通过 `ref` 选择器获取到组件实例后，可以调用`start`、`pause`、`reset`方法。

```jsx
<View>
  <CountDown
    class="controlCountDown"
    millisecond={ true }
    time={ 3000 }
    autoStart={ false }
    format="ss:SSS"
    onFinish={ finished }
  />
  <Grid
    clickable={ true }
    columnNum="3"
  >
    <GridItem
      text="开始"
      icon="playCircleO"
      bindclick="start"
    />
    <GridItem
      text="暂停"
      icon="pauseCircleO"
      bindclick="pause"
    />
    <GridItem
      text="重置"
      icon="replay"
      bindclick="reset"
    />
  </Grid>
</View>
 
```

```js
function pause() {
  const countDown = this.selectComponent('.controlCountDown');
  countDown.pause();
}

function reset() {
  const countDown = this.selectComponent('.controlCountDown');
  countDown.reset();
}

function finished() {
  Toast('倒计时结束');
} 
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  time  | 倒计时时长，单位毫秒 | _number_ | - |
|  format  | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | _string_ | `HH:mm:ss` |
|  autoStart  | 是否自动开始倒计时 | _boolean_ | `true` |
|  millisecond  | 是否开启毫秒级渲染 | _boolean_ | `false` |

### Events

|  事件名  | 说明                                         | 回调参数 |
| ------ | -------------------------------------------- | -------- |
|  onFinish  | 倒计时结束时触发                             | -        |
|  onChange  | 时间变化时触发| timeData |

### timeData 格式

|  名称          | 说明     | 类型     |
| ------------ | -------- | -------- |
|  days          | 剩余天数 | _number_ |
|  hours         | 剩余小时 | _number_ |
|  minutes       | 剩余分钟 | _number_ |
|  seconds       | 剩余秒数 | _number_ |
|  milliseconds  | 剩余毫秒 | _number_ |

### 方法

通过 ref 可以获取到 CountDown 实例并调用实例方法。

|  方法名  | 参数 | 返回值 | 介绍 |
| --- | --- | --- | --- |
|  start  | - | - | 开始倒计时 |
|  pause  | - | - | 暂停倒计时 |
|  reset  | - | - | 重设倒计时，若`auto-start`为`true`，重设后会自动开始倒计时 |
