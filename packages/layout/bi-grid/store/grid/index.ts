import { defineStore } from 'pinia'
import { BiGridState } from './types'

export const useBiGridStore = defineStore({
  id: 'bi-grid',
  state: (): BiGridState => ({
    isCanGridLeftMenuHide: true,
    
    gridOrgSearchPanelShow: false,
    isCanGridOrgSearchPanelHide: true,

    gridAiAssistantPanelShow: false,
    isCanGridAiAssistantPanelHide: false
  }),
  getters: {
  
  },
  actions: {
    setIsCanGridLeftMenuHide(isCan: boolean) {
      this.isCanGridLeftMenuHide = isCan;
    },
    setGridOrgSearchPanelShow(isShow: boolean) {
      this.gridOrgSearchPanelShow = isShow;
    },
    setIsCanGridOrgSearchPanelHide(isCan: boolean) {
      this.isCanGridOrgSearchPanelHide = isCan;
    },
    setGridAiAssistantPanelShow(isShow: boolean) {
      this.gridAiAssistantPanelShow = isShow;
    },
    setIsCanGridAiAssistantPanelHide(isCan: boolean) {
      this.isCanGridAiAssistantPanelHide = isCan;
    },
    reset() {
      this.$reset();
    },
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
