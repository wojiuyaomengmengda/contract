<template>
  <WarningTable :columns="columns" monitor-code="employee_license_alarm">
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
    <template #picture="{ record }">
      <a-image 
        v-if="record.picture" 
        :src="record.picture" 
        width="80"
        height="40"
        :preview="true"
         fit="cover"
      />
      <span v-else>-</span>
    </template>
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #safeCardExpiryDate="{ record }">{{ record.safeCardExpiryDate || '-' }}</template>
    <template #deviceId="{ record }">{{ record.deviceId || '-' }}</template>
  </WarningTable>
</template>
<script setup lang='ts'>
import WarningTable from './warning-table.vue'
import { useI18n } from '@/locale';
import AlarmStatus from '../AlarmStatus.vue';
import { TableData } from '@arco-design/web-vue'

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
    dataIndex: 'safeCardExpiryDate',
    slotName: 'safeCardExpiryDate',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('人员照片'),
    dataIndex: 'picture',
    slotName: 'picture',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('人员名称'),
    dataIndex: 'name',
    slotName: 'name',
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