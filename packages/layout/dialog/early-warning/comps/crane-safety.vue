<template>
  <WarningTable
    :columns="columns"
    monitor-code="tower-crane"
  >
    <template #alarmDate="{ record }">{{ record.alarmDate || '-' }}</template>
    <template #deviceName="{ record }">{{ record.deviceName || '-' }}</template>
    <template #reason="{ record }">{{ record.reason || '-' }}</template>
    <template #status="{ record }">
      <img v-if="record.status" style="width: 20px; height: 20px" :src="statusImgHandle(record.status)" alt="" />
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

// 天秤安全種類ICON 0提示 1預警 2違章
import icon0 from '../imgs/icons/icon0.png'
import icon1 from '../imgs/icons/icon1.png'
import icon2 from '../imgs/icons/icon2.png'

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
    tooltip: true,
  },
  {
    title: t('种类'),
    dataIndex: 'status',
    slotName: 'status',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('名称'),
    dataIndex: 'deviceName',
    slotName: 'deviceName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: t('警报内容'),
    dataIndex: 'reason',
    slotName: 'reason',
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

const statusImgArr = [
	{
		icon: icon0,
		value: 1,
	},
	{
		icon: icon1,
		value: 2,
	},
	{
		icon: icon2,
		value: 3,
	},
];

// 天秤安全種類ICON
const statusImgHandle = (status: number | string) => {
	const curParam = statusImgArr.find((item) => {
		return item.value === status;
	});
	return curParam?.icon;
};

</script>
  
<style>
  
</style>