<template>
  <span class="alarmStatusDesc" >{{
    t(currentStatus?.label as string)
  }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/locale'
import { ALARM_STATUS_DESC } from './util/constants'

const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    status: number
  }>(),
  {
    status: undefined
  }
)

const currentStatus = computed(() => {
  return ALARM_STATUS_DESC.find((item) => item.value === props.status)
})
</script>
