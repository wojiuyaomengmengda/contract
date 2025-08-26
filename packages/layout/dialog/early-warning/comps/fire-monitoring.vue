<template>
  <WarningTable
    :columns="columns"
    monitor-code="fire-alarm"
  >
    <template #zp="{ record }">
      <a-image-preview-group v-if="record.thermalPic || record.lightPic" infinite>
        <a-space>
          <a-image 
            v-if="record.thermalPic && record.thermalPic.includes('.png')" 
            :src="record.thermalPic" 
            width="80" 
             fit="cover"
            height="40" />
          <a-image 
            v-if="record.lightPic && record.lightPic.includes('.png')" 
            :src="record.lightPic" 
            width="80" 
             fit="cover"
            height="40" />
        </a-space>
      </a-image-preview-group>
      <span v-else>-</span>
      </template>
    <template #handleStatus="{ record }">
      <AlarmStatus :status="record.handleStatus" />
    </template>
    
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #area="{ record }">{{ record.area || '-' }}</template>
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
    title: t('区域'),
    dataIndex: 'area',
    slotName: 'area',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('警报照片'),
    dataIndex: 'zp',
    slotName: 'zp',
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