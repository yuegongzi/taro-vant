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
      <Dialog id='vanDialog' />
      <Form
        form={form}
        initialValues={{
          name: '我是初始值',
          singleSelect: '1',
          rate: 3,
          slider: 50,
          stepper: 5,
        }}
        onFinish={(e) => console.info(e)}
      >
        <DemoBlock title='基础用法'>
          <FormItem
            label='用户名'
            name='name'
            required={true}
            right={<Icon name='user-o' />}
          >
            <Field placeholder='请输入用户名（中文）' />
          </FormItem>

          <FormItem
            label='密码'
            name='password'
            required={true}
            right={<Icon name='eye-o' />}
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
            <Slider
              activeColor='#07c160'
              style={{ width: '200px', marginTop: '10px' }}
            />
          </FormItem>

          <FormItem label='评分' name='rate'>
            <Rate activeColor='#07c160' />
          </FormItem>

          <FormItem label='步进器' name='stepper'>
            <Stepper />
          </FormItem>
        </DemoBlock>

        <DemoBlock title='异步处理和自定义校验'>
          <FormItem
            name='file'
            layout='vertical'
            label='上传图片(图片大小不得大于 0.1M)'
          >
            <Uploader name='file1' />
          </FormItem>
        </DemoBlock>

        <DemoBlock title='自定义组件'>
          <FormItem
            label='日期选择'
            customField
            name='dateTime'
            renderRight={<Icon name='arrow' />}
          >
            <DatetimePickerBox />
          </FormItem>

          <View style={{ marginBottom: '100px' }} />

          <View className='van-button-submit-box'>
            <Button
              type='primary'
              className='van-button-submit'
              onClick={() => {
                form.submit()
                console.log(form)
              }}
              formType='submit'
            >
              提交
            </Button>
          </View>
        </DemoBlock>
      </Form>
    </DemoPage>
  )
}

function DatetimePickerBox(props) {
  const { onChange, ...options } = props
  const [ show, setShow ] = useState(false)
  return (
    <>
      <Field readonly onClickInput={() => setShow(true)}
             onClickIcon={() => setShow(true)}
             isLink {...options} placeholder='请选择日期'
      />
      <Popup
        position='bottom'
        show={show}
        onClose={() => setShow(false)}
      >
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
