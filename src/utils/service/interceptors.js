import Taro from "@tarojs/taro"
import { API_CODE } from './config'

const customInterceptor = (chain) => {

  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {

    // 只要请求成功，不管返回什么状态码，都走这个回调
    if(res.data.code === API_CODE.SUCCESS){
      // 成功
      return res.data
    }else if (res.data.code === API_CODE.FAIL) {
      // 操作失败请稍后重试
      Taro.$plugins.toast('操作失败请稍后重试')
      return Promise.reject(res.data)

    } else if (res.data.code === API_CODE.BAD_GATEWAY) {
      // 服务端出现了问题
      Taro.$plugins.toast(res.data.msg)
      return Promise.reject(res.data)

    } else if (res.data.code === API_CODE.FORBIDDEN || res.data.code === API_CODE.OVERDUE) {
      // 用户未注册  或登陆过期   都去登陆页面
      Taro.pageToLogin()
      // 操作失败弹出错误信息
      Taro.$plugins.toast(res.data.msg)
      return Promise.reject(res.data)

    } else if (res.data.code === API_CODE.MSG) {
      // 操作失败弹出错误信息
      Taro.$plugins.toast(res.data.msg)
      return Promise.reject(res.data)

    } else {
      // 都算失败
      Taro.$plugins.toast(res.data.msg)
      return Promise.reject(res.data)
    }
  })
}



// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]


export default interceptors