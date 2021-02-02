// 判断环境不是 prod 加载 mock 服务
if (process.env.NODE_ENV !== 'production') {
  const Mock = require('mockjs2')
  require('./services/user')
  
  Mock.setup({
    timeout: 800
  })
  console.log('[antd-pro] mock mounted')
}
