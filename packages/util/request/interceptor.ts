import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import Message from '@arco-design/web-vue/es/message'
import { useTokenStore } from '@/util/store/oauth'
import { HttpResultModel } from './types'


const getTenantId = (): string | undefined => {
  const { hostname } = window.location;
  const tenantMap = new Map([
    ['market-test.szchenya.com', '1662024081509'], // 测试1
    ['market-test2.szchenya.com', '1662024081510'], // 测试2
    ['mte.c-smart.hk', '1662024091820'], // 美東邨 - 正式
    ['wcfe.c-smart.hk', '1662024083012'], // 长沙湾 - 正式
    ['tysan.c-smart.hk', '1662024092680'], // 泰昇地基(东涌42) 
    ['tysanltc42.c-smart.hk', '1662024092680'], // 泰昇地基(东涌42) 
    ['kudos.c-smart.hk', '1662024101560'], // 恒暉建築
    ['tc119.c-smart.hk','1662024111020'], // 东涌119
    ['hleoak.c-smark.hk','1662024120612'], // 橡树街- C-SMART
    ['j370.c-smart.hk','1662024120610'], // 东涌119
    ['wingfat.c-smart.hk','1662025020716'], // 榮發
    ['20230012.c-smart.hk','1662025020568'], // 鑽達
    ['nfcy-il7912.c-smart.hk','1662024122536'], // 南豐

  ]);
  return tenantMap.get(hostname);
}

// baseUrl
let baseUrl = 'https://test-gateway4.c-smart.hk/'

// 设置baseurl
export const setBaseUrl = (url: string) => {
  axios.defaults.baseURL = url
  baseUrl = url
}

axios.defaults.timeout = 60 * 10000
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, {
    indices: false
  })
}
axios.defaults.transformRequest = (data) => {
  return typeof data === 'object' ? qs.stringify(data) : data
}

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // todo: 按地区添加前缀baseUrl，注意业务侧对baseUrl的控制
    config.url = baseUrl + config.url
    if (config.headers) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
			config.headers['language'] = localStorage.getItem('language') || 'tc';

      // 添加csmartDsKey
      config.headers.csmartDsKey = 'csmart';
      config.headers.happyworkDsKey = 'happywork';
      config.headers.epermitDsKey = 'epermit';
      
      // 添加 tenantid
      if (getTenantId()) {
        config.headers.Tenantid = getTenantId();
      }

      const tokenStore = useTokenStore()
      if (tokenStore.access_token) {
        config.headers.Authorization = `Bearer ${tokenStore.access_token}`
      }
      // 如果数据为数组类型则转换为JSON格式
      if (config.data instanceof Array) {
        config.data = JSON.stringify(config.data)
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      }
    }
    return config
  },
  (error) => {
    // Message.error('服务器异常，请联系管理员。');
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResultModel>) => {
    const responseData = response.data
    if (responseData.code === 401) {
      Message.error({
        content: '登录超时，请重新登录。',
        onClose: () => {
          useTokenStore().reset()
          window.location.reload()
        }
      })
    } else if (responseData.code !== 200) {
      // Message.error(`服务器返回错误：${responseData.msg}`);
      return Promise.reject(responseData.msg)
    }
    return response
  },
  (error) => {
    // Message.error('请求超时或服务器异常，请检查网络或联系管理员。');
    return Promise.reject(error)
  }
)
