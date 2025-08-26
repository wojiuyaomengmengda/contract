import axios from 'axios'
import '@/util/request/interceptor'
import { HttpResultModel } from '@/util/request/types'

export default {
  // 香港极端天气 
  getHkExtremeWeather: async (params: { type: string }) => {
    return (
      await axios.get<HttpResultModel<any>>(`ampd-server/hkWeather/getHkWarningWeather`, { params })
    ).data.data;
  },
 
  // 香港天气
  getHkRealtimeWeather: async (params: { orgId: number, lang: string }) => {
    return (
      await axios.get<HttpResultModel>(`weather/hkWeather/getRealtime?type=${params.lang ? params.lang : 'tc'}`)
    ).data.data;
  },

  // 根据组织获取近段时间天气信息
  getRangDateweather: async (params: { lang: string }) => {
    return (
      await axios.get<HttpResultModel>(`weather/hkWeather/getHkWeather?type=${params.lang ? params.lang : 'tc'}`)
    ).data.data;
  },

  // 
  getMacaoRealtimeWeather: async (params: { orgId: number, lang: string }) => {
    return (
      await axios.get<HttpResultModel>(`weather/MacaoWeather/getRealtimeWeather?type=${params.lang ? params.lang : 'tc'}`)
    ).data.data;
  },

  getMacaoWeathericon: async (params: { type: string }) => {
    return (await axios.get<HttpResultModel<any>>(`ampd-server/MacaoWeather/getMacaoSpecialWeather`, { params })).data
      .data;
  },
}