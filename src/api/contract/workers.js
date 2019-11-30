import request from '../../utils/request';
// 工人合同

// 查询工程签约的合同信息列表
export function QueryProjectSignContractInfoList(data) {
   let timestamp = new Date().getTime();
  return request({
    url: `/electronic-contract-api/api/electronicContract/queryProjectSignContractInfoList/v1?timestamp=${timestamp}`,
    method: 'post',
    data,
  })
}