const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  verificationStatus: state => state.user.verificationStatus,
  userId: state => state.user.userId,
  currId: state => state.user.currId,
  roleId: state => state.user.roleId
}
export default getters
