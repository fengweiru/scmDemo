// 系统名
const systemName = 'tpl'
// 环境变量
const env = VUE_APP_ENV || 'prod'
// 是否使用本地路由
const isLocalRouter = env == 'dev' ? true : false
// 接口根目录
const baseUrl = {
  // dev: 'http://192.168.102.32:9041/changemanagement',
  dev: 'http://49.235.30.187:9041/changemanagement',
  // dev: 'http://localhost:8000',
  test: 'http://49.235.30.187:9041/changemanagement',
  prod: 'http://172.23.2.17:9041/changemanagement',
}[env]

// 登录地址
const authLoginUrl = {
  dev: 'http://49.235.30.187:8088/auth',
  test: 'http://49.235.30.187:8088/auth',
  prod: 'http://172.23.2.17:8088/auth',
}[env]

// 主站地址
const mainUrl = {
  dev: 'http://49.235.30.187:8088/prod',
  test: 'http://49.235.30.187:8088/prod',
  prod: 'http://172.23.2.17:8088/prod',
}[env]

export { systemName, isLocalRouter, baseUrl, authLoginUrl, mainUrl }
