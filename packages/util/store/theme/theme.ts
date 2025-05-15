import { defineStore } from 'pinia'
import { Local } from '@/util/storage'

interface themeStoreTypes {
  isDark: boolean
}

export const themeStore = defineStore({
  id: 'theme',
  state: (): themeStoreTypes => ({
    isDark: false
  }),
  getters: {
    value: (state) => {
      return state.isDark
    }
  },
  actions: {
    insertTheme(data: boolean) {
      Local.set('isDark', data)
      this.isDark = data
    }
  }
})
