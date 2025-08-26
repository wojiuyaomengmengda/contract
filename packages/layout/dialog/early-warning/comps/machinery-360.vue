<template>
  <WarningTable
    :columns="columns"
    monitor-code="mechanical-360"
  >
    <template #jbsp="{ record }">
      <a-image 
        v-if="record.video" 
        :src="getVideoImg(record.image)" 
        width="80"
        height="40"
        :preview="false"
         fit="cover"
        @click="preview(record)"
      />
      <span v-else>-</span>
    </template>
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
    
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #deviceName="{ record }">{{ record.deviceName || '-' }}</template>
    <template #deviceId="{ record }">{{ record.deviceId || '-' }}</template>
  </WarningTable>
</template>
  
<script setup lang='ts'>
import WarningTable from './warning-table.vue'
import AlarmStatus from '../AlarmStatus.vue';
import { useI18n } from '@/locale';
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
    title: t('机械设备名称'),
    dataIndex: 'deviceName',
    slotName: 'deviceName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('机械设备编号'),
    dataIndex: 'deviceId',
    slotName: 'deviceId',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('警报视频'),
    dataIndex: 'jbsp',
    slotName: 'jbsp',
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

const getVideoImg = (val:any) => {
  const imglist = val? JSON.parse(val) : [];
  return imglist[0]||"";
}

const emit = defineEmits(['preview'])
const preview = (record: TableData) => {
  emit('preview', record.alarmTitle, record.video)
}
</script>
  
<style>
  
</style>