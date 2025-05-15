<template>
  <WarningTable
    :columns="columns"
    monitor-code="tree-alarm"
  >
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #treeNo="{ record }">{{ record.treeNo || '-' }}</template>
    <template #deviceId="{ record }">{{ record.deviceId || '-' }}</template>
    <template #qxd="{ record }">{{ record.qxd || '-' }}</template>
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
    title: t('树木编号'),
    dataIndex: 'treeNo',
    slotName: 'treeNo',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('监测器编号'),
    dataIndex: 'deviceId',
    slotName: 'deviceId',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('倾斜幅度'),
    dataIndex: 'qxd',
    slotName: 'qxd',
    ellipsis: true,
    tooltip: true
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
  
<style>
  
</style>