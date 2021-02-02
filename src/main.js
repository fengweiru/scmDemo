import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// import './mockjs/index' // 接口手动 mock
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import './core/lazy_use' // use lazy load components
import './global.less' // global style

Vue.config.productionTip = false

// 全局挂载布局组件
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
