/* eslint-disable @typescript-eslint/ban-types */
import { defineStore, type Pinia } from 'pinia'
import { UserModel, UserRoleModel } from '@/util/store/user/types'
import api from '@/api/base'
import { isMarketization } from '@/util/common/projectType'

export const createUserStore = (options: {
  state?: Partial<UserModel>,
  getters?: Record<string, Function>
  actions?: Record<string, Function>
} = {}) => defineStore('smartUser', {
  state: (): UserModel => ({
    id: 0,
    type: 0,
    account: '',
    phone: '',
    email: '',
    name: '',
    sex: 3,
    photo: '',
    lang: '',
    language: '',
    phoneCountryCode: '',
    style: 1,
    ...options.state
  }),
  getters: {
    value: (state) => {
      return { ...state };
    },
    ...options.getters
    // language: (state) => state.language,
  },
  actions: {
    async init() {
      const resultData = await api.getUserById()
      if (resultData) {
        if (resultData.enabled) {
          this.$patch(resultData)
          return resultData
        }
        throw new Error('账号被禁用，请联系系统管理员')
      } else {
        throw new Error('获取用户信息失败')
      }
    },
    setlanguage(key: string, isReload = false, callback?: () => Promise<any>) {
      // 新利项目 ts 繁体中文 sc 简体中文 en 英文
      // CSMART tc 繁体中文 sc 简体中文 en 英文
      const language = ((process.env.PROJECT_NAME === 'sunley' || isMarketization()) && key === 'tc') ? 'ts' : key
      this.$state.language = language;

      const parms = {
        id: this.$state.id,
        language,
      };
      localStorage.setItem('language', key);
      api.setUserLanguage(parms).finally(() => {
        if (isReload) {
          if (callback) {
            callback().then(() => {
              window.location.reload();
            });
          } else {
            window.location.reload();
          }
        }
      });
    },
    setValue(partial: Partial<UserModel>) {
      this.$patch(partial)
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

export const useUserStore = createUserStore()