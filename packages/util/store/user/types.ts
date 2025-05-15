export interface UserPostModel {
  orgId: number
  orgName: string
  orgParentNameList: Array<string>
  userId: number
  postId: number
  postName: string
}

export interface UserRoleModel {
  orgId: number
  orgName?: string
  orgParentNameList?: Array<string>
  userId: number
  roleId: number
  roleName: string
  permissionIdList: Array<number>
}

export interface UserModel {
  id: number
  type: number
  account: string
  phoneCountryCode: string
  phone: string
  email: string
  weixin?: string
  name: string
  sex: number
  photo: string
  qrCode?: string
  enabled?: boolean
  needPhoneCaptcha?: boolean
  orgId?: number
  orgName?: string
  postId?: number
  postName?: string
  language?: string
  lang?: string
  postList?: Array<UserPostModel>
  roleList?: Array<UserRoleModel>
  style?: number;
}
