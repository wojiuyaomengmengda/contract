// import { login, logout, getInfo } from '@/api/user'
import { queryEnterpriseCertificationStatus, login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: '',
  currId: '',
  roleId: '',
  userId: '',
  userName: '',
  verificationStatus: '', //# 认证状态;  0= 未认证(默认); 1= 经办人认证通过,未填写打款信息; 2= 打款信息以填写，未回填; 3=认证通过;
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_CURRID: (state, currId) => {
    state.currId = currId
  },
  SET_ROLEID: (state, roleId) => {
    state.roleId = roleId
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_VERIFICATIONSTATUS: (state, verificationStatus) => {
    state.verificationStatus = verificationStatus
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //       console.log(data)
  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar, roles } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       commit('SET_ROLES', roles)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout登出
  logout({ commit, state }) {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ROLES', '')
        commit('SET_CURRID', '')
        commit('SET_ROLEID', '')
        commit('SET_USERID', '')
        commit('SET_USERNAME', '')
        commit('SET_VERIFICATIONSTATUS', '')
        localStorage.setItem('user', '')
        removeToken()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 储存用户信息
  setUserInfo({ commit, state }, userInfo) {
    commit('SET_CURRID', userInfo.currId)
    commit('SET_ROLEID', userInfo.roleId)
    commit('SET_USERID', userInfo.userId)
    commit('SET_USERNAME', userInfo.userName)
    commit('SET_VERIFICATIONSTATUS', userInfo.verificationStatus)
    let token = new Date().getTime()
    commit('SET_TOKEN', token)
    let data = JSON.stringify(state)
    localStorage.setItem('user', data)
    setToken(token)
  },

  // 获取企业认证信息
  queryEnterpriseCertificationStatus({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        userId: state.userId,
        roleId: state.roleId,
        currId: state.currId
      }
      queryEnterpriseCertificationStatus(data).then(response => {
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          commit('SET_VERIFICATIONSTATUS', data.verificationStatus)
          localStorage.setItem('user', JSON.stringify(state))
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

