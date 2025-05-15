import type { Component, App, Plugin } from 'vue'
import { getStore } from '@/util/store'
import mitt from 'mitt'
import { setBaseUrl } from '@/util/request/interceptor'
// 导出store
import { createPathStore, usePathStore } from '@/util/store/path'
import { createTokenStore, useTokenStore } from '@/util/store/oauth'
import { createOrgStore, useOrgStore } from '@/util/store/org'
import { createScreenStore, useScreenStore } from '@/util/store/screen'
import { createScreenTreeStore, useScreenTreeStore } from '@/util/store/scrren-tree'
import { createTenantStore, useTenantStore } from '@/util/store/tenant'
import { createUserStore, useUserStore } from '@/util/store/user'
import { createUserRoleStore, useUserRoleStore } from '@/util/store/user-role'
import { checkPermission } from '@/util/common'
import { checkImageAccess } from '@/util/common/image'
import { getCurrentScreen } from '@/util/screen'
import { Local, Session } from '@/util/storage'
import crypto from '@/util/crypto'
import { useGridContext } from './layout/bi-grid/context'

import BIGrid from './layout/bi-grid/Grid.vue'
import BILayout from './layout/bi-grid/grid/layout/index.vue'
import BILayout2 from './layout/bi-grid/grid/layout2/index.vue'
import '@/assets/scss/index.scss'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BILayout: typeof BILayout
    BILayout2: typeof BILayout2
    BIGrid: typeof BIGrid
  }
}
const components: {
  [propName: string]: Component
} = {
  BILayout,
  BILayout2,
  BIGrid
}

// vue插件
// - install：每个插件都有一个 install 方法
// - 参数：是通过 Vue.createApp() 创建的 app 实例
const install: Plugin = (
  app: App,
  options: {
    baseUrl: string
    projectNameEnv: string
  }
) => {
  setBaseUrl(options?.baseUrl ?? '')

  // 安全初始化
  if (typeof window !== 'undefined') {
    const customWindow = window

    // 保留现有配置
    customWindow.__CUS_PROJECT_CONFIG__ = customWindow.__CUS_PROJECT_CONFIG__ || {}

    // 设置默认值（仅当属性不存在时）
    if (!customWindow.__CUS_PROJECT_CONFIG__.projectNameEnv) {
      customWindow.__CUS_PROJECT_CONFIG__.projectNameEnv = 'sunley'
    }

    // 应用选项（如果提供）
    if (options?.projectNameEnv) {
      customWindow.__CUS_PROJECT_CONFIG__.projectNameEnv = options.projectNameEnv
    }
  }

  app.config.globalProperties.mittBus = app.config.globalProperties.mittBus || mitt()

  // 使用新的store实例
  app.use(getStore())

  // 注册组件
  Object.entries(components).forEach(([key, component]) => {
    app.component(key, component)
  })
}

// 导出store
export {
  usePathStore,
  useTokenStore,
  useOrgStore,
  useScreenStore,
  useScreenTreeStore,
  useTenantStore,
  useUserStore,
  useUserRoleStore,
  createPathStore,
  createTokenStore,
  createOrgStore,
  createScreenStore,
  createScreenTreeStore,
  createTenantStore,
  createUserStore,
  createUserRoleStore
}
// 导出方法
export {
  checkPermission,
  getCurrentScreen,
  crypto,
  Local,
  Session,
  checkImageAccess,
  useGridContext
}

// 按需引入组件
export { BIGrid, BILayout, BILayout2 }

export type {} from './components'
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
