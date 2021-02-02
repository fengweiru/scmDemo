import { parse } from 'querystring'
import { systemName } from '@/config/default'
/**
 * 格式化菜单
 * @param menuData
 * @return 返回格式化后的菜单数据
 */
export function formatMenu(menuData) {
  const fn = (menuData) => {
    if (!menuData) return null
    let newMenuData = menuData
      .filter((i) => i.type == 1)
      .map((e) => {
        const query = parse(e.path.split('?')[1]) // 路由参数
        const param = {
          ...query,
          path: e.path.split('?')[0], // 路径
          name: e.name,
          meta: { title: e.description, icon: e.img, keepAlive: false },
          children: fn(e.children),
          hideChildrenInMenu: e.hideChildrenInMenu == 1 ? false : true,
          hidden: e.hidden == 1 ? false : true,
          redirect: e.redirect,
        }
        return param
      })
    return newMenuData
  }
  return fn(menuData)
}

/**
 * 校验权限相关的key是否存在
 * @param key
 * @return 返回是否
 */
export function checkKey(key, dataArr, moduleName = systemName) {
  debugger
  let data
  if (!dataArr) {
    let authInfo = localStorage.getItem('auth-info')
    if (authInfo) {
      let menu = JSON.parse(authInfo).modules.filter((e) => e.name == moduleName)[0]
      if (!menu) {
        data = []
      } else {
        data = menu.categories || []
      }
    } else {
      data = []
    }
  } else {
    data = [...dataArr]
  }
  let keyArr = []
  const fn = (menuData) => {
    if (!menuData) return []
    menuData.forEach((e) => {
      if (e.children) {
        fn(e.children)
      }
      if (e.type != 1) {
        keyArr.push(e.name)
      }
    })
  }
  fn(data)
  return keyArr.includes(key)
}
