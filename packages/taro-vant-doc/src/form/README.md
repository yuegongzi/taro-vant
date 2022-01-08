# Form 表单

### 介绍

用于为数据入录、校验，支持输入框、开关、文件上传等组件类型，支持自定义组件

### 引入

在 Taro 文件中引入组件

```js
import { Form, FormItem } from "taro-vant";
```

## 代码演示

### 基础用法

可以通过buton点击事件`onClick`中在form实例submit获取数据并处理，或者通过button的`formType`触发onFinish

```js
  componentDidMount() {
    // 异步更新initialValues
    setTimeout(() => {
      this.setState({
        dateTime: '2021-12-02 12:12',
      })
    }, 2000)
  }

  handleClick = () => {
    this.form.validateFields((errorMessage, fieldValues) => {
      if (errorMessage && errorMessage.length) {
        return console.info('errorMessage', errorMessage)
      }
      console.info(fieldValues)
    })
  }
```

FormItem需要代理下级表单组件的值和触发事件

- 代理的表单组件触发事件为`onChange`, 通过`FormItem.trigger`重新设置
- 代理的表单组件默认取值为`value`, 通过`FormItem.valueKey`重新设置
- 代理的表单组件触发事件回调事件的默认取值`event.detail`, 通过`FormItem.valueFormat`重新设置

```jsx
<Form
  initialValues={{
    name: '我是初始值',
    dateTime: this.state.dateTime,
    singleSelect: '1',
    rate: 2,
    slider: '50',
  }}
  ref={(el) => (this.form = el)}
  onFinish={(e) => console.info(e)}
>
  <FormItem
    label="用户名"
    name="userName"
    required={true}
    rules={{
      rule: /[\u4e00-\u9fa5]/,
      message: '用户名仅支持中文',
    }}
    trigger="onInput"
    validateTrigger="onBlur"
    // taro的input的onInput事件返回对应表单的最终值为e.detail.value
    valueFormat={(e) => e.detail.value}
    renderRight={<Icon name="user-o" />}
  >
    <Input placeholder="请输入用户名（中文）" />
  </FormItem>

  <FormItem
    label="密码"
    name="password"
    required={true}
    renderRight={<Icon name="eye-o" />}
  >
    <Input placeholder="请输入密码" type="password" />
  </FormItem>

  <FormItem label="是否打开" name="opened" valueKey="checked">
    <Switch activeColor="#07c160" inactiveColor="#07c160" />
  </FormItem>

  <FormItem label="单选框" name="singleSelect">
    <RadioGroup direction="horizontal">
      <Radio name="1" checkedColor="#07c160">
        单选框 1
      </Radio>
      <Radio name="2" checkedColor="#07c160">
        单选框 2
      </Radio>
    </RadioGroup>
  </FormItem>

  <FormItem label="复选框" name="muiltSelect">
    <CheckboxGroup direction="horizontal">
      <Checkbox name="1" shape="square" checkedColor="#07c160">
        复选框 1
      </Checkbox>
      <Checkbox name="2" shape="square" checkedColor="#07c160">
        复选框 2
      </Checkbox>
    </CheckboxGroup>
  </FormItem>

  <FormItem label="滑块选择" name="slider">
    <Slider
      activeColor="#07c160"
      style={{ width: '200px', marginTop: '10px' }}
    />
  </FormItem>

  <FormItem label="评分" name="rate">
    <Rate activeColor="#07c160" />
  </FormItem>

  <FormItem label="步进器" name="stepper">
    <Stepper />
  </FormItem>

  <Button
    type="primary"
    className="van-button-submit"
    onClick={this.handleClick}
    // formType="submit"
  >
  提交
  </Button>
</Form>
```

### 异步处理和自定义校验

- Uploader的onAfterRead事件只返回变更的文件，展示的是多个文件的话需要重新设置
- 异步操作的时候返回Promise

```js
valueFormatUpload = (event, formName, instance) => {
  const { file } = event.detail
  let fileList = instance.getFieldValue(formName) || []
  fileList = fileList.concat(file)
  // 异步更新
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fileList)
    }, 3000)
  })
}
```

```jsx
<FormItem
  name="file"
  required
  layout="vertical"
  label="上传图片(图片大小不得大于 0.1M)"
  valueKey="fileList"
  valueFormat={this.valueFormatUpload}
  trigger="onAfterRead"
  validateTrigger="onAfterRead"
  rules={{
    rule: (values, call) => {
      values.forEach((item, index) => {
        if (item.size > 0.1 * 1024 * 1024) {
          return call(`图片(${index + 1})大小不得大于 0.1M`)
        }
        call(null)
      })
    },
  }}
>
  <Uploader name="file1" onDelete={this.deleteFile}></Uploader>
</FormItem>
```

### 自定义组件

封装DatetimePickerBox组件

```jsx
class DatetimePickerBox extends Component {
  constructor() {
    super()
    this.state = { show: false, innerValue: null }
  }

  toggleShow(show) {
    this.setState({ show })
  }

  onConfirm = (e) => {
    if (this.props.onConfirm) this.props.onConfirm(e)
    this.setState({ show: false })
  }

  onCancel = () => {
    if (this.props.onCancel) this.props.onCancel()
    this.setState({ show: false })
  }

  preFixZero(n) {
    return n > 9 ? `${n}` : `0${n}`
  }

  formatDate(date) {
    const d = new Date(date)
    return `${d.getFullYear()}-${this.preFixZero(
      Number(d.getMonth() + 1),
    )}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }

  onChange(e) {
    this.setState({ innerValue: e.detail.datetimePicker.innerValue })
  }

  render() {
    const { value } = this.props
    return (
      <>
        <View
          onClick={() => this.toggleShow(true)}
          style={{ minWidth: '200px' }}
        >
          {value ? this.formatDate(value) : '请选择日期'}
        </View>
        <Popup
          position="bottom"
          show={this.state.show}
          onClose={() => this.toggleShow(false)}
        >
          <DatetimePicker
            type="datetime"
            value={this.state.innerValue  || value}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
          />
        </Popup>
      </>
    )
  }
}
```

使用自定义组件

```jsx
<FormItem
  label="日期选择"
  name="dateTime"
  valueFormat={(e) => e.detail.value}
  valueKey="value"
  trigger="onConfirm"
  renderRight={<Icon name="arrow" />}
>
  <DatetimePickerBox />
</FormItem>
```
### FormProps
| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| initialValues | 初始化表单仓库值 | _&nbsp;&nbsp;Store<br/>_ | - | `false` |
| children | 第一级必须是FormItem组件 | _&nbsp;&nbsp;ReactNode<br/>_ | - | `true` |
| className | 类名 | _&nbsp;&nbsp;string<br/>_ | - | `false` |
| onFinish | 表单提交触发，配合button.formType = submit | _&nbsp;&nbsp;(values:&nbsp;any)&nbsp;=>&nbsp;void<br/>_ | - | `false` |
| layout | 垂直 ｜ 水平 | _&nbsp;&nbsp;"vertical"&nbsp;&brvbar;&nbsp;"horizontal"<br/>_ | horizontal | `false` |
| labelWidth | 标签宽度 | _&nbsp;&nbsp;string<br/>_ | 5.2em | `false` |
| inset | - | _&nbsp;&nbsp;boolean<br/>_ | false | `false` |
| border | - | _&nbsp;&nbsp;boolean<br/>_ | true | `false` |
| form | - | _&nbsp;&nbsp;FormInstance<br/>_ | - | `false` |

### FormItemProps
| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| name | 对应表单字段名 | _&nbsp;&nbsp;NamePath<br/>_ | - | `true` |
| children | 第一级操作表单组件 | _&nbsp;&nbsp;any<br/>_ | - | `true` |
| label | 表单label | _&nbsp;&nbsp;string<br/>_ | - | `true` |
| layout | 垂直 ｜ 水平 | _&nbsp;&nbsp;"vertical"&nbsp;&brvbar;&nbsp;"horizontal"<br/>_ | horizontal | `false` |
| required | 是否必填 | _&nbsp;&nbsp;boolean<br/>_ | false | `false` |
| labelClass | label的外层className | _&nbsp;&nbsp;string<br/>_ | - | `false` |
| className | formItem最外层className | _&nbsp;&nbsp;string<br/>_ | - | `false` |
| right | 自定义渲染右边内容 | _&nbsp;&nbsp;ReactNode<br/>_ | - | `false` |
| labelWidth | 标签宽度 | _&nbsp;&nbsp;string<br/>_ | 5.2em | `false` |
| valuePropName | 表单控制展示的具体值的字段名 | _&nbsp;&nbsp;string<br/>_ | value | `false` |
| rules | 正则校验值，或者自定义校验后call回掉函数返回错误信息 | _&nbsp;&nbsp;Rule[]<br/>_ | - | `false` |
| hide | 隐藏该项 | _&nbsp;&nbsp;boolean<br/>_ | - | `false` |
| customField | - | _&nbsp;&nbsp;boolean<br/>_ | - | `false` |

