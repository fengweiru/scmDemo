import Vue from 'vue'
import Router from 'vue-router'
import { asyncRouterMap } from './router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

// 导出路由实例
export default new Router({
  routes: asyncRouterMap
})
