/**
 * 预警消息查询参数
 */
export interface Pagination {
  pageNum?: number
  pageSize?: number
}

export interface EarlyWarningQuery extends Pagination {
  monitorCode?: string
  orgId?: number
  keyword?: string
  alarmLevel?: string
  alarmCode?: string
  handleStatus?: number
  startTime?: string
  endTime?: string
  largeScreenStatus?: number
  showStatus?: boolean
}
