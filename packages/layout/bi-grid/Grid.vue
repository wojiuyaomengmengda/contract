<template>
  <ScreenAdapter>
    <slot name="grid" v-bind="gridComponents">
      <component :is="props.customGrid">
        <template v-for="slotName in Object.keys($slots)" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps || {}" />
        </template>
      </component>
    </slot>
  </ScreenAdapter>
</template>
<script setup lang="ts">
import { ref, watchEffect, watch, shallowRef, toRaw, isRef, isReactive, provide } from 'vue'
import { useScreenTreeStore } from '@/util/store/scrren-tree'
import { usePathStore } from '@/util/store/path'
import { useUserStore } from '@/util/store/user'
import { checkPermission } from '@/util/common'
import base from '@/api/base'
import { cloneDeep } from 'lodash-es'

import { storeToRefs } from 'pinia'
import { useOrgStore } from '@/util/store/org'
import { RootOrgID } from '@/common/business/const/org'
import { addGridContext, useGridContext } from './context'
import { GridOptions, gridComponents } from './types/grid.d'
import ScreenAdapter from './ScreenAdapter.vue'
import layout from './grid/layout/index.vue'
import { useBiGridStore } from './store/grid'
import GirdLeftMenu from './components/GirdLeftMenu.vue'
import Weather from './components/Weather.vue'
import GirdHeaderMenu from './components/GirdHeaderMenu.vue'
import GridHeadFoldMenu from './components/GridHeadFoldMenu.vue'
import GirdLogo from './components/GirdLogo.vue'
import GridCompanyName from './components/GridCompanyName.vue'
import GridHeadAdmin from './components/GridHeadAdmin.vue'
import GridHeadAlarm from './components/GridHeadAlarm.vue'
import GridHeadAiAssistant from './components/GridHeadAiAssistant.vue'
import GridHeadPersonal from './components/GridHeadPersonal.vue'
import GirdMainContent from './components/GirdMainContent.vue'
import GridOrgSearchPanel from './components/GridOrgSearchPanel.vue'
import GridAiAssistantPanel from './components/GridAiAssistantPanel.vue'
import { AddmethodsKey } from './context/key'

const props = withDefaults(defineProps<Partial<GridOptions>>(), {
  data: {},
  getComponent: null,
  showMenu: true,
  orgName: '',
  isAdapter: true,
  showAlarm: true,
  px2rem: false,
  orgId: Number(RootOrgID),
  /**
   * 自定义布局  模板组件customGrid  可以是全局已注册的组件名，也可以是组件对象
   */
  customGrid: toRaw(layout),
  logoUrl: '',
  showLogo: true
})
const screenTreeStore = useScreenTreeStore()
const pathStore = usePathStore()
const userStore = useUserStore()
const menus = ref<any>([])
const scrrenGroup = ref({
  name: '',
  screenList: [] as any,
  subIcon: '',
  icon: ''
})
const collpased = ref(false)
const biGridStore = useBiGridStore()
const renderData = ref<any>({})

const { gridOrgSearchPanelShow, gridAiAssistantPanelShow } = storeToRefs(biGridStore)
const gridComponents = {
  GirdLeftMenu,
  Weather,
  GridHeadFoldMenu,
  GirdLogo,
  GirdHeaderMenu,
  GridCompanyName,
  GridHeadAdmin,
  GridHeadAlarm,
  GridHeadAiAssistant,
  GridHeadPersonal,
  GirdMainContent,
  GridOrgSearchPanel,
  GridAiAssistantPanel
}
const methods = {}
provide(AddmethodsKey, methods)
addGridContext([
  props,
  {
    collpased,
    menus,
    scrrenGroup,
    gridOrgSearchPanelShow,
    gridAiAssistantPanelShow,
    gridComponents,
    renderData,
    methods
  }
])

// 初始化页面
const getHeaderMenu = (): void => {
  menus.value?.forEach((item: any) => {
    item.screenList.forEach((item2: any) => {
      if (pathStore.value === item2.path && item2.path) {
        scrrenGroup.value = item
        scrrenGroup.value.screenList = item.screenList.filter(
          (e: any) => !userStore.id || checkPermission(e.permissionId)
        )
      }
    })
  })
}

watch(
  () => screenTreeStore.value,
  async () => {
    if (screenTreeStore.value) {
      menus.value = cloneDeep(screenTreeStore.value)
      getHeaderMenu()
    }
  },
  { immediate: true, deep: true }
)
const loadComponent = (list: any) => {
  if (props.getComponent) {
    // 将组件转成动态加载
    if (Object.keys(list).length === 0) return
    ;(list.itemList || []).forEach((item: any) => {
      if (item.componentList.length > 1) {
        item.carouselIndex = 1
      }
      item.componentList.forEach((component: any) => {
        // 外部传入函数进行获取文件
        component.document = props.getComponent(component)
      })
    })
  }
}

watch(
  () => props.data,
  () => {
    if (props.data.dataType === 1) {
      renderData.value = cloneDeep(props.data)
      loadComponent(renderData.value)
    } else {
      renderData.value = cloneDeep(props.data)
    }
  },
  { deep: true, immediate: true }
)
</script>
