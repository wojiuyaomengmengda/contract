<template>
  <div class="extra-item" @click="openAlarm">
    <a-tooltip :content="t('警报中心')" background-color="#49596b">
      <span class="business-icon icon-alarm"></span>
    </a-tooltip>
  </div>
  <EarlyWarning ref="earlyWarningRef" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/locale'
import EarlyWarning from '../../dialog/early-warning/Index.vue'
import { useGridContext } from '../context'
const ctx = useGridContext()
const { t } = useI18n()

const earlyWarningRef = ref()
const openAlarm = () => {
  earlyWarningRef.value.open()
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
