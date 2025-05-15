import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useTokenStore } from '@/util/store/oauth'


const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Grid',
    component: () => import('../src/grid-demo.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes
})

router.beforeEach((to, from, next) => {
  // NProgress.configure({ showSpinner: false })
  // NProgress.start()
  // const tokenStore = useTokenStore()
  // if (tokenStore.access_token) {
  //   next()
  // } else {
  //   window.location.replace('/home/#/')
  // }
})

// 路由加载后
router.afterEach(() => {
  NextLoading.done()
  NProgress.done()
})

// 导出路由
export default router
