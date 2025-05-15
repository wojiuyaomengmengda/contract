<template>
  <WarningTable
    :columns="columns"
    monitor-code="worker-positioning-5"
  >
    <template #photo="{ record }">
      <a-image v-if="record.photo" fit="cover" :src="record.photo" width="80" />
      <span v-else>-</span>
    </template>
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #peopleName="{ record }">{{ record.peopleName || '-' }}</template>
    <template #areaName="{ record }">{{ record.areaName || '-' }}</template>
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
    title: t('姓名'),
    dataIndex: 'peopleName',
    slotName: 'peopleName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('头像'),
    dataIndex: 'photo',
    slotName: 'photo',
  },
  {
    title: t('地点'),
    dataIndex: 'areaName',
    slotName: 'areaName',
    ellipsis: true,
    tooltip: true,
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