/* eslint-disable @typescript-eslint/ban-types */
import { defineStore, type Pinia } from 'pinia'
import { pathState } from '@/util/store/path/types'

export const createPathStore = (options: {
  state?: Partial<pathState>,
  getters?: Record<string, Function>
  actions?: Record<string, Function>
} = {}) => defineStore({
  id: 'path',
  state: (): pathState => ({
    path: '',
    description: '',
    ...options.state
  }),
  getters: {
    value: (state) => {
      return state.path
    },
    desValue: (state) => {
      return state.description
    },
    ...options.getters
  },
  actions: {
    setValue(data: string): void {
      this.path = data
    },
    setDesValue(data: string): void {
      this.description = data
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


export const usePathStore = createPathStore()