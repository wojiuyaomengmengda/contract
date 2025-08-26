<template>
  <WarningTable :columns="columns" monitor-code="fall-guard">
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #area="{ record }">{{ record.area || '-' }}</template>
    <template #photo="{ record }">
      <a-space v-if="record.alarmPic1 || record.alarmPic2">
        <a-image v-if="record.alarmPic1" fit="cover" :src="record.alarmPic1" width="80" height="40" />
        <a-image v-if="record.alarmPic2" fit="cover" :src="record.alarmPic2" width="80" height="40" />
      </a-space>
      <span v-else>-</span>
    </template>
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
  </WarningTable>
</template>

<script setup lang="ts">
import WarningTable from './warning-table.vue'
import AlarmStatus from '../AlarmStatus.vue'
import { useI18n } from '@/locale'

const { t } = useI18n()

const columns = [
  {
    title: t('警报时间'),
    dataIndex: 'alarmDate',
    slotName: 'alarmDate',
    width: 180
  },
  {
    title: t('警报项'),
    dataIndex: 'alarmTitle',
    slotName: 'alarmTitle',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('区域'),
    dataIndex: 'area',
    slotName: 'area',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('警报照片'),
    dataIndex: 'photo',
    slotName: 'photo'
  },
  {
    title: t('状态'),
    dataIndex: 'handleStatus',
    slotName: 'handleStatus'
  },
  {
    title: t('操作'),
    slotName: 'action',
    width: 100
  }
]
</script>
