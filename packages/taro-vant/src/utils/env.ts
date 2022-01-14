export const ENV = {
  h5: process.env.TARO_ENV === 'h5',
  alipay: process.env.TARO_ENV === 'alipay',
  weapp: process.env.TARO_ENV === 'weapp',
  swan: process.env.TARO_ENV === 'swan',
  tt: process.env.TARO_ENV === 'tt',
  qq: process.env.TARO_ENV === 'qq',
  jd: process.env.TARO_ENV === 'jd',
}
