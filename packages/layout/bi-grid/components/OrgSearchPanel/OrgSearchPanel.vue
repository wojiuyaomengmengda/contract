<template>
  <div class="org-search-panel">
    <a-input-search
      v-model="searchKey"
      style="margin-bottom: 8px"
      :placeholder="t('请输入关键词')"
      @input="onSearch"
    />
    <div class="tabs-wrap">
      <a-tabs default-active-key="1" type="line" @tab-click="onTabClick">
        <a-tab-pane key="1" :title="formatAllCountTitle"></a-tab-pane>
        <a-tab-pane key="2" :title="formatTitle"></a-tab-pane>
      </a-tabs>
    </div>
    <div class="org-search-panel__tree-wrap">
      <a-tree
        ref="biTreeRef"
        v-model:selected-keys="selectedKeys"
        :data="treeData"
        block-node
        default-expand-selected
        class="busine-tree busine-tree--sence1"
        :field-names="{
          key: 'id',
          title: 'name',
          children: 'children'
        }"
        @select="onOrgSelect"
      >
        <template #title="nodeData">
          <span v-if="((index = getMatchIndex(nodeData?.name)), index < 0)">{{
            nodeData?.name
          }}</span>
          <span v-else>
            {{ nodeData?.name?.substr(0, index)
            }}<span style="color: var(--color-primary-light-4)">
              {{ nodeData?.name?.substr(index, searchKey.length) }} </span
            >{{ nodeData?.name?.substr(index + searchKey.length) }}
          </span>
        </template>
      </a-tree>
    </div>
  </div>
</template>
<script setup lang="ts">
import { OrgModel } from '@/api/org/types'
import { computed, ref, watch } from 'vue'
import { useI18n } from '@/locale'

const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    modelValue: (number | string)[]
    orgList: OrgModel[]
  }>(),
  {
    modelValue: () => [],
    orgList: () => []
  }
)
let index = 0
const emit = defineEmits(['update:modelValue', 'org-select'])

const biTreeRef = ref()
const treeData = ref<OrgModel[]>([])
const selectedKeys = computed(() => props.modelValue)
watch(
  selectedKeys,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  {
    deep: true
  }
)

watch(
  () => props.orgList,
  (newValue) => {
    treeData.value = newValue
  },
  {
    immediate: true
  }
)

// 计算总地盘数
const totalProject = computed(() => {
  return props.orgList.reduce((pre, cur) => {
    return pre + cur.projectCount
  }, 0)
})

// 重点地盘数
const keyTotalProject = computed(() => {
  const countMajorProjects = (data: OrgModel[]) => {
    return data.reduce((count: any, item: any) => {
      if (item.isMajor === 1 && item.type === 2) {
        count++
      }
      if (item.children) {
        count += countMajorProjects(item.children)
      }
      return count
    }, 0)
  }

  return countMajorProjects(props.orgList)
})

const isHideTotalproject = ref(process.env?.ISHIDETOTALPROJECT === 'true')
const isHideAlltotalproject = ref(process.env?.ISHIDEALLTOTALPROJECT === 'true')

const formatAllCountTitle = computed(() => {
  if (isHideAlltotalproject.value) {
    return t('全部地盘')
  }

  return `${t('全部地盘')} (${totalProject.value})`
})

const formatTitle = computed(() => {
  if (isHideTotalproject.value) {
    return t('重点地盘')
  }

  return `${t('重点地盘')} (${keyTotalProject.value})`
})

const searchKey = ref('')
function searchData(keyword: string) {
  const loop = (data: OrgModel[]) => {
    const result: OrgModel[] = []
    data.forEach((item: OrgModel) => {
      if (item.name?.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = loop(item.children)
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData
          })
        }
      }
    })
    return result
  }

  return loop(props.orgList)
}

// 是否重点项目
const filterByIsMajor = (): OrgModel[] => {
  const loop = (data: OrgModel[]) => {
    const result: OrgModel[] = []
    data.forEach((item: OrgModel) => {
      if (item.isMajor === 1 && item.type === 2) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = loop(item.children)
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData
          })
        }
      }
    })
    return result
  }
  return loop(props.orgList)
}

const onSearch = (keyword: string) => {
  searchKey.value = keyword
  if (keyword) {
    treeData.value = searchData(keyword)
  } else {
    treeData.value = props.orgList
  }
}

const onTabClick = (key: string) => {
  const isMajor = key === '2'
  treeData.value = !isMajor ? searchData(searchKey.value) : filterByIsMajor()
}

function getMatchIndex(name: string) {
  if (!searchKey.value) return -1
  return name.toLowerCase().indexOf(searchKey.value.toLowerCase())
}

const onOrgSelect = (selects: number[], data: { node: OrgModel }) => {
  const orgRecord = data.node
  emit('org-select', orgRecord)
}

const expandAll = () => {
  biTreeRef.value?.expandAll?.()
}

defineExpose({
  biTreeRef,
  expandAll
})
</script>
<style lang="scss">
.org-search-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__tree-wrap {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }
}

.tabs-wrap {
  .arco-tabs-nav-tab-list {
    padding: 3px 0 !important;
  }
  .arco-tabs-nav::before {
    // left: 4px;
  }
}
</style>
