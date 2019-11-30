import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login2/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/certification',
    component: () => import('@/views/certification'),
    hidden: true
  },

  {
    path: '/signUp',
    component: () => import('@/views/signUp/index'),
    hidden: true
  },

  {
    path: '/registered',
    component: () => import('@/views/registered'),
    hidden: true,
    children: [
      {
        path: '/',
        name: 'qiye',
        component: () => import('@/views/registered/qiye')
      },
      {
        path: '/geren',
        component: () => import('@/views/registered/geren')
      },
      {
        path: '/moneyInfo',
        component: () => import('@/views/registered/moneyInfo')
      },
      {
        path: '/money',
        component: () => import('@/views/registered/money')
      },
      {
        path: '/success',
        component: () => import('@/views/registered/success')
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { 
          title: '首页',
          icon: 'dashboard',
          roles: ['admin', 'unauthorized', 'editor']
        }
      }
    ]
  },

  {
    path: '/contract',
    component: Layout,
    redirect: '/contract/subcontract',
    name: 'Contract',
    meta: { 
      title: '合同管理', 
      icon: 'excel', 
      roles: ['admin']
    },
    children: [
      {
        path: 'subcontract',
        name: 'Subcontract',
        component: () => import('@/views/contract/subcontract/index'),
        meta: { title: '分包合同管理' },
        children: [
          {
            path: 'signedContract',
            name: 'contractSignedContract',
            component: () => import('@/views/contract/subcontract/components/page/signedContract'),
            meta: { title: '查看待签订合同' },
            hidden: true
          },
          {
            path: 'subcontractList',
            name: 'contractSubcontractList',
            component: () => import('@/views/contract/subcontract/components/page/subcontractList'),
            meta: { title: '查看已签订合同' },
            hidden: true,
            children: [
              {
                path: 'historyList',
                name: 'contractHistoryList',
                component: () => import('@/views/contract/subcontract/components/page/historyList'),
                meta: { title: '历史合同' },
                hidden: true
              }
            ]
          },
        ]
      },
      {
        path: '/team',
        name: 'Team',
        component: () => import('@/views/contract/team/index'),
        meta: { title: '班组合同管理', keepAlive: true },
        roles: ['admin'],
        children: [
          {
            path: 'signedContract',
            name: 'teamSignedContract',
            component: () => import('@/views/contract/team/components/page/signedContract'),
            meta: { title: '查看待签订合同', keepAlive: true },
            hidden: true
          },
          {
            path: '/cancelList',
            name: 'teamCancelList',
            component: () => import('@/views/contract/team/components/page/cancelList'),
            meta: { title: '查看已取消合同', keepAlive: true },
            hidden: true
          },
          {
            path: 'subcontractList',
            name: 'teamSubcontractList',
            component: () => import('@/views/contract/team/components/page/subcontractList'),
            meta: { title: '查看已签订合同', keepAlive: true },
            hidden: true,
            children: [
              {
                path: 'historyList',
                name: 'teamHistoryList',
                component: () => import('@/views/contract/team/components/page/historyList'),
                meta: { title: '历史合同', keepAlive: true },
                hidden: true
              }
            ]
          },
        ]
      },
      {
        path: '/workers',
        name: 'Workers',
        component: () => import('@/views/contract/workers/index'),
        meta: { title: '工人合同管理', keepAlive: true},
        children: [
          {
            path: 'signedContract',
            name: 'workersSignedContract',
            component: () => import('@/views/contract/workers/components/page/signedContract'),
            meta: { title: '查看待签订合同', keepAlive: true },
            hidden: true
          },
          {
            path: '/cancelList',
            name: 'workersCancelList',
            component: () => import('@/views/contract/workers/components/page/cancelList'),
            meta: { title: '查看已驳回合同', keepAlive: true },
            hidden: true
          },
          {
            path: 'subcontractList',
            name: 'workersSubcontractList',
            component: () => import('@/views/contract/workers/components/page/subcontractList'),
            meta: { title: '查看已签订合同', keepAlive: true },
            hidden: true,
            children: [
              {
                path: 'contractList',
                name: 'workersContractList',
                component: () => import('@/views/contract/workers/components/page/contractList'),
                meta: { title: '历史合同', keepAlive: true },
                hidden: true
              }
            ]
          },
        ]
      },
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example', roles: ['admin'] },
    hidden: true,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
