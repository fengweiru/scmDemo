import { BlankLayout } from '@/layouts'
/** 本地路由模块配置 */
export const localRouterMenu = [
  {
    path: '/base',
    name: 'base',
    alise: '/base/carrier',
    meta: { title: '基础数据', keepAlive: false },
    component: BlankLayout,
    children: [
      {
        path: '/base/carrier',
        name: 'base.carrier',
        component: () => import('@/views/base/carrier'),
        meta: { title: '物流承运商', keepAlive: false },
      },
    ],
  },
]
