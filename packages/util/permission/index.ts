import { useUserRoleStore } from '@/util/store/user-role'

export default {
  check: (idList: Array<number>) => {
    const userRoleStore = useUserRoleStore()
    const cloneIdList = [...idList]
    while (cloneIdList.length > 0) {
      const id = cloneIdList.shift()
      if (id && userRoleStore.permissionIdList.includes(id)) {
        return true
      }
    }
    return false
  }
}
