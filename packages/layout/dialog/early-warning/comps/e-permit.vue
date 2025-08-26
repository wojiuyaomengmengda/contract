<template>
  <WarningTable
    :columns="columns"
    monitor-code="e-permit"
    row-key="recordProcessId"
  >
    <template #createTime="{ record }">{{ record.createTime || '-' }}</template>
    <template #processTag="{ record }">{{ record.processTag || '-' }}</template>
    <template #processName="{ record }">{{ record.processName || '-' }}</template>
    <template #state="{ record }">{{ { 1: t('过期未注销') }[record.state] || '-' }}</template>
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
    dataIndex: 'createTime',
    slotName: 'createTime',
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
    title: t('证书编号'),
    dataIndex: 'processTag',
    slotName: 'processTag',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('证书类型'),
    dataIndex: 'processName',
    slotName: 'processName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('证书状态'),
    dataIndex: 'state',
    slotName: 'state',
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