<template>
  <WarningTable
    :columns="columns"
    monitor-code="scr"
  >
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #enterNum="{ record }">{{ record.enterNum || '-' }}</template>
    <template #driverName="{ record }">{{ record.driverName || '-' }}</template>
    <template #carNum="{ record }">{{ record.carNum || '-' }}</template>
    <template #cicWorkerContractorsName="{ record }">{{ record.cicWorkerContractorsName || '-' }}</template>
    <template #startTime="{ record }">{{ record.startTime || '-' }}</template>
    <template #mudTicketImg="{ record }">
      <a-image v-if="record.mudTicketImg" :src="record.mudTicketImg" width="80" height="40" fit="cover" />
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
    title: t('入账编码'),
    dataIndex: 'enterNum',
    slotName: 'enterNum',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('司机名称'),
    dataIndex: 'driverName',
    slotName: 'driverName',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: t('车牌号码'),
    dataIndex: 'carNum',
    slotName: 'carNum',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: t('分判商'),
    dataIndex: 'cicWorkerContractorsName',
    slotName: 'cicWorkerContractorsName',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: t('出车时间'),
    dataIndex: 'startTime',
    slotName: 'startTime',
    ellipsis: true,
    tooltip: true,
    width: 180
  },
  {
    title: t('入账票图片'),
    dataIndex: 'mudTicketImg',
    slotName: 'mudTicketImg',
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