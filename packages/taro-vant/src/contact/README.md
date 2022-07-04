# Contact 联系人组件

### 介绍

展示联系人信息

### 引入

在 Taro 文件中引入组件

```js
import { Contact } from "taro-vant"; 
```

## 代码演示

### 基础用法

默认就展示新增信息

```jsx

<View>
  <Contact.Card type='add'/>
</View>
 
```

### 编辑联系人

联系人信息可以被编辑 

```jsx
const data = {
  name: '张三',
  tel: '13000000000',
};

<View>
  <Contact.Card type='edit' {...data} onClick={e=>console.log(e)}/>
</View>
 
```

### 不可编辑

整个卡片信息会出于无点击效果状态

```jsx

<View>
  <Contact.Card type='edit' disabled {...data}/>
</View>
 
```

### 联系人列表

联系人列表用于展示联系人的信息,可选择和编辑,因为联系人内置了`Radio`作为选项,所以外部需要采用`Radio.Group`包裹

```jsx
       <Radio.Group value={value}>
  {list.map((item, index) => (
    <Contact  data={item}
              key={index}
              onClick={() => setValue(item.id)}
              telField='tel'
    />
  ))}
</Radio.Group>
```

## API

### ContactCard Props

| 参数       | 说明          | 类型        | 默认值     |
|----------|-------------|-----------|---------|
| name     | 联系人姓名       | _string_  | -       |
| tel      | 联系人电话       | _string_  | -       |
| type     | 类型,可选`edit` | _string_  | `add`   |
| addText  | 添加时的文案      | _string_  | `添加联系人` |
| disabled | 禁止编辑        | _boolean_ | `false` |

### Contact Props
| 参数        | 说明     | 类型       | 默认值     |
|-----------|--------|----------|---------|
| data      | 数据     | _object_ | `-`     |
| telField  | 电话取值字段 | _string_ | `phone` |
| nameField | 名字取值字段 | _string_ | `name`  |

### ContactCard Events

| 事件      | 说明      | 回调参数 |
|---------|---------|------|
| onClick | 点击联系人卡片 |      |


### Contact Events

| 事件     | 说明   | 回调参数 |
|--------|------|------|
| onEdit | 编辑事件 |      |

