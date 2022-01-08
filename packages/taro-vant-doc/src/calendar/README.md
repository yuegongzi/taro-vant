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
### CalendarProps
| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| title | 日历标题 | _&nbsp;&nbsp;string<br/>_ | `日期选择` | `false` |
| color | 主题色，对底部按钮和选中日期生效 | _&nbsp;&nbsp;string<br/>_ | <font color='#ee0a24'>#ee0a24</font> | `false` |
| show | 是否显示 | _&nbsp;&nbsp;boolean<br/>_ | - | `false` |
| formatter | 日期格式化函数 | _&nbsp;&nbsp;(day:&nbsp;Day)&nbsp;=>&nbsp;Day<br/>_ | - | `false` |
| confirmText | 确认按钮的文字 | _&nbsp;&nbsp;string<br/>_ | `确定` | `false` |
| rangePrompt | 范围选择超过最多可选天数时的提示文案 | _&nbsp;&nbsp;string<br/>_ | `选择天数<br/>不能超过 xx 天` | `false` |
| showRangePrompt | 范围选择超过最多可选天数时，是否展示提示文案 | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| defaultDate | 默认选中的日期，type为`multiple`<br/>或`range`时为数组 | _&nbsp;&nbsp;string&nbsp;&brvbar;&nbsp;string[]<br/>_ | - | `false` |
| allowSameDay | 是否允许日期范围的起止时间为同一天 | _&nbsp;&nbsp;boolean<br/>_ | `false` | `false` |
| confirmDisabledText | 确认按钮处于禁用状态时的文字 | _&nbsp;&nbsp;string<br/>_ | `确定` | `false` |
| type | 选择类型<br/> `single`表示选择单个日期，<br/> `multiple` 选择多个日期<br/> `range`表示选择日期区间 | _&nbsp;&nbsp;CalendarType<br/>_ | - | `false` |
| minDate | 可选择的最小日期 | _&nbsp;&nbsp;number<br/>_ | `当前日期` | `false` |
| maxDate | 可选择的最大日期 | _&nbsp;&nbsp;number<br/>_ | `当前日期<br/>的六个月后` | `false` |
| position | 弹出位置，可选值为 `top` `right` `left` | _&nbsp;&nbsp;Position<br/>_ | `bottom` | `false` |
| rowHeight | 日期行高 | _&nbsp;&nbsp;number&nbsp;&brvbar;&nbsp;string<br/>_ | `64` | `false` |
| round | 是否显示圆角弹窗 | _&nbsp;&nbsp;boolean<br/>_ | - | `false` |
| poppable | 是否以弹层的形式展示日历 | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| showMark | 是否显示月份背景水印 | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| showTitle | 是否展示日历标题 | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| showConfirm | 是否展示确认按钮 | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| showSubtitle | 是否展示日历副标题（年月） | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| safeAreaInsetBottom | 是否开启底部安全区适配 | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭 | _&nbsp;&nbsp;boolean<br/>_ | `true` | `false` |
| maxRange | 日期区间最多可选天数，默认无限制 | _&nbsp;&nbsp;number<br/>_ | - | `false` |
| firstDayOfWeek | 设置周起始日 `0~6` | _&nbsp;&nbsp;Week<br/>_ | `0` | `false` |
| onOpen | 打开弹出层时触发 | _&nbsp;&nbsp;()&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| onClose | 关闭弹出层时触发 | _&nbsp;&nbsp;()&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| onOpened | 打开弹出层且动画结束后触发 | _&nbsp;&nbsp;()&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| onClosed | 关闭弹出层且动画结束后触发 | _&nbsp;&nbsp;()&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| onConfirm | 日期选择完成后触发，若`showConfirm`为true，则点击确认按钮后触发 | _&nbsp;&nbsp;(e:&nbsp;CalendarEvents)&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| overRange | 范围选择超过最多可选天数时触发 | _&nbsp;&nbsp;()&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| onUnselect | 当 Calendar的type<br/>为 `multiple`时,<br/>点击已选中的日期时触发 | _&nbsp;&nbsp;(e:&nbsp;CalendarEventsSingle)&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| onSelect | 点击任意日期时触发 | _&nbsp;&nbsp;(e:&nbsp;CalendarEvents)&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| onClickSubtitle | 点击日历副标题时触发 | _&nbsp;&nbsp;(a?:&nbsp;any)&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| renderTitle | 自定义标题 | _&nbsp;&nbsp;ReactNode<br/>_ | - | `false` |
| renderFooter | 自定义底部 | _&nbsp;&nbsp;ReactNode<br/>_ | - | `false` |

### ICalendarInstance
| 方法 | 说明 | 类型 |
| --- | --- | --- |
| reset | - | _&nbsp;&nbsp;(date?:&nbsp;Date&nbsp;&brvbar;&nbsp;Date[])&nbsp;=>&nbsp;void<br/>&nbsp;&nbsp;//<br/>_ |
| scrollToDate | - | _&nbsp;&nbsp;(date:&nbsp;Date)&nbsp;=>&nbsp;void<br/>_ |

