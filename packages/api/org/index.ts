import '@/util/request/interceptor';
import axios from 'axios';
import { HttpResultModel } from '@/util/request/types';
import { OrgModel, OrgQuery, OrgDetail } from './types';
import { isProdEnv } from '@/util/common'

const prefix = isProdEnv() ? 'project' : 'project-new'

// 地盘列表
export const orgListApi = async (params?: OrgQuery) => {
  return (
    await axios.get<HttpResultModel<OrgModel[]>>(`${prefix}/orgProject/v5/listTreeByUser`, { params })
  ).data.data
}

// 保存最近使用地盘 /projectInfo/saveHistoryProgram
export const saveRecentlyloggedinApi = async (params:any) => {
  return (
    await axios.post<HttpResultModel<any>>(`mthm-data/projectInfo/saveHistoryProgram`,params )
  ).data.data
}