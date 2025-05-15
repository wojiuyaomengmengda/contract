<template>
  <div
    v-show="biGridStore.gridAiAssistantPanelShow"
    class="grid-ai-assistant-panel"
    @mouseenter="() => enableCanGridAiAssistantPanelHide()"
    @mouseleave="() => disableCanGridAiAssistantPanelHide()"
  >
    <AiAssistantPanel />
  </div>
</template>
<script setup lang="ts">
import useDocumentClick from '@/hooks/useDocumentClick'
import AiAssistantPanel from './ai-assistant-panel/AiAssistantPanel.vue'
import { useBiGridStore } from '../store/grid'
import useGridOrgSearchPanel from '../hooks/useGridAiAssistantPanel'

const { enableCanGridAiAssistantPanelHide, disableCanGridAiAssistantPanelHide } =
  useGridOrgSearchPanel()

const biGridStore = useBiGridStore()
useDocumentClick(() => {
  if (biGridStore.isCanGridAiAssistantPanelHide) {
    biGridStore.setGridAiAssistantPanelShow(false)
  }
})
</script>
<style lang="scss" scoped>
.grid-ai-assistant-panel {
  position: absolute;
  right: 0;
  top: 62px;
  bottom: 0;
  overflow-y: auto;
  width: 500px;
  padding: 20px;
  z-index: 998;
  background: var(--color-bg-white);
}
</style>
