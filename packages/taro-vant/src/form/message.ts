export default {
  default: '${name} 校验失败',
  required: '请填写该项内容',
  enum: '只能选择 [${enum}] 其中之一',
  whitespace: '内容不能为空格',
  date: {
    format: '日期格式无效',
    parse: '日期不能解析',
    invalid: '无效日期',
  },
  types: {
    string: '只能填写字符串',
    method: '只能填写方法',
    array: '只能填写数组',
    object: '只能填写对象',
    number: '只能填写数字',
    date: '只能填写日期',
    boolean: '只能填写真或假',
    integer: '只能填写整数',
    float: '只能填写小数',
    regexp: '只能填写正则表达式',
    email: '只能填写邮箱',
    url: '只能填写链接',
    hex: '只能填写16进制',
  },
  string: {
    len: '只能填写 ${len} 个字符',
    min: '至少填写 ${min} 字符',
    max: '最多能填写 ${max} 字符',
    range: '只能 ${min} 到 ${max} 个字符',
  },
  number: {
    len: '数字必须等于 ${len}',
    min: '数字不能小于 ${min}',
    max: '数字不能大于 ${max}',
    range: '只能是 ${min} 和 ${max} 之间数字',
  },
  array: {
    len: '数组长度至少为 ${len} ',
    min: '数组长度不能小于 ${min}',
    max: '数组长度不能大于 ${max} ',
    range: '数组长度只能在 ${min} 和 ${max} 之间',
  },
  pattern: {
    mismatch: '无法匹配表达式 ${pattern}',
  },
}


