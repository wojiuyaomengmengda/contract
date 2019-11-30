import request from '../utils/request';
// 首页相关接口

// 查询首页数据源 - 头部
export function QueryIndexDataSourceTotal(data) {
   let timestamp = new Date().getTime();
  return request({
    url: `/electronic-contract-api/api/electronicContract/queryIndexDataSourceTotal/v1?timestamp=${timestamp}`,
    method: 'post',
    data,
  })
}
 