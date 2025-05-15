/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/ban-types */
import { defineStore } from 'pinia'
import { UserRoleModel } from '@/util/store/user/types'
import api from '@/api/base'

export const createUserRoleStore = (options: {
  state?: Partial<UserRoleModel>
  actions?: Record<string, Function>
} = {}) => defineStore('smartUserRole', {
  state: (): UserRoleModel => ({
    orgId: 0,
    userId: 0,
    roleId: 0,
    roleName: '',
    permissionIdList: [],
    ...options.state
  }),
  actions: {
    async init(id: any) {
      const resultData = await api.getUserRoleListAl(id)
      if (resultData) {
        this.$patch(resultData)
      } else {
        throw new Error('获取用户权限信息失败')
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

export const useUserRoleStore = createUserRoleStore()