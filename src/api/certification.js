import request from '../utils/request';
// 企业认证相关接口

// 企业认证-->查询企业（组织机构信息+法定代表人信息）
export function QueryCompanyInfo(query) {
    let timestamp = new Date().getTime();
   return request({
     url: `/electronic-contract-api/api/electronicContractCompany/queryCompanyInfo/v1?timestamp=${timestamp}`,
     method: 'post',
     data: query,
   })
 }

 // 企业认证API接口
 export function CompanyVerification(query) {
    let timestamp = new Date().getTime();
   return request({
     url: `/electronic-contract-api/api/electronicContractCompany/companyVerification/v1?timestamp=${timestamp}`,
     method: 'post',
     data: query,
   })
 }

  // 发起电子合同经办人身份验证
  export function PersonChargeVerification(query) {
    let timestamp = new Date().getTime();
    return request({
      url: `/electronic-contract-api/api/electronicContractPersonCharge/personChargeVerification/v1?timestamp=${timestamp}`,
      method: 'post',
      data: query,
    })
 }

 // 电子合同经办人身份证验证，采用手机短信验证码验证
  export function PersonChargeVerifySmsCode(query) {
    let timestamp = new Date().getTime();
    return request({
      url: `/electronic-contract-api/api/electronicContractPersonCharge/personChargeVerifySmsCode/v1?timestamp=${timestamp}`,
      method: 'post',
      data: query,
    })
  }

// 手机短信认证完成之后进行 发起企业实名认证校验
  export function SponsorRealNameRecognition(query) {
    let timestamp = new Date().getTime();
    return request({
      url: `/electronic-contract-api/api/electronicContractCompany/sponsorRealNameRecognition/v1?timestamp=${timestamp}`,
      method: 'post',
      data: query,
    })
  }

  // 获取公司认证流程Id
  export function QueryCompanyVerificationFlowId(data) {
    let timestamp = new Date().getTime();
    return request({
      url: `/electronic-contract-api/api/electronicContractCompany/queryCompanyVerificationFlowId/v1?timestamp=${timestamp}`,
      method: 'post',
      data,
    })
  }

  // 发起随机金额打款
  export function InitiatePaymentCertification(data) {
    let timestamp = new Date().getTime();
    return request({
      url: `/electronic-contract-api/api/electronicContractCompany/initiatePaymentCertification/v1?timestamp=${timestamp}`,
      method: 'post',
      data,
    })
  }

  // 查询打款银行账号信息
  export function QueryBankInformation(data) {
    let timestamp = new Date().getTime();
    return request({
      url: `/electronic-contract-api/api/electronicContractCompany/queryBankInformation/v1?timestamp=${timestamp}`,
      method: 'post',
      data,
    })
  }

  // 查询打款进度
  export function QueryPaymentProgress(data) {
    let timestamp = new Date().getTime();
    return request({
      url: `/electronic-contract-api/api/electronicContractCompany/queryPaymentProgress/v1?timestamp=${timestamp}`,
      method: 'get',
      data,
    })
  }

  // 【WEB-API】核实付款金额
  export function VerificationPaymentAmount(data) {
    let timestamp = new Date().getTime();
    return request({
      url: `/electronic-contract-api/api/electronicContractCompany/verificationPaymentAmount/v1?timestamp=${timestamp}`,
      method: 'post',
      data,
    })
  }