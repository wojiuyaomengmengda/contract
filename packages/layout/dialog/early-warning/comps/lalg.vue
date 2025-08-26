<template>
  <WarningTable
    :columns="columns"
    monitor-code="lalg"
  >
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #dueDate="{ record }">{{ record.dueDate || '-' }}</template>
    <template #mechanicalName="{ record }">{{ record.mechanicalName || '-' }}</template>
    <template #description="{ record }">{{ record.description || '-' }}</template>
    <template #headingCode="{ record }">{{ record.headingCode || '-' }}</template>
    <template #serialNumber="{ record }">{{ record.serialNumber || '-' }}</template>
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
    title: t('到期时间'),
    dataIndex: 'dueDate',
    slotName: 'dueDate',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('设备名称'),
    dataIndex: 'mechanicalName',
    slotName: 'mechanicalName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('描述'),
    dataIndex: 'description',
    slotName: 'description',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('拥有人的识别标志编号'),
    dataIndex: 'headingCode',
    slotName: 'headingCode',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('制造厂编号'),
    dataIndex: 'serialNumber',
    slotName: 'serialNumber',
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