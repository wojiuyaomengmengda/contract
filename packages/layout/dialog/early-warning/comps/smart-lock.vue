<template>
  <WarningTable
    :columns="columns"
    monitor-code="smart-lock"
  >
    <template #deviceType="{ record }">
      {{ LOCK_DEVICE_TYPE[record.deviceType] }}
    </template>
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #lockAddressName="{ record }">{{ record.lockAddressName || '-' }}</template>
    <template #deviceCode="{ record }">{{ record.deviceCode || '-' }}</template>
    <template #operationUserName="{ record }">{{ record.operationUserName || '-' }}</template>
  </WarningTable>
</template>
  
<script setup lang='ts'>
import WarningTable from './warning-table.vue'
import AlarmStatus from '../AlarmStatus.vue';
import { useI18n } from '@/locale';
import { LOCK_DEVICE_TYPE } from '../util/constants'

const { t } = useI18n()

const columns = [
  {
    title: t('警报时间'),
    dataIndex: 'alarmDate',
    slotName: 'alarmDate',
    width: 180
  },
  {
    title: t('警报类型'),
    dataIndex: 'alarmTitle',
    slotName: 'alarmTitle',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('锁位'),
    dataIndex: 'lockAddressName',
    slotName: 'lockAddressName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('设备类型'),
    dataIndex: 'deviceType',
    slotName: 'deviceType',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: t('设备编号'),
    dataIndex: 'deviceCode',
    slotName: 'deviceCode',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('操作人'),
    dataIndex: 'operationUserName',
    slotName: 'operationUserName',
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