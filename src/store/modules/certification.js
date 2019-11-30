// import { login, logout, getInfo } from '@/api/user'
import { CompanyVerification } from '@/api/certification'

const state = {
    companyName: '',        //企业名称
    organizationCode: '',   // 企业统一社会信用代码
    personChargeId: '',    //# 经办人Id
    accountId: '',          //# e签宝第三方账号Id
    orgId: ''              //# e签宝第三方企业账号Id
}

const mutations = {
  SET_COMPANYNAME: (state, companyName) => {
    state.companyName = companyName
  },
  SET_ORGANIZATIONCODE: (state, organizationCode) => {
    state.organizationCode = organizationCode
  },
  SET_PERSONCHARGEID: (state, personChargeId) => {
    state.personChargeId = personChargeId
  },
  SET_ACCOUNTID: (state, accountId) => {
    state.accountId = accountId
  },
  SET_ORGID: (state, orgId) => {
    state.orgId = orgId
  }
}

const actions = {
  // 企业认证 （personChargeId:经办人id，accountId:e签宝第三方账号，orgId:e签宝第三方企业账号）
  companyVerification({ commit }, data) {
    commit('SET_PERSONCHARGEID', data.personChargeId)
    commit('SET_ACCOUNTID', data.accountId)
    commit('SET_ORGID', data.orgId)
  },
  companyName({ commit }, data) {
    commit('SET_COMPANYNAME', data.companyName)
    commit('SET_ORGANIZATIONCODE', data.organizationCode)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
