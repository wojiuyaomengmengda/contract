import { createApp } from 'vue'
import arcoDesign from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import mitt from 'mitt'
import store from '@/util/store'

import App from './grid-demo.vue'
import Router from '../router/index'
import '@arco-design/web-vue/dist/arco.css'
import BIUI from '../packages'
// import '@/assets/fonts/alifont/iconfont.css'
import './style.scss'

const app = createApp(App)

app.use(store)
app.use(ArcoVueIcon)
app.use(arcoDesign)
app.use(BIUI, {
	baseUrl: 'https://test-gateway4.c-smart.hk/',
})
app.use(Router)
app.config.globalProperties.mittBus = mitt()

app.mount('#app')
