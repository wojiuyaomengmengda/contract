<template>
  <span 
    class="alarm-status" 
    :style="{color: currentStatus?.color}"
  >{{ t(currentStatus?.label as string) }}</span>
</template>
  
<script setup lang='ts'>
import { computed } from 'vue';
import { useI18n } from '@/locale';
import { EARLY_WARNING_STATUS } from './util/constants'

const { t } = useI18n()
const props = withDefaults(defineProps<{
  status: number
}>(), {
  status: undefined
})

const currentStatus = computed(() => {
  return EARLY_WARNING_STATUS.find(item => item.value === props.status)
})
</script>
