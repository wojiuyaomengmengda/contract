<template>
  <div
    class="extra-item"
    @click="() => toggleAiAssistant()"
    @mouseenter="() => enableCanGridAiAssistantPanelHide()"
    @mouseleave="() => disableCanGridAiAssistantPanelHide()"
  >
    <a-tooltip :content="t('AI/闪闪助手')" background-color="#49596b">
      <span class="business-icon icon-ai"></span>
    </a-tooltip>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from '@/locale'
import { useBiGridStore } from '../store/grid'
import useGridAiAssistantPanel from '../hooks/useGridAiAssistantPanel'


const { t } = useI18n()
const { enableCanGridAiAssistantPanelHide, disableCanGridAiAssistantPanelHide } =
  useGridAiAssistantPanel()
// 显示组织查询面板
const biGridStore = useBiGridStore()

// 打开收齐ai助手
const toggleAiAssistant = () => {
  biGridStore.setGridAiAssistantPanelShow(!biGridStore.gridAiAssistantPanelShow)
}
</script>
<style lang="scss" scoped>
.extra-item {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
