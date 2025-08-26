<template>
  <WarningTable
    :columns="columns"
    monitor-code="ampd"
  >
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #serialNumber="{ record }">{{ record.serialNumber || '-' }}</template>
    <template #subSystem="{ record }">{{ record.subSystem || '-' }}</template>
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
    title: t('编号'),
    dataIndex: 'serialNumber',
    slotName: 'serialNumber',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('类型'),
    dataIndex: 'subSystem',
    slotName: 'subSystem',
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