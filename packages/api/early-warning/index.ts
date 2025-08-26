import axios from 'axios'
import '@/util/request/interceptor'
import { HttpResultModel } from '@/util/request/types'

const alarmName = 'alarm-dispatch-system';


export default {
	// 警报详情
	getAlarmDetail: async (data: any) => {
		return (
			await axios.post<HttpResultModel<boolean>>(`${alarmName}${data.api}`, JSON.stringify(data), {
				headers: { 'Content-Type': 'application/json;charset=UTF-8' },
			})
		).data.data;
	},

  getAlarmList: async (data: any) => {
		return (
			await axios.post<HttpResultModel<any>>(`${alarmName}${data.api}`, JSON.stringify(data), {
				headers: { 'Content-Type': 'application/json;charset=UTF-8' },
			})
		).data.data;
  },
	
	// feat:警报消息3.6 获取警报项
	getAlarmTypes: async (params: any) => {
		return (await axios.get<HttpResultModel<any>>(`${alarmName}/v1/common/listByMonitorCode`, { params: { monitorCode: params.monitorCode } })).data.data;
	},

  getRedPointNumApi: async (params: any) => {
    return (await axios.get<HttpResultModel<any>>( params.api , { params })).data.data;
  },
};
