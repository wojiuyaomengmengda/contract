import { useScreenTreeStore } from '@/util/store/scrren-tree'
import { usePathStore } from '@/util/store/path'
import { useOrgStore } from '@/util/store/org'
import apiBase from '@/api/base'
import { useUserStore } from '../store/user'
import { checkPermission } from '../common'

// 查看是否本地
const getIsLocal = () => {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname)
}
// eslint-disable-next-line consistent-return
const initPage = async () => {
  const pathStore = usePathStore()
  const screenTreeStore = useScreenTreeStore()
  const userStore = useUserStore()
  // 判断当前组织有没有所选的大屏,如果有就开始渲染页面,如果没有就找到第一个轮播的页面跳转

  // 找到相同路径的大屏
  let tempScrren: any
  screenTreeStore.value.forEach((item: any) => {
    item.screenList.forEach((item2: any) => {
      if (
        pathStore.value === item2.path &&
        pathStore.desValue === item2.description &&
        (!userStore.id || checkPermission(item2.permissionId))
      ) {
        tempScrren = item2
      }
    })
  })
  console.log('tempScrren', tempScrren)

  // 存在路径,是嵌入的，并且当前页面是iframe不做处理返回
  if (
    pathStore.value &&
    tempScrren &&
    Object.keys(tempScrren).length > 0 &&
    tempScrren.dataType === 2 &&
    window.location.href.indexOf('bi/iframe') !== -1
  ) {
    return tempScrren
  }

  // 相同路径 并且相同页面 不做处理返回
  if (
    pathStore.value &&
    tempScrren &&
    Object.keys(tempScrren).length > 0 &&
    (window.location.href.indexOf(pathStore.value) !== -1 || getIsLocal())
  ) {
    return tempScrren
    // eslint-disable-next-line no-else-return
  } else {
    // 找到第一个可进入页面进入
    let newScrren: any
    screenTreeStore.value.forEach((item: any) => {
      item.screenList.forEach((item2: any) => {
        if (item2.path && !newScrren && (!userStore.id || checkPermission(item2.permissionId))) {
          newScrren = item2
        }
      })
    })
    pathStore.setValue(newScrren.path)
    pathStore.setDesValue(newScrren.description)
    // 如果是本地开发则直接切换
    if (getIsLocal()) {
      window.location.replace(`/`)
      return tempScrren
    }
    if (newScrren.dataType === 1) {
      window.location.href = `/home/${newScrren.path}/index.html`
    } else if (newScrren.dataType.dataType === 2) {
      window.location.href = `/home/iframe/index.html`
    }
  }
}

// 获取当前展示页面
export async function getCurrentScreen() {
  const screenTreeStore = useScreenTreeStore()
  const orgStore = useOrgStore()
  if (!screenTreeStore.value) {
    const screenListTree = await apiBase.scrrenListTree(orgStore.value.id, localStorage.getItem('language') || 'tc')
    screenTreeStore.setValue(screenListTree)
  }
  return initPage()
}
