<template>
  <span 
    class="alarmLevel" 
  >{{ t(currentStatus?.label as string) }}</span>
</template>
  
<script setup lang='ts'>
import { computed } from 'vue';
import { useI18n } from '@/locale';
import { ALARM_LEVEL } from './util/constants'

const { t } = useI18n()
const props = withDefaults(defineProps<{
  status: number
}>(), {
  status: undefined
})

const currentStatus = computed(() => {
  return ALARM_LEVEL.find(item => item.value === props.status)
})
</script>