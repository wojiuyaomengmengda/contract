<template>
  <WarningTable
    :columns="columns"
    monitor-code="environment-alarm"
  >
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #deviceName="{ record }">{{ record.deviceName || '-' }}</template>
    <template #dataThreshold="{ record }">{{ record.dataThreshold || '-' }}</template>
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
    title: t('设备名称'),
    dataIndex: 'deviceName',
    slotName: 'deviceName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('实际/阈值'),
    dataIndex: 'dataThreshold',
    slotName: 'dataThreshold',
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