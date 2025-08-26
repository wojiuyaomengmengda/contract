<template>
  <a-form :model="props.query" auto-label-width layout="inline">
    <a-form-item :label="t('状态')">
      <a-select 
        v-model="query.handleStatus" 
        class="form-select"
        style="width: 170px;" 
        allow-clear
        :placeholder="t('状态')"
        @change="resetPageNum"
      >
        <a-option 
          v-for="item in EARLY_WARNING_STATUS" 
          :key="item.value" 
          :label="t(item.label)" 
          :value="item.value"
        ></a-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="t('警报时间')">
      <a-range-picker 
        style="width: 300px" 
        :placeholder="[t('开始日期'), t('结束日期')]"
        @change="rangeDateChange" 
      />
    </a-form-item>
    <a-form-item :label="t('警报等级')">
      <a-select 
        v-model="query.alarmLevel" 
        style="width: 175px;" 
        class="form-select"
        allow-clear
        :placeholder="t('警报等级')"
        @change="resetPageNum"
      >
        <a-option  
          v-for="item in ALARM_LEVEL" 
          :key="item.value" 
          :label="t(item.label)" 
          :value="item.value"
        ></a-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="t('警报项')">
      <a-select
        v-model="query.alarmCode" 
        class="form-select" 
        style="width: 175px;" 
        :placeholder="t('警报项')"
        allow-clear
        @change="resetPageNum"
      >
        <a-option  
          v-for="item in alarmCodeList"
          :key="item.monitorCode + item.alarmCode"
          :label="item.alarmTitle"
          :value="item.alarmCode"
          :title="item.alarmTitle"
        ></a-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import { EarlyWarningQuery } from '@/api/early-warning/types';
import earlyWarningApi from '@/api/early-warning';
import { useI18n } from '@/locale';
import { EARLY_WARNING_STATUS, ALARM_LEVEL } from './util/constants';

const { t } = useI18n();
const props = withDefaults(defineProps<{
  query: EarlyWarningQuery
}>(), {
  query: () => ({} as EarlyWarningQuery),
})
const rangeDateChange = (date: any) => {
  if (date) {
    props.query.startTime = date[0]
    props.query.endTime = date[1]
  } else {
    props.query.startTime = undefined
    props.query.endTime = undefined
  }
  props.query.pageNum = 1
}

const alarmCodeList = ref<any[]>([])
const getAlarmTypeList = async () => {
	alarmCodeList.value = await earlyWarningApi.getAlarmTypes({ monitorCode: props.query.monitorCode });
}
getAlarmTypeList()

const resetPageNum = () => {
  props.query.pageNum = 1
}
</script>
  
<style>
  
</style>