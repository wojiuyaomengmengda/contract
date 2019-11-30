import request from '../utils/request';
// 登录，登出，获取用户信息

// 登录
export function login(query) {
   let timestamp = new Date().getTime();
  return request({
    url: `/electronic-contract-api/api/enterpriseLogin/v1?timestamp=${timestamp}`,
    method: 'post',
    data: query,
    transformRequest: [function(data) {
        data = JSON.stringify(data)
        return data
    }],
    headers: {
        'Content-Type': 'application/json'
    },
  })
}

// 注册
export function enterpriseRegister(data) {
  let timestamp = new Date().getTime();
  return request({
    url: `/electronic-contract-api/api/enterpriseRegister/v1?timestamp=${timestamp}`,
    method: 'post',
    data: data
  })
} 

// 查询企业当前认证状态
export function queryEnterpriseCertificationStatus(data) {
  let timestamp = new Date().getTime();
  return request({
    url: `/electronic-contract-api/api/electronicContractCompany/queryEnterpriseCertificationStatus/v1?timestamp=${timestamp}`,
    method: 'post',
    data: data
  })
} 