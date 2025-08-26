/* eslint-disable @typescript-eslint/ban-types */
import { defineStore } from 'pinia'
import { ScreenModel } from '@/util/store/screen/types'
import { useOrgStore } from '../org/index'


export const createScreenStore = (options: {
  state?: Record<string, Array<ScreenModel>>
  getters?: Record<string, Function>
  actions?: Record<string, Function>
} = {}) => defineStore({
  id: 'screen',
  state: (): Record<string, Array<ScreenModel>> => ({ ...options.state }),
  getters: {
    value(state: Record<string, Array<ScreenModel>>) {
      const orgStore = useOrgStore()
      return this.$state[orgStore.value.id]
    },
    ...options.getters
  },
  actions: {
    setValue(data: Array<ScreenModel>): void {
      const orgStore = useOrgStore()
      this.$state[orgStore.value.id] = data
    },
    ...options.actions
  },

  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage
      }
    ]
  }
})

export const useScreenStore = createScreenStore()