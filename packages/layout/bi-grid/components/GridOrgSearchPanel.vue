<template>
  <div
    v-show="biGridStore.gridOrgSearchPanelShow"
    class="grid-org-search-panel"
    @mouseenter="() => enableCanGridOrgSearchPanelHide()"
    @mouseleave="() => disableCanGridOrgSearchPanelHide()"
  >
    <slot></slot>
    <GridOrgSearchPanel
      ref="searchPanelRef"
      v-model="selectedKeys"
      :org-list="orgList"
      @org-select="onOrgSelect"
    />
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { orgListApi, saveRecentlyloggedinApi } from '@/api/org'
import { RootHomePath, RootOrgID } from '@/common/business/const/org'
import { OrgModel } from '@/api/org/types'
import { useOrgStore } from '@/util/store/org'
import { useUserRoleStore } from '@/util/store/user-role'
import { useUserStore } from '@/util/store/user'
import { usePathStore } from '@/util/store/path'
import { useTokenStore } from '@/util/store/oauth'
import base from '@/api/base'
import useDocumentClick from '@/hooks/useDocumentClick'
import { isMarketization } from '@/util/common/projectType'
import GridOrgSearchPanel from './OrgSearchPanel/OrgSearchPanel.vue'
import { useBiGridStore } from '../store/grid'
import useGridOrgSearchPanel from '../hooks/useGridOrgSearchPanel'
import { useGridContext } from '../context'
import { AddmethodsKey } from '../context/key'
import { GridMethods } from '../types/grid'

const ctx = useGridContext()
const userStore = useUserStore()
const orgStore = useOrgStore()
const pathStore = usePathStore()
const tokenStore = useTokenStore()
const orgList = ref<any[]>([]) // 过滤后的列表

const searchPanelRef = ref()
const selectedKeys = ref(orgStore.value.id || orgStore.value.id === 0 ? [orgStore.value.id] : [])

const loadData = async (params = {}) => {
  if (process.env.PROJECT_NAME === 'sunley' || isMarketization()) {
    const data = await base.listTree({
      typeList: [1, 2],
      enabled: true,
      language: localStorage.getItem('language') || 'ts'
    })

    orgList.value = data
  } else {
    const data = await orgListApi({
      typeList: ['1', '2'], // ？？ 1：公司级， 2：地盘级
      enabled: true,
      // region: 3,
      // removeRegions: 1,
      isCompleted: 3,
      id: ctx.orgId,
      ...params
    })

    orgList.value = data
  }
}

const routerTo = async (orgRecord: OrgModel) => {
  await orgStore.setValue(orgRecord)
  await useUserRoleStore().init(orgRecord.id)
  if (process.env.PROJECT_NAME === 'sunley' || isMarketization()) {
    pathStore.setValue('landing-page')
    window.location.replace(`../landing-page/index.html`)
  } else if (orgRecord.region === 2 || orgRecord.region === 3) {
    await saveRecentlyloggedinApi({
      token: `Bearer ${tokenStore.access_token}`,
      orgId: orgRecord?.id
    })
    await pathStore.setValue(RootHomePath)
    window.location.replace(`../${RootHomePath}/index.html`)
  } else {
    const accessToken = tokenStore.access_token
    const orgId = orgStore.value.id
    sessionStorage.clear()
    window.location.href = `${process.env.CN_URL}#/cs-token?token=${accessToken}&app=bi&version=5.0&orgId=${orgId}&account=${userStore.account}`
  }
}

const biGridStore = useBiGridStore()
const onOrgSelect = (orgRecord: OrgModel) => {
  biGridStore.$reset()
  routerTo(orgRecord)
}
const methods = inject<GridMethods>(AddmethodsKey, {})
methods['onOrgSelect'] = onOrgSelect
const { enableCanGridOrgSearchPanelHide, disableCanGridOrgSearchPanelHide } =
  useGridOrgSearchPanel()

// 展开查询查询面板所有节点
const expandAll = () => {
  searchPanelRef.value?.expandAll?.()
}

useDocumentClick(() => {
  if (biGridStore.isCanGridOrgSearchPanelHide) {
    biGridStore.setGridOrgSearchPanelShow(false)
  }
})

onMounted(async () => {
  // 获取地盘数据
  await loadData()
  expandAll()
})
/**
 * 根据当前组织id，设置默认选中  特别语言重新刷新
 */
useUserRoleStore().init(orgStore.value.id)
defineExpose({
  searchPanelRef,
  expandAll
})
</script>
<style lang="scss" scoped>
.grid-org-search-panel {
  position: absolute;
  left: 0;
  top: 62px;
  bottom: 0;
  overflow-y: auto;
  width: 455px;
  padding: 20px;
  z-index: 998;
  background: var(--color-bg-white);
}
</style>
