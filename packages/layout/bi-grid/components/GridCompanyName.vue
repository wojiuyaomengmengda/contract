<template>
  <!-- 公司/地盘名称 -->
  <div
    v-if="companyOrTerritoryName"
    @click="onOrgNameClick"
    @mouseenter="() => enableCanGridOrgSearchPanelHide()"
    @mouseleave="() => disableCanGridOrgSearchPanelHide()"
  >
    <div class="org-name-wrap">
      <div class="org-name">
        <EllipsisTip>{{ companyOrTerritoryName }}</EllipsisTip>
      </div>
      <img class="org-name__toggle-icon" src="@/assets/images/toggle_icon.svg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import api from '@/api/base'
import EllipsisTip from '@/ellipsis-tooltip/index.vue'
import { useOrgStore } from '@/util/store/org'
import { useGridContext } from '../context'
import { useBiGridStore } from '../store/grid'
import useGridOrgSearchPanel from '../hooks/useGridOrgSearchPanel'

const { enableCanGridOrgSearchPanelHide, disableCanGridOrgSearchPanelHide } =
  useGridOrgSearchPanel()
const orgStore = useOrgStore()
const ctx = useGridContext()
const orgCurrentName = ref('')
const getOrgInfo = async () => {
  const orgInfo = await api.orgInfo(orgStore.current.id)
  orgCurrentName.value = orgInfo.name
}
getOrgInfo()

// 公司或地盘名
const companyOrTerritoryName = computed(() => (ctx.orgName ? ctx.orgName : orgCurrentName.value))

// 显示组织查询面板
const biGridStore = useBiGridStore()
const showGridOrgSearchPanel = () => {
  biGridStore.setGridOrgSearchPanelShow(true)
}

const onOrgNameClick = () => {
  if (biGridStore.gridOrgSearchPanelShow) {
    biGridStore.setGridOrgSearchPanelShow(false)
  } else {
    biGridStore.setGridOrgSearchPanelShow(true)
  }
  // showGridOrgSearchPanel();
}
</script>
<style lang="scss" scoped>
.org-name {
  background: linear-gradient(180deg, #007aff 0%, #284a69 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 36px;
  cursor: pointer;
  flex: 1;

  &-wrap {
    max-width: 500px;
    height: 48px;
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 4px;
    &:hover {
      background-color: rgb(var(--primary-1));

      .org-name {
        &__toggle-icon {
          // display: block;
          visibility: visible;
        }
      }
    }
  }

  &__toggle-icon {
    // display: none;
    visibility: hidden;
    height: 24px;
    width: 24px;
    margin-left: 10px;
  }
}
</style>
