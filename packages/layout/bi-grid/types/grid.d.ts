import { OrgModel } from '@/api/org/types'
import { Component, ShallowRef } from 'vue'

export interface GridOptions {
  data: any
  getComponent: any
  showMenu: boolean
  orgName: string
  isAdapter: boolean
  showAlarm: boolean
  px2rem: boolean // 是否进行px转rem
  orgId: number
  customGrid: string | Component
  collpased: boolean
  menus: any[]
  scrrenGroup: {
    name: string
    screenList: any
    subIcon: string
    icon: string
  }
  renderData: any
  gridOrgSearchPanelShow: boolean
  gridAiAssistantPanelShow: boolean
  logoUrl: string
  showLogo: boolean
}

export interface gridComponents {
  GirdLeftMenu: typeof import('../components/GirdLeftMenu.vue')
  Weather: typeof import('../components/Weather.vue')
  GirdHeaderMenu: typeof import('../components/GirdHeaderMenu.vue')
  GridHeadFoldMenu: typeof import('../components/GridHeadFoldMenu.vue')
  GirdLogo: typeof import('../components/GirdLogo.vue')
  GridCompanyName: typeof import('../components/GridCompanyName.vue')
  GridHeadAdmin: typeof import('../components/GridHeadAdmin.vue')
  GridHeadAlarm: typeof import('../components/GridHeadAlarm.vue')
  GridHeadAiAssistant: typeof import('../components/GridHeadAiAssistant.vue')
  GridHeadPersonal: typeof import('../components/GridHeadPersonal.vue')
  GirdMainContent: typeof import('../components/GirdMainContent.vue')
  GridOrgSearchPanel: typeof import('../components/GridOrgSearchPanel.vue')
  GridAiAssistantPanel: typeof import('../components/GridAiAssistantPanel.vue')
}

export interface GridMethods {
  onOrgSelect?: (orgRecord: OrgModel) => void
}
