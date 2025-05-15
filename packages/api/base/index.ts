import { isProdEnv } from '@/util/common'
import axios from 'axios'
import '@/util/request/interceptor'
import { HttpResultModel } from '@/util/request/types'
import { OrgModel } from '@/util/store/org/types'
import { UserModel, UserRoleModel } from '@/util/store/user/types'
import { ScreenModel } from '@/util/store/screen/types'

const primaryName = 'base'
interface setlangModel {
  id: number;
  language?: string;
  style?: number;
}

export default {
  listTree: async (params: any) => {
    return (
      await axios.get<HttpResultModel<Array<OrgModel>>>(`${primaryName}/org/listTreeByLanguage`, { params })
    ).data.data
  },
  getUserById: async () => {
    return (await axios.get<HttpResultModel<UserModel>>(`${primaryName}/user/getById`)).data.data
  },
  getUserRoleListAl: async (orgId: number) => {
    return (
      await axios.get<HttpResultModel<UserRoleModel>>(`${primaryName}/userRole/getByOrgId`, {
        params: { orgId }
      })
    ).data.data
  },
  orgInfo: async (id: number) => {
    return (
      await axios.get<HttpResultModel<OrgModel>>(`project/info/getById`, {
        params: { id }
      })
    ).data.data
  },
  scrrenListTree: async (orgId: number, language: string) => {
    return (
      await axios.get<HttpResultModel<any>>(`${primaryName}/screenGroup/listTree`, {
        params: { orgId, language }
      })
    ).data.data
  },

  // 获取语言列表
  getLanguageList: async (params: { tenantId: string }) => {
    return (
      await axios.get<HttpResultModel<any>>(`${isProdEnv() ? 'base' : 'base-new'}/v5/i18n/language`, {
        params
      })
    ).data.data
  },

  // 获取语言字典
  getLanguageDict: async (params: { tenantId: string }) => {
    return (
      await axios.get<HttpResultModel<any>>(`${isProdEnv() ? 'base' : 'base-new'}/v5/i18n/getI18nJson`, {
        params
      })
    ).data.data
  },

  setUserLanguage: async (params: setlangModel) => {
    return (
      await axios.get<HttpResultModel<OrgModel>>(`${primaryName}/user/setUserLanguage`, {
        params,
      })
    ).data.data;
  },

  /**
   * 获取地盘logo
   * @param params 
   * @returns 
   */
  getLogo: async (params: { orgId?: number }) => {
    return (
      await axios.get<HttpResultModel<any>>(`${isProdEnv() ? 'base' : 'base-new'}/org/v5/getLogo`, {
        params
      })
    ).data.data
  },

  // 获取地盘logo - new
  getLogoById: async (id: string) => {
    return (await axios.get<any>('common/loginConfig/getById', { params: { id } }))
        .data.data;
  },
}
