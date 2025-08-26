<template>
  <WarningTable :columns="columns" monitor-code="flood-monitor">
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record?.handleStatus" />
      <!-- {{ record.handleStatus || '-' }} -->
      
    </template>
    <template #alarmLevel="{ record }">
      <AlarmLevel :status="record.alarmLevel" />
    </template>
    <template #alarmStatus="{ record }">
      <AlarmStatusDesc :status="record.alarmStatus" />
    </template>
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #battery="{ record }">{{ record.battery || '-' }}</template>
    <template #areaName="{ record }">{{ record.areaName || '-' }}</template>
    <template #deviceId="{ record }">{{ record.deviceId || '-' }}</template>
  </WarningTable>
</template>

<script setup lang="ts">
import WarningTable from './warning-table.vue'
import AlarmStatus from '../AlarmStatus.vue'
import AlarmLevel    from '../AlarmLevel.vue'
import AlarmStatusDesc    from '../AlarmStatusDesc.vue'
import { useI18n } from '@/locale'

const { t } = useI18n()

const columns = [
  {
    title: t('警报时间'),
    dataIndex: 'alarmDate',
    slotName: 'alarmDate',
    width: 180
  },
  {
    title: t('设备ID'),
    dataIndex: 'deviceId',
    slotName: 'deviceId',
    width: 180
  },
  {
    title: t('电量%'),
    dataIndex: 'battery',
    slotName: 'battery',
    width: 180

  },
  {
    title: t('警报类型'),
    dataIndex: 'alarmStatus',
    slotName: 'alarmStatus',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('警报级别'),
    dataIndex: 'alarmLevel',
    slotName: 'alarmLevel',
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

<style></style>
