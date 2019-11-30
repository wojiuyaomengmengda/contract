import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  let user = localStorage.getItem('user')
  // console.log(user)
  // const hasToken = getToken()
  // console.log(hasToken,'hasToken')
  if (user) {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    store.dispatch('user/setUserInfo', userInfo)
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }  else {
      const vStatus = userInfo.verificationStatus
      // console.log(vStatus,'vstatus')
      if (vStatus) {
        next()
      } else {
        try {
          const { verificationStatus } = await store.dispatch('user/queryEnterpriseCertificationStatus');
          // console.log(verificationStatus, 'verificationStatus')
          // get user info
          // console.log(verificationStatus, 'permission');
          if ( verificationStatus < 4 ) {
            next()
          } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        } catch (error) {
          console.log('23333')
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log('111')
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      console.log('222')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
