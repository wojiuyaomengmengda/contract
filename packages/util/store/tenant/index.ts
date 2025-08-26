/* eslint-disable @typescript-eslint/ban-types */
import { defineStore } from 'pinia'
import { tenantApi, TenantModel } from '@/api/tenant'

export const createTenantStore = (options: {
  state?: Partial<TenantModel>
  actions?: Record<string, Function>
  getters?: Record<string, Function>
} = {}) => defineStore('smartTenant', {
  state: (): TenantModel => ({
    id: 0,
    name: '',
    domain: '',
    useCompanyRole: false,
    useCompanyPatrolConfig: false,
    useThirdLogin: false,
    enabled: true,
    ...options.state
  }),
  actions: {
    async init() {
      const resultData = await tenantApi.getById()
      if (resultData) {
        if (resultData.enabled) {
          this.$patch(resultData)
        } else {
          throw new Error('租户被禁用，请联系系统管理员')
        }
      } else {
        throw new Error('获取租户信息失败')
      }
    },
    reset() {
      this.$reset()
    },
    ...options.actions
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage
      }
    ]
  }
})

export const useTenantStore = createTenantStore()