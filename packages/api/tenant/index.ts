import axios from 'axios'
import { HttpResultModel } from '@/util/request/types'

export interface TenantModel {
  id: number
  name: string
  domain: string
  useCompanyRole: boolean
  useCompanyPatrolConfig: boolean
  useThirdLogin: boolean
  enabled: boolean
}

export const tenantApi = {
  getById: async () => {
    return (await axios.get<HttpResultModel<TenantModel>>('common/tenant/getById')).data.data
  }
}
