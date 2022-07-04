# Form 表单

### 实现方式
采用 rc-field-form 实现Form 保证和h5 pc端写法和体验一致

### 介绍

用于为数据入录、校验，支持输入框、开关、文件上传等组件类型，支持自定义组件

### 引入

在 Taro 文件中引入组件

```js
import { Form } from "taro-vant";
```

## 代码演示

### 基础用法

可以通过`Form.useForm` hooks获取form对象,从而进行表单的处理和ant design 一致


```js
   
   const [form] = Form.useForm()

  <Form form={form}>
    <Form.Item name='name' required >
        <Field/>
    </Form.Item>
    <Button onClick={form.submit()}> 提交</Button>
  </Form>

```

### 初始化

通过设置`initialValues` 进行表单初始化 注 initialValues 默认只有在组件装载时执行一次
如果需要重新赋值,可以通过手动调用form.setFieldValues()进行设置

```jsx
<Form
  initialValues={{
    name: '我是初始值',
  }}
>
   <Form.Item name='name' required >
        <Field/>
    </Form.Item>
</Form>
```

### 圆角风格
采用Cell.Group进行包裹所有组件 通过`inset`属性设置是否圆角

```jsx
<Form inset border
  initialValues={{
    name: '我是初始值',
  }}
>
   <Form.Item name='name' required >
        <Field/>
    </Form.Item>
</Form>
```



### Form.Item的默认行为

-  当`required`为`true`时会自动添加校验规则
-  当`Field `作为子组件时会自动采用Field作为包裹项
-  会根据label自动生成Field类组件需要的placeholder 当然也可以自己通过子组件进行覆盖
-  增加`type`校验规则的正则表达式 目前支持 `tel` `bank` `idcard` `mobile` 
-  已自动处理内置表单组件的 `valuePropName` 和 `getValueFromEvent={value => value.detail.value}` 作为默认行为
-  自定义组件必须按 onChange(e:{detail:value})形式进行值的返回 

### 高级Hooks
taro-vant 内置了一个处理Form表单的hook 将表单的操作简易化

```jsx
import { hooks , Form } from 'taro-vant'

const { useForm } = hooks // 注意非Form.useForm
const [form,{set,get,getAll,submit,clearAll}]  = useForm({value: {}, sync: false})

<Form form={form}>
   <Form.Item name='name' required >
        <Field/>
    </Form.Item>
</Form>

```
该hook除了能简易的读取和设置表单,在value不为空对象时才去设置初始化表单项,还增强的方式支持了`同步`功能
每次value变化都会自动同步到表单

### 表单联动
表单内置了`Button`组件 将`onFinish`改造为Promise对象,会自动控制表单的提交时Button的`loading` `disabled`
属性 

### 表单方法
所有表单方法都可以在[rc-filed-form](https://github.com/react-component/field-form) 中查看

## API
### FormProps
| 参数                  | 说明              | 类型             | 默认值     | 必填      |
|---------------------|-----------------|----------------|---------|---------|
| initialValues       | 初始化数据           | _object_       | `-`     | `false` |
| className           | Form的外层class    | _string_       | `-`     | `false` |
| labelWidth          | Form.Item的标签的宽度 | _string_       | `5.2em` | `false` |
| inset               | 是否圆角宽度          | _boolean_      | `false` | `false` |
| border              | 是否显示上线边框        | _boolean_      | `false` | `false` |
| form                | useForm实例       | _FormInstance_ | `-`     | `true`  |
| submitter           | 是否展示提交按钮        | _boolean_      | `true`  | `false` |
| buttonProps         | 提交按钮属性          | _boolean_      | `-`     | `false` |
| showValidateMessage | 显示底部校验信息        | _boolean_      | `false` | `false` |
> 其他属性见[Form](https://github.com/react-component/field-form)

### FormItemProps
| 参数                  | 说明                                                      | 类型          | 默认值     | 必填      |
|---------------------|---------------------------------------------------------|-------------|---------|---------|
| name                | 对应表单字段名                                                 | _string_    | -       | `true`  |
| children            | 第一级操作表单组件                                               | _any_       | -       | `true`  |
| label               | 表单label                                                 | _string_    | -       | `false` |
| required            | 是否必填                                                    | _boolean_   | `false` | `false` |
| labelClass          | label的外层className                                       | _string_    | -       | `false` |
| className           | formItem最外层className                                    | _string_    | -       | `false` |
| tooltip             | 提示语                                                     | _string_    | -       | `false` |
| rightIcon           | 右边图标                                                    | _ReactNode\ | string_ | -       | `false` |
| leftIcon            | 左边图标                                                    | _ReactNode\ | string_ | -       | `false` |
| button              | 右边按钮                                                    | _ReactNode_ | -       | `false` |
| labelWidth          | 标签宽度                                                    | _string_    | 5.2em   | `false` |
| valuePropName       | 表单控制展示的具体值的字段名                                          | _string_    | value   | `false` |
| rules               | 正则校验值[参见](https://github.com/yiminghe/async-validator/) | _Rule[]_    | -       | `false` |
| hide                | 隐藏该项                                                    | _boolean_   | `false` | `false` |
| customField         | 自定义Field                                                | _boolean_   | `false` | `false` |
| type                | 校验类型`idcard` `tel` `bank`                               | _string_    | `-`     | `false` |
| showValidateMessage | 显示底部校验信息                                                | _boolean_   | `false` | `false` |

> 其他属性见[Form](https://github.com/react-component/field-form)


### Events

| 事件名      | 说明                        | 回调参数          |
|----------|---------------------------|---------------|
| onFinish | 提交函数=>`Promise<boolean> ` | _value: any _ |
