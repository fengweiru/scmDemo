import { BasicLayout } from '@/layouts'
import { formatMenu } from '@/utils/menu'
import { localRouterMenu } from './router.local'
import { systemName, isLocalRouter } from '@/config/default'
/** 获取服务端返回数据 */
const getServerRouterMenu = () => {
  let authInfo = localStorage.getItem('auth-info')
  if (authInfo) {
    let menu = JSON.parse(authInfo).modules.filter(e => e.name == systemName)[0]
    if (!menu) return []
    return formatMenu(menu.categories || [])
  }
  return []
}

/**
 * 渲染菜单
 * @param localRouterMenu 本地菜单数据
 * @param serverRouterMenu 服务端返回菜单数据
 * @param useLocal 是否用本地，默认false
 */
const renderMenu = (localRouterMenu, serverRouterMenu, useLocal = false) => {
  if (useLocal) {
    return localRouterMenu
  }
  const fn = (localRouterMenu, serverRouterMenu) => {
    const localNames = localRouterMenu.map(e => e.name)
    const _menu = []
    serverRouterMenu.map(e => {
      if (localNames.includes(e.name)) {
        // 匹配服务端关键词，同步本地组件路径
        let localItem = localRouterMenu.filter(l => l.name == e.name)[0]
        e.component = localItem.component
        if (localItem.alias) {
          // 临时单独处理
          e.alias = localItem.alias
        }
        if (e.children && e.children.length != 0) {
          e.children = fn(localItem.children, e.children)
        }
        _menu.push(e)
        return e
      }
    })
    return _menu
  }

  return fn(localRouterMenu, serverRouterMenu)
}

/** 异步获取的路由配置对象 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    children: renderMenu(localRouterMenu, getServerRouterMenu(), isLocalRouter)
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
