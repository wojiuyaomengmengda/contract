/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-cycle */
import { defineStore } from 'pinia'
import { OauthModel, LoginModel } from '@/util/store/oauth/types'
import api from '@/api/oauth'
import { merge } from 'lodash-es'

export const createTokenStore = (options: {
  state?: Partial<OauthModel>,
  actions?: Record<string, Function>
  getters?: Record<string, Function>
} = {}) => {
  return defineStore({
    id: 'smartOauth',
    state: (): OauthModel => (merge({
      access_token: '',
      refresh_token: '',
      scope: '',
      token_type: '',
      ...options.state
    }, options.state)),
    actions: {
      // eslint-disable-next-line consistent-return
      async init(tenantId: number, username: string, password: string, captcha: string, code?: string, type?: string) {
        const res = await api.getToken(tenantId, username, password, captcha, code, type);
        if (res) {
          this.$patch(res);
          return res
        }
      },
      async initByFeishu(tenantId: number, code: string) {
        console.log('initByFeishu', code)
        const res = await api.getTokenByFeishu(tenantId, code);
        if (res) {
          this.$patch(res);
          return res
        }
      },
      set(mode: Partial<OauthModel>) {
        this.$patch(mode)
      },
      reset() {
        this.$reset()
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
}

export const useTokenStore = createTokenStore()