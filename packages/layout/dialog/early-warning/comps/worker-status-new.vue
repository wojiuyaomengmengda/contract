<template>
  <WarningTable
    :columns="columns"
    monitor-code="worker-status-new-5"
  >
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #peopleName="{ record }">{{ record.peopleName || '-' }}</template>
    <template #zoneName="{ record }">{{ record.zoneName || '-' }}</template>
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
import { useI18n } from '@/locale';
import WarningTable from './warning-table.vue'
import AlarmStatus from '../AlarmStatus.vue';

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
    title: t('人员名称'),
    dataIndex: 'peopleName',
    slotName: 'peopleName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('区域'),
    dataIndex: 'zoneName',
    slotName: 'zoneName',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: t('人员照片'),
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