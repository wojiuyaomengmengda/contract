<template>
  <a-modal 
    v-model:visible="visible" 
    :footer="false"
    width="1284px"
    title-align="start"
    popup-container="#app"
    :style="{zIndex: 9999}"
  >
    <template #title>
      {{ t('警报中心') }}
    </template>

    <div v-if="visible && renderTabs.length" v-loading="loading" class="early-warning-content">
      <a-tabs
        type="line"  
        size="small"
        class="business-tabs business-tabs--sence1"
        @tab-click="tabClick"
      >
        <a-tab-pane v-for="(item, index) in renderTabs" :key="index">
          <template #title>
            <span class="alarm-title">{{ t(item.name as string) }} </span>
            <span class="alarm-number">{{ item.num > 99 ? '99+' : item.num }}</span>
          </template>
          <div style="height: 620px;">
            <component 
              :is="checkComponent(item.component)"
              v-if="activeTab === index" 
              @preview="preview"
            />
          </div>
        </a-tab-pane>
    </a-tabs>
    </div>
    <Empty v-else class="early-warning-empty" />

    <PreviewVedio ref="vedioRef" />
  </a-modal>
</template>
  
<script setup lang='ts'>
import { ref, watch, type Component, defineAsyncComponent, defineComponent, h } from 'vue'
import { useScreenTreeStore } from '@/util/store/scrren-tree';
import { ScreenModel } from '@/util/store/scrren-tree/types';
import { Skeleton } from '@arco-design/web-vue';
import { useOrgStore } from '@/util/store/org';
import earlyWarningApi from '@/api/early-warning';
import Empty from '@/empty/index.vue'
import { cloneDeep } from 'lodash-es';
import { useI18n } from '@/locale';
import { earlyWarningTabs } from './util/config'
import PreviewVedio from './comps/preview-vedio.vue';

const { t } = useI18n();
const orgStore = useOrgStore()
const screenTreeStore = useScreenTreeStore()
const visible = ref(false)
const activeTab = ref(0)

const vedioRef = ref()
const open = () => {
  activeTab.value = 0
  visible.value = true
}

const currentList = ref<any[]>([])
// eslint-disable-next-line consistent-return
const checkList = () => {
  if (!screenTreeStore.value) return [];
  const paths: ScreenModel[] = screenTreeStore.value.flatMap((cur) => cur.screenList);
  currentList.value = earlyWarningTabs.filter((item: any) => {
    let flag = false
    for(let i = 0; i < paths.length; i++) {
      flag = item.path.includes(paths[i].path)
      if (flag) break;
    }
    return flag
  })
}

const tabClick = (key: any) => {
  activeTab.value = key
}
/**
 * 缓存组件 解决组件异步加载过程重新引入导致闪烁
 */
 const ComponentMap = new WeakMap<any, Component>();
 const CacheDefineAsyncComponent = (value: any) => {
  const CacheComponent = ComponentMap.get(value);
  if (CacheComponent) {
    return CacheComponent;
  }
  const component = defineAsyncComponent({
    loader: value,
    loadingComponent: defineComponent({
      setup() {
        return () =>
          h(Skeleton, {
            animated: true,
            loading: true,
            rows: 10,
            style: {
              padding: '20px',
            },
          });
      },
    }),
    errorComponent: () => h('div', '加载失败'),
  });
  ComponentMap.set(value, component);
  return component;
};
const checkComponent = (value: any) => {
  if (typeof value === 'function') {
    return CacheDefineAsyncComponent(value);
  }
  return value;
};

const loading = ref(false)
const renderTabs = ref<any[]>(cloneDeep(currentList.value))
const getRedPointFun = async () => {
  let total = 0;
  const orgId = orgStore.value?.id.toString();
  renderTabs.value = cloneDeep(currentList.value)
  loading.value = true
  for (let index = 0; index < renderTabs.value.length; index++) {
    const element: any = renderTabs.value[index];
    const apiPath = typeof element.api === 'function' ? element.api(orgId) : element.api;
    if (element.component && apiPath) {
      try {

        // 电工具接口单独处理
        if (element.api === 'alarm-dispatch-system/electricTool/getUnprocessed') {
          // eslint-disable-next-line no-await-in-loop
          const res = await earlyWarningApi.getRedPointNumApi({
            orgId,
            api: apiPath,
            state: 0
          });
          element.num = res;
          total += res;
        } else {
          // eslint-disable-next-line no-await-in-loop
          const res = await earlyWarningApi.getRedPointNumApi({
            orgId,
            api: apiPath,
          });
          element.num = res;
          total += res;
        }

      } catch (error) { }
    }
  }
  loading.value = false
}

const preview = (title: string, src: string ) => {
  vedioRef.value.open(title, src)
}

watch(
  () => screenTreeStore.value,
  () => {
    checkList()
  },
  { immediate: true, deep: true }
)
watch(
  () => [currentList.value, visible.value],
  () => {
    if (currentList.value.length && visible.value) {
      getRedPointFun()
    }
  },
  { immediate: true, deep: true }
)
defineExpose({
  open
})
</script>
  
<style lang="scss" scoped>
.early-warning-empty {
  min-height: 528px;
}
.early-warning-content {
  .alarm-number {
    color: var(--color-text-3);
    width: 25px;
    text-align: center;
  }
  .alarm-title {
    padding-right: 5px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    flex: 1;
  }
}
</style>