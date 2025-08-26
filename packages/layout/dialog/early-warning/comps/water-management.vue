<template>
  <WarningTable
    :columns="columns"
    monitor-code="water-alarm"
  >
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
    <template #alarmTime="{ record }">{{ record.alarmTime || '-' }}</template>
    <template #areaName="{ record }">{{ record.areaName || '-' }}</template>
    <template #deviceId="{ record }">{{ record.deviceId || '-' }}</template>
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
    dataIndex: 'alarmTime',
    slotName: 'alarmTime',
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
    title: t('监测区域名称'),
    dataIndex: 'areaName',
    slotName: 'areaName',
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