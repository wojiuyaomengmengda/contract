import { Component, reactive } from 'vue'

export interface EarlyWarningType {
  /**
   * tab名
   */
  name: string
  code: string
  /**
   * 文件名
   */
  path: Array<string>
  /**
   * 接口  后端给前端的api  可能有些不需要
   */
  api?: string | ((orgId: string) => string | undefined | null)

  component?: Component
  num?: number
}

export const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 警报类型合集
export const earlyWarningTabs: Partial<EarlyWarningType>[] = [
  // AMPD
  {
    name: 'AMPD',
    code: 'ampd',
    path: ['ampd', 'ampd-5.0'],
    api: 'ampd-server/ampdManagement/view/getUnprocessed',
    component: () => import('../comps/ampd.vue')
  },
  // 环境监测
  {
    name: '环境监测',
    code: 'environment-alarm',
    path: [
      'environment-dashboard',
      'environment-dashboard-5.0',
      'environmental-detection',
      'environmental-detection-5.0',
      'environment-energy-consumption-5.0'
    ],
    api: 'mthm-data/redPoint/getUnprocessedOfEnvironment',
    component: () => import('../comps/environmental-detection.vue')
  },
  // 天秤安全
  {
    name: '天秤安全',
    code: 'tower-crane',
    path: ['crane-safety', 'crane-safety-5.0'],
    api: (orgId) => {
      /**
       * 西城区地盘就不接口了
       */
      if (orgId === '1662385117182') {
        return undefined
      }
      return 'tower-crane/alarmData/getUnprocessedOfLibras'
    },
    component: () => import('../comps/crane-safety.vue')
  },
  // 智能锁
  {
    name: '智能锁',
    code: 'smart-lock',
    path: ['smart-lock', 'bluetooth-lock', 'bluetooth-lock-5.0'],
    api: 'alarm-dispatch-system/smart-lock/getUnprocessedOfLock',
    component: () => import('../comps/smart-lock.vue')
  },
  // 密闭空间
  {
    name: '密闭空间',
    code: 'confined-space',
    path: ['confined-space', 'confined-space2.0', 'confined-space-5.0'],
    api: 'alarm-dispatch-system/confinedSpace/getUnprocessedOfConfined',
    component: () => import('../comps/confined-space.vue')
  },

  // GPS户外人员
  {
    name: 'GPS户外人员',
    code: 'worker-status-new-5',
    path: ['worker-status-new', 'gps-watch-5.0'],
    api: 'alarm-dispatch-system/gps-outdoor-v5/getUnprocessed',
    component: () => import('../comps/worker-status-new.vue')
  },
  // 人员证书逾期警报
  {
    name: '人员证书逾期警报',
    code: 'employee_license_alarm',
    path: ['personnel-certificate-alert'],
    api: 'alarm-dispatch-system/employeeLicense/getUnprocessed',
    component: () => import('../comps/personnel-certificate-alert.vue')
  },
  // 废料倾倒
  {
    name: '废料倾倒',
    code: 'scr',
    path: ['dump-truck-monitoring', 'waste-dumping-5.0'],
    api: 'alarm-dispatch-system/sm-trip-ticket/getUnprocessed',
    component: () => import('../comps/dump-truck-monitoring.vue')
  },

  // SOS 工人实时定位
  {
    name: 'SOS工人实时定位',
    code: 'worker-positioning-5',
    path: [
      'worker-positioning',
      'worker-positioning-new',
      'personnel-location-5.0',
      'personnel-location1.0-5.0'
    ],
    api: 'alarm-dispatch-system/people-location-sos-v5/getUnprocessed',
    component: () => import('../comps/worker-positioning.vue')
  },

  // AI警报
  {
    name: 'AI警报',
    code: 'camera-alert',
    path: ['ai-channel-monitoring', 'ai-channel-monitoring-5.0'],
    api: 'mthm-data/camera-alert/getUnprocessed',
    component: () => import('../comps/ai-channel-monitoring.vue')
  },
  // LALG
  {
    name: 'LALG',
    code: 'lalg',
    path: ['lalg', 'lalg-screen-5.0'],
    api: 'happy-worker/screen/lalg/getUnprocessed',
    component: () => import('../comps/lalg.vue')
  },
  // E-Permit
  {
    name: 'E-permit',
    code: 'e-permit',
    path: ['e-permit', 'e-permit-5.0'],
    api: 'alarm-dispatch-system/permitMonitor/getUnprocessed',
    component: () => import('../comps/e-permit.vue')
  },
  // 防火监控
  {
    name: '防火监控',
    code: 'fire-alarm',
    path: ['fire-monitoring', 'fire-monitoring-5.0'],
    api: 'mthm-data/fire/alarm/getUnprocessedOfFireAlarm',
    component: () => import('../comps/fire-monitoring.vue')
  },

  // 树木倾斜管理
  {
    name: '树木倾斜管理',
    code: 'tree-alarm',
    path: ['tree-management', 'tree-management-5.0'],
    api: 'tree-manage/warning/getUnprocessedOfTree',
    component: () => import('../comps/tree-management.vue')
  },

  // 水位管理

  {
    name: '水位管理',
    code: 'water-alarm',
    path: ['water-management', 'water-management2.0', 'water-management-5.0'],
    api: 'alarm-dispatch-system/waterMonitor/getUnprocessed',
    component: () => import('../comps/water-management.vue')
  },

  // 工人状态
  {
    name: '工人状态',
    code: 'smart_watch',
    path: ['worker-status'],
    api: 'smart-watch/smart-watch-record/getUnprocessed',
    component: () => import('../comps/worker-status.vue')
  },
  // 机械360
  {
    name: '机械360',
    code: 'mechanical-360',
    path: ['machinery-360', 'machinery-360-5.0'],
    api: 'alarm-dispatch-system/mechanicalPanoramicMonitor/getUnprocessed',
    component: () => import('../comps/machinery-360.vue')
  },
  // 电工具
  {
    name: '电工具',
    code: 'electric-tools',
    path: ['electrical-tool', 'new-eletric-tool'],
    api: 'alarm-dispatch-system/electricTool/getUnprocessed',
    component: () => import('../comps/electrical-tool.vue')
  },
  // 水浸监测
  {
    name: '水浸监测',
    code: 'flood-monitor',
    path: [ 'flood-monitoring-5.0'],
    api: 'alarm-dispatch-system/floodMonitor/getUnprocessed',
    component: () => import('../comps/flood-monitor.vue')
  },
  {
    name: 'FallGuard',
    code: 'fall-guard',
    path: [ 'fall-guard-5.0'],
    api: 'alarm-dispatch-system/fall-guard/getUnprocessed',
    component: () => import('../comps/fall-guard.vue')
  },
]

export const codeApiMap = {
  // 天秤安全
  'tower-crane': {
    listApi: '/tower-crane/page',
    detailApi: '/tower-crane/detail'
  },
  // ampd
  ampd: {
    listApi: '/ampd/page',
    detailApi: '/ampd/detail'
  },
  // 智能锁
  'smart-lock': {
    listApi: '/smart-lock/page',
    detailApi: '/smart-lock/detail'
  },
  // 密闭空间
  'confined-space': {
    listApi: '/confinedSpace/page',
    detailApi: '/confinedSpace/detail'
  },
  // ai警报
  'camera-alert': {
    listApi: '/cameraAlertMonitor/page',
    detailApi: '/cameraAlertMonitor/detail'
  },
  // lalg
  lalg: {
    listApi: '/lalgMonitor/page',
    detailApi: '/lalgMonitor/detail'
  },
  // e-permit
  'e-permit': {
    listApi: '/permitMonitor/page',
    detailApi: '/permitMonitor/detail'
  },
  // 防火监控
  'fire-alarm': {
    listApi: '/fireMonitor/page',
    detailApi: '/fireMonitor/detail'
  },
  // 树木管理
  'tree-alarm': {
    listApi: '/treeMonitor/page',
    detailApi: '/treeMonitor/detail'
  },
  // 水位管理
  'water-alarm': {
    listApi: '/waterMonitor/page',
    detailApi: '/waterMonitor/detail'
  },
  // 工人状态
  smart_watch: {
    listApi: '/watchRecord/v1/page',
    detailApi: '/watchRecord/v1/detail'
  },
  // 机械360
  'mechanical-360': {
    listApi: '/mechanicalPanoramicMonitor/page',
    detailApi: '/mechanicalPanoramicMonitor/detail'
  },
  // 环境监测
  'environment-alarm': {
    listApi: '/environment/page',
    detailApi: '/environment/detail'
  },
  // 电工具
  'electric-tools': {
    listApi: '/electricTool/page',
    detailApi: '/electricTool/detail'
  },
  // GPS户外人员
  'worker-status-new-5': {
    listApi: '/gps-outdoor-v5/page',
    detailApi: '/gps-outdoor-v5/detail'
  },
  'employee_license_alarm': {
    listApi: '/employeeLicense/page',
    detailApi: '/employeeLicense/detail'
  },
  // 废料倾倒
  scr: {
    listApi: '/sm-trip-ticket/page',
    detailApi: '/sm-trip-ticket/detail'
  },
  // SOS工人实时定位
  'worker-positioning-5': {
    listApi: '/people-location-sos-v5/page',
    detailApi: '/people-location-sos-v5/detail'
  },

  // 水浸监测
  'flood-monitor': {
    listApi: '/floodMonitor/page',
    detailApi: '/floodMonitor/detail'
  },
  'fall-guard': {
    listApi: '/fall-guard/page',
    detailApi: '/fall-guard/detail'
  },
}
