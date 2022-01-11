/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  Button,
  Checkbox,
  DatetimePicker,
  Dialog,
  Field,
  Form,
  Icon,
  Popup,
  Radio,
  Rate,
  Slider,
  Stepper,
  Switch,
  Uploader,
} from 'taro-vant'
import { Input, View } from '@tarojs/components'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import './index.scss'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

export default () => {
  const [ form ] = Form.useForm()
  return (
    <DemoPage title='Form 表单'>
      <DemoBlock title='基础用法'>
        <Form
          form={form}
          inset
          initialValues={{
            name: '我是初始值',
            singleSelect: '1',
            rate: 3,
            slider: 50,
            stepper: 5,
          }}
          onFinish={(e) => {
            return new Promise((resolve) => {
              console.log(e)
              setTimeout(() => {
                resolve()
              }, 2000)
            })
          }}
        >
          <FormItem
            label='用户名'
            name='name'
            required={true}
            rightIcon='user-o'
          >
            <Field placeholder='请输入用户名（中文）' />
          </FormItem>

          <FormItem
            label='密码'
            tooltip='至少为8位字母和数字组合'
            name='password'
            required={true}
            rightIcon={<Icon name='eye-o' />}
          >
            <Input placeholder='请输入密码' type='password' />
          </FormItem>

          <FormItem label='是否打开' name='opened'>
            <Switch activeColor='#07c160' size='45' />
          </FormItem>

          <FormItem label='单选框' name='singleSelect'>
            <RadioGroup direction='horizontal'>
              <Radio name='1' checkedColor='#07c160'>
                单选框 1
              </Radio>
              <Radio name='2' checkedColor='#07c160'>
                单选框 2
              </Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label='复选框' name='muiltSelect'>
            <CheckboxGroup direction='horizontal'>
              <Checkbox name='1' shape='square' checkedColor='#07c160'>
                复选框 1
              </Checkbox>
              <Checkbox name='2' shape='square' checkedColor='#07c160'>
                复选框 2
              </Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem label='滑块选择' name='slider'>
            <Slider activeColor='#07c160' style={{ width: '100%' }} />
          </FormItem>

          <FormItem label='评分' name='rate'>
            <Rate activeColor='#07c160' />
          </FormItem>

          <FormItem label='步进器' name='stepper'>
            <Stepper />
          </FormItem>
          <FormItem
            name='file'
            layout='vertical'
            label='上传图片(图片大小不得大于 0.1M)'
          >
            <Uploader name='file1' />
          </FormItem>
          <FormItem
            label='日期选择'
            customField
            name='dateTime'
            renderRight={<Icon name='arrow' />}
          >
            <DatetimePickerBox />
          </FormItem>
        </Form>
      </DemoBlock>
    </DemoPage>
  )
}

function DatetimePickerBox(props) {
  const { onChange, ...options } = props
  const [ show, setShow ] = useState(false)
  return (
    <>
      <Field
        readonly
        onClickInput={() => setShow(true)}
        onClickIcon={() => setShow(true)}
        isLink
        {...options}
        placeholder='请选择日期'
      />
      <Popup position='bottom' show={show} onClose={() => setShow(false)}>
        <DatetimePicker
          onConfirm={(e) => {
            setShow(false)
            onChange(e)
          }}
          type='datetime'
        />
      </Popup>
    </>
  )
}
