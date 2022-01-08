# Calendar 日历

### 介绍

日历组件用于选择日期或日期区间。

### 引入

在 Taro 文件中引入组件

```js
import { Calendar } from "taro-vant"; 
```

## 代码演示

### 选择单个日期

下面演示了结合单元格来使用日历组件的用法，日期选择完成后会触发`confirm`事件。

```jsx
<View>
  <Cell
    title="选择单个日期"
    value={  this.state.date  }
    onClick={ this.onDisplay }
  />
  <Calendar
    show={  this.state.show  }
    onClose={ this.onClose }
    onConfirm={ this.onConfirm }
  />
</View>
 
```

```js
this.state = {
  date: '',
  show: false
};

function onDisplay() {
  this.setState({
    show: true
  });
}

function onClose() {
  this.setState({
    show: false
  });
}

function formatDate(date) {
  date = new Date(date);
  return date.getMonth() + 1}/${date.getDate();
}

function onConfirm(event) {
  this.setState({
    show: false,
    date: this.formatDate(event.detail)
  });
} 
```

### 选择多个日期

设置`type`为`multiple`后可以选择多个日期，此时`confirm`事件返回的 date 为数组结构，数组包含若干个选中的日期。

```jsx
<View>
  <Cell
    title="选择多个日期"
    value={  this.state.text  }
    onClick={ this.onDisplay }
  />
  <Calendar
    show={  this.state.show  }
    type="multiple"
    onClose={ this.onClose }
    onConfirm={ this.onConfirm }
  />
</View>
 
```

```js
this.state = {
  text: '',
  show: false
};

function onDisplay() {
  this.setState({
    show: true
  });
}

function onClose() {
  this.setState({
    show: false
  });
}

function onConfirm(event) {
  this.setState({
    show: false,
    date: `选择了 ${event.detail.length} 个日期`
  });
} 
```

### 选择日期区间

设置`type`为`range`后可以选择日期区间，此时`confirm`事件返回的 date 为数组结构，数组第一项为开始时间，第二项为结束时间。

```jsx
<View>
  <Cell
    title="选择日期区间"
    value={  this.state.date  }
    onClick={ this.onDisplay }
  />
  <Calendar
    show={  this.state.show  }
    type="range"
    onClose={ this.onClose }
    onConfirm={ this.onConfirm }
  />
</View>
 
```

```js
this.state = {
  date: '',
  show: false
};

function onDisplay() {
  this.setState({
    show: true
  });
}

function onClose() {
  this.setState({
    show: false
  });
}

function formatDate(date) {
  date = new Date(date);
  return date.getMonth() + 1}/${date.getDate();
}

function onConfirm(event) {
  const [start, end] = event.detail;
  this.setState({
    show: false,
    date: this.formatDate(start)} - ${this.formatDate(end)
  });
} 
```

> Tips: 默认情况下，日期区间的起止时间不能为同一天，可以通过设置 allowSameDay 属性来允许选择同一天。

### 快捷选择

将`showConfirm`设置为`false`可以隐藏确认按钮，这种情况下选择完成后会立即触发`confirm`事件。

```jsx
<View>
  <Calendar
    show={  this.state.show  }
    showConfirm={  false  }
  />
</View>
 
```

### 自定义颜色

通过`color`属性可以自定义日历的颜色，对选中日期和底部按钮生效。

```jsx
<View>
  <Calendar
    show={  this.state.show  }
    color="#07c160"
  />
</View>
 
```

### 自定义日期范围

通过`minDate`和`maxDate`定义日历的范围，需要注意的是`minDate`和`maxDate`的区间不宜过大，否则会造成严重的性能问题。

```jsx
<View>
  <Calendar
    show={  this.state.show  }
    minDate={  this.state.minDate  }
    maxDate={  this.state.maxDate  }
  />
</View>
 
```

```js
this.state = {
  show: false,
  minDate: new Date(2010, 0, 1).getTime(),
  maxDate: new Date(2010, 0, 31).getTime()
}; 
```

### 自定义按钮文字

通过`confirmText`设置按钮文字，通过`confirmDisabledText`设置按钮禁用时的文字。

```jsx
<View>
  <Calendar
    show={  this.state.show  }
    type="range"
    confirmText="完成"
    confirmDisabledText="请选择结束时间"
  />
</View>
 
```

### 自定义日期文案

通过传入`formatter`函数来对日历上每一格的内容进行格式化

```jsx
<View>
  <Calendar
    show={  this.state.show  }
    type="range"
    formatter={  this.state.formatter  }
  />
</View>
 
```

```js
this.state = {
  formatter(day) {
    const month = day.date.getMonth() + 1;
    const date = day.date.getDate();

    if (month === 5) {
      if (date === 1) {
        day.topInfo = '劳动节';
      } else if (date === 4) {
        day.topInfo = '五四青年节';
      } else if (date === 11) {
        day.text = '今天';
      }
    }

    if (day.type === 'start') {
      day.bottomInfo = '入住';
    } else if (day.type === 'end') {
      day.bottomInfo = '离店';
    }

    return day;
  }

}; 
```

### 自定义弹出位置

通过`position`属性自定义弹出层的弹出位置，可选值为`top`、`left`、`right`。

```jsx
<View>
  <Calendar
    show={  this.state.show  }
    round="false"
    position="right"
  />
</View>
 
```

### 日期区间最大范围

选择日期区间时，可以通过`maxRange`属性来指定最多可选天数，选择的范围超过最多可选天数时，会弹出相应的提示文案。

```jsx
<View>
  <Calendar
    type="range"
    maxRange={  3  }
  />
</View>
 
```

### 自定义周起始日

通过 `firstDayOfWeek` 属性设置一周从哪天开始。

```jsx
<View>
  <Calendar firstDayOfWeek={  1  } />
</View>
 
```

### 平铺展示

将`poppable`设置为`false`，日历会直接展示在页面内，而不是以弹层的形式出现。

```jsx
<View>
  <Calendar
    title="日历"
    poppable={  false  }
    showConfirm={  false  }
    class="calendar"
  />
</View>
 
```

```css
.calendar {
  --calendarHeight: 500px;
}
```

## API

### Props

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  type  | 选择类型:<br>`single`表示选择单个日期，<br>`multiple`表示选择多个日期，<br>`range`表示选择日期区间 | _string_ | `single` |
|  title  | 日历标题 | _ReactNode_ | `日期选择` |
|  color  | 主题色，对底部按钮和选中日期生效 | _string_ | `#ee0a24` |
|  minDate  | 可选择的最小日期 | _timestamp_ | 当前日期 |
|  maxDate  | 可选择的最大日期 | _timestamp_ | 当前日期的六个月后 |
|  defaultDate  | 默认选中的日期，`type`为`multiple`或`range`时为数组 | _timestamp \| timestamp[]_ | 今天 |
|  rowHeight  | 日期行高 | _number \| string_ | `64` |
|  formatter  | 日期格式化函数 | _(day: Day) => Day_ | - |
|  poppable  | 是否以弹层的形式展示日历 | _boolean_ | `true` |
|  showMark  | 是否显示月份背景水印 | _boolean_ | `true` |
|  showTitle  | 是否展示日历标题 | _boolean_ | `true` |
|  showSubtitle  | 是否展示日历副标题（年月） | _boolean_ | `true` |
|  showConfirm  | 是否展示确认按钮 | _boolean_ | `true` |
|  confirmText  | 确认按钮的文字 | _string_ | `确定` |
|  confirmDisabledText  | 确认按钮处于禁用状态时的文字 | _string_ | `确定` |
|  firstDayOfWeek  | 设置周起始日 | _0~6_ | `0` |
|  footer  | 自定义底部区域内容 | _ReactNode_ | `-` |

### Poppable Props

当 Calendar 的 `poppable` 为 `true` 时，支持以下 props:

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  show  | 是否显示日历弹窗 | _boolean_ | `false` |
|  position  | 弹出位置，可选值为 `top` `right` `left` | _string_ | `bottom` |
|  round  | 是否显示圆角弹窗 | _boolean_ | `true` |
|  closeOnClickOverlay  | 是否在点击遮罩层后关闭 | _boolean_ | `true` |
|  safeAreaInsetBottom  | 是否开启底部安全区适配 | _boolean_ | `true` |

### Range Props

当 Calendar 的 `type` 为 `range` 时，支持以下 props:

|  参数  | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|  maxRange  | 日期区间最多可选天数，默认无限制 | _number \| string_ | - |
|  rangePrompt  | 范围选择超过最多可选天数时的提示文案 | _string \| null_ | `选择天数不能超过 xx 天` |
|  showRangePrompt  | 范围选择超过最多可选天数时，是否展示提示文案 | _boolean_ | `true` |
|  allowSameDay  | 是否允许日期范围的起止时间为同一天 | _boolean_ | `false` |

### Day 数据结构

日历中的每个日期都对应一个 Day 对象，通过`formatter`属性可以自定义 Day 对象的内容。

|  键名  | 说明 | 类型 |
| --- | --- | --- |
|  date  | 日期对应的 Date 对象 | _Date_ |
|  type  | 日期类型，可选值为`selected`、`start`、`middle`、`end`、`disabled` | _string_ |


### Events

|  事件名  | 说明 | 回调参数 |
| --- | --- | --- |
|  onSelect  | 点击任意日期时触发 | _value: Date \| Date[]_ |
|  onUnselect  | 当 Calendar 的 `type` 为 `multiple` 时,点击已选中的日期时触发 | _value: Date_ |
|  onConfirm  | 日期选择完成后触发，若`show-confirm`为`true`，则点击确认按钮后触发 | _value: Date \| Date[]_ |
|  onOpen  | 打开弹出层时触发 | - |
|  onClose  | 关闭弹出层时触发 | - |
|  onOpened  | 打开弹出层且动画结束后触发 | - |
|  onClosed  | 关闭弹出层且动画结束后触发 | - |
|  overRange  | 范围选择超过最多可选天数时触发 | - |
|  onClickSubtitle `v1.8.1`  | 点击日历副标题时触发 | _WechatMiniprogram.TouchEvent_ |

