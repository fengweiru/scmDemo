/**
 * 获取模拟请求配置
 * @param config 请求配置
 */
export function getMockConfig(config) {
  config.baseURL = 'http://localhost:8000'
  config.method = 'get'
  config.url = config.url + '.json'
  return config
}
