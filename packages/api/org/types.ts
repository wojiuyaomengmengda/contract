// 地盘列表查询参数
export interface OrgQuery {
  id?: number
  typeList?: string[] // 1-组织 2-项目 3-部门
  enabled?: boolean // 是否启用
  region?: number // 1-内地 2-澳门 3-香港
  isCompleted?: number | null // 0-在建 1-已完工
  isMajor?: boolean // 是否重点地盘
  removeRegions?: number
}

// 地盘信息
export interface OrgModel {
  id: number
  type: number // 地盘类型
  name: string // 地盘名称
  fullName: string // 地盘全名
  areaId: number // 区域id
  address: string // 地盘地址
  lngLat: string // 经纬度
  isEnabled: boolean // 是否启用
  parentId: number // 地盘父级id
  parentIdList: number[] // 地盘父级id集合
  level: number // 项目等级 1-集团展示级 2-子公司推广级 3-履约级
  isCompleted: number // 是否完工
  icon?: string
  projectCount: number // 项目数量
  children: OrgModel[]
  region: number // 1-内地 2-澳门 3-香港
  isMajor: number // 是否重点地盘
}

// 地盘详情
export interface OrgDetail {
  orgId: number
  orgName: string
  isCompleted: boolean
  startDate: string
  endDate: string
  effectPicture: string // 效果图
  address: string // 地盘地址
  // zx: string
  // sj: string
  // gcjs: string
  // xmjs: string
  [key: string]: any
}