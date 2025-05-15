import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { piniaPluginInjectData } from "../piniaPluginInjectData";

// 创建一个函数来获取store实例
export const getStore = () => {
  const store = createPinia()
  store.use(piniaPluginPersist)
  store.use(piniaPluginInjectData('smartUser'))
  return store
}

// 导出默认store实例
export default getStore()
