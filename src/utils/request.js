import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { baseUrl } from '@/config/default'
import { logout } from './auth'
import { getMockConfig } from './mockRequest'
const request = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
  timeout: 30000,
})

// 异常拦截处理器
const errorHandler = (error) => {
  // 程序异常，统一反馈用户为网络错误
  notification.error({
    description: '您的网络发生异常，无法连接服务器',
    message: '网络异常',
  })
  return Promise.reject(error)
}

/** 请求拦截 */
request.interceptors.request.use((config) => {
  if (VUE_APP_MOCK == '1') {
    config = getMockConfig(config) // 经过mock处理
  }
  const userInfo = localStorage.getItem('auth-info')
  const request_header = (userInfo && { _mes_auth_token: JSON.parse(userInfo).token }) || {}
  config.headers = Object.assign(
    {
      'Content-Type': 'application/json',
    },
    config.headers,
    request_header
  )
  return config
}, errorHandler)

/** 响应拦截 */
request.interceptors.response.use((response) => {
  let res = response.data || {}
  if (res.code == 401) {
    // 未登录
    logout()
    return
  } else if (res.code < 0) {
    // 服务端异常，通用文案说明
    notification.error({
      description: '网络异常，请稍后重试',
      message: '提示',
    })
  } else if (res.code > 0) {
    // 业务逻辑错误，需要返回服务端错误提示
    notification.error({
      description: res.message || '网络异常，请稍后重试',
      message: '提示',
    })
  }
  return res
}, errorHandler)

/** 封装为只有逻辑成功 code=0 则走 then，逻辑失败 code!=0 则走 catch */
const newRequest = (options) => {
  if (Object.prototype.toString.call(options.data) === '[object Object]' && !(options.data instanceof FormData)) {
    const data = options.data
    options.data = {}
    for (const key in data) {
      const value = data[key]
      if (Object.prototype.toString.call(value) === '[object Object]') {
        options.data = {
          ...options.data,
          ...value,
        }
      } else {
        options.data[key] = value
      }
    }
  }
  options.method = options.method || options.type
  if (!options.data) options.data = {}
  options.data.t = Date.now()
  if (!options.method) {
    options.method = 'post'
  } else if (options.method.toLocaleLowerCase() == 'get' || VUE_APP_MOCK == '1') {
    options.params = options.data
  }
  return new Promise((resolve, reject) => {
    request(options).then((res) => {
      if (res && res.code == 0) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  })
}

export default newRequest
export const ajax = newRequest
