# Transition 动画

### 介绍

使元素从一种样式逐渐变化为另一种样式的效果。

### 引入

在 Taro 文件中引入组件

```js
import { Transition } from "taro-vant"; 
```

## 代码演示

### 基础用法

将元素包裹在 transition 组件内，在元素展示/隐藏时，会有相应的过渡动画。

```jsx
<View>
  <Transition
    visible={ this.state.show }
    className="block"
  >
    内容
  </Transition>
</View>
 
```

### 动画类型

transition 组件内置了多种动画，可以通过`name`字段指定动画类型。

```jsx
<View>
  <Transition name="fadeUp" />
</View>
 
```

### 高级用法

可以通过外部样式类自定义过渡效果，还可以定制进入和移出的持续时间。

```jsx
<View>
  <Transition
    visible={ this.state.show }
    name=""
    duration={ { enter: 300, leave: 1000 } }
    enterClass="vanEnterClass"
    enterActiveClass="vanEnterActiveClass"
    leaveActiveClass="vanLeaveActiveClass"
    leaveToClass="vanLeaveToClass"
  />
</View>
 
```

```css
.vanEnterActiveClass,
.vanLeaveActiveClass {
  transitionProperty: backgroundColor, transform;
}

.vanEnterClass,
.vanLeaveToClass {
  backgroundColor: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
```

## API

### Props

|  参数          | 说明                 | 类型               | 默认值 |
| ------------ | -------------------- | ------------------ | ------ |
|  name          | 动画类型             | _string_           | `fade` |
|  visible          | 是否展示组件         | _boolean_          | `true` |
|  duration      | 动画时长，单位为毫秒 | _number \| object_ | `300`  |
|  customStyle  | 自定义样式           | _string_           | -      |

### Events

|  事件名             | 说明       | 参数 |
| ----------------- | ---------- | ---- |
|  onBeforeEnter  | 进入前触发 | -    |
|  onEnter         | 进入中触发 | -    |
|  onAfterEnter   | 进入后触发 | -    |
|  onBeforeLeave  | 离开前触发 | -    |
|  onLeave         | 离开中触发 | -    |
|  onAfterLeave   | 离开后触发 | -    |

### 外部样式类

|  类名  | 说明 |
| --- | --- |
|  customClass  | 根节点样式类 |
|  enterClass  | 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。 |
|  enterActiveClass  | 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。 |
|  enterToClass  | 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。 |
|  leaveClass  | 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。 |
|  leaveActiveClass  | 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。 |
|  leaveToClass  | 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。 |

### 动画类型

|  名称         | 说明     |
| ----------- | -------- |
|  fade         | 淡入     |
|  fadeUp      | 上滑淡入 |
|  fadeDown    | 下滑淡入 |
|  fadeLeft    | 左滑淡入 |
|  fadeRight   | 右滑淡入 |
|  slideUp     | 上滑进入 |
|  slideDown   | 下滑进入 |
|  slideLeft   | 左滑进入 |
|  slideRight  | 右滑进入 |
|  zoom  | 放大 |
