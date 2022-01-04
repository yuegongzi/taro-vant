export default function (options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: 'taro-vant 组件库演示',
      }
    },
    ...options,
  })
}
