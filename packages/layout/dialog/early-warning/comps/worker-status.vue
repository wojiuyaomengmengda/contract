<template>
  <WarningTable
    :columns="columns"
    monitor-code="smart_watch"
  >
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #labelId="{ record }">{{ record.labelId || '-' }}</template>
    <template #areaName="{ record }">{{ record.areaName || '-' }}</template>
    <template #photo="{ record }">
      <a-image v-if="record.photo" fit="cover" :src="record.photo" width="80" height="40" />
      <span v-else>-</span>
    </template>
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
  </WarningTable>
</template>
  
<script setup lang='ts'>
import WarningTable from './warning-table.vue'
import AlarmStatus from '../AlarmStatus.vue';
import { useI18n } from '@/locale';

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
    title: t('描述'),
    dataIndex: 'labelId',
    slotName: 'labelId',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('区域'),
    dataIndex: 'zoneName',
    slotName: 'zoneName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('警报照片'),
    dataIndex: 'photo',
    slotName: 'photo',
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