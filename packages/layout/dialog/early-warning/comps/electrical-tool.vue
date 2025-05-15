<template>
  <WarningTable
    :columns="columns"
    monitor-code="electric-tools"
  >
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #name="{ record }">{{ record.name || '-' }}</template>
    <template #code="{ record }">{{ record.code || '-' }}</template>
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
    title: t('设备种类'),
    dataIndex: 'name',
    slotName: 'name',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('设备编号'),
    dataIndex: 'code',
    slotName: 'code',
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