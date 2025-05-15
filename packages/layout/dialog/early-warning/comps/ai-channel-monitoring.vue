<template>
  <WarningTable
    :columns="columns"
    monitor-code="camera-alert"
  >
    <template #jbzp="{ record }">
      <a-image v-if="record.frame" :src="record.frame" width="80" height="40" />
      <span v-else>-</span>
    </template>
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #areaName="{ record }">{{ record.areaName || '-' }}</template>
    <template #jbsp="{ record }">
      <a-image 
        v-if="record.video" 
        :src="getVideoImg(record.frame)" 
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
  </WarningTable>
</template>
  
<script setup lang='ts'>
import WarningTable from './warning-table.vue'
import AlarmStatus from '../AlarmStatus.vue';
import { useI18n } from '@/locale';
import { TableData } from '@arco-design/web-vue';
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
    title: t('区域'),
    dataIndex: 'areaName',
    slotName: 'areaName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('警报照片'),
    dataIndex: 'jbzp',
    slotName: 'jbzp',
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
    if (typeof val === 'string') {
      return val
    }

    if (val && val.length > 0) {
      return val[0]
    }
}


const emit = defineEmits(['preview'])
const preview = (record: TableData) => {
  emit('preview', record.alarmTitle, record.video)
}

</script>