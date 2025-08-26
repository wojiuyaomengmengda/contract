<template>
  <QueryForm :query="queryParams" />
  <a-table
    ref="tableRef"
    expandable
    :row-key="rowKey"
    :bordered="false"
    :data="tableData"
    :columns="columns"
    :pagination="{
      total: total,
      current: queryParams.pageNum,
      pageSize: queryParams.pageSize
    }"
    :scroll="{ y: 480 }"
    @page-size-change="pageSizeChange"
    @page-change="pageChange"
    :loading="loading"
    class="warning-table"
  >
    <template v-for="(value, name) in $slots" v-slot:[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
    <template #alarmTitle="{ record }">
      <AlarmTag v-if="record.alarmLevel" type="alarm" :level="alarmLevelTag(record.alarmLevel)">{{ record.alarmTitle }}</AlarmTag> 
      <AlarmTag color="red" v-else>{{ record.alarmTitle }}</AlarmTag>
    </template>
    <template #action="{ record }">
      <a-link @click="detail(record)">
        {{ t('详情') }}
        <icon-down v-if="!record.expanded" style="margin-left: 4px;" />
        <icon-up v-else style="margin-left: 4px;" />
      </a-link>
    </template>

    <template #expand-row="{ record }">
      <Detail :params="detailParams" />
    </template>
  </a-table>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue'
import { TableData } from '@arco-design/web-vue'
import { useI18n } from '@/locale'
import AlarmTag from '@/alarm-tag/index.vue'
import QueryForm from '../QueryForm.vue'
import Detail from './detail.vue'
import { useTable } from '../util/useTable'
import { codeApiMap } from '../util/config'
import { alarmLevelTag } from '../util/util'

const { t } = useI18n()

const detailParams = ref({})
const props = withDefaults(defineProps<{
  columns: any[]
  monitorCode: string
  rowKey: string
}>(), {
  columns: () => [],
  monitorCode: '',
  rowKey: 'id'
})

const { 
  loading, 
  tableData, 
  queryParams, 
  total,
  pageSizeChange, 
  pageChange 
} = useTable(props.monitorCode)
const tableRef = ref()

const detail = (record: TableData) => {
  record.expanded = !record.expanded
  tableData.value.forEach(item => {
    if (item[props.rowKey] !== record[props.rowKey]) {
      item.expanded = false
      tableRef.value.expand(item[props.rowKey], item.expanded)
    }
  })
  if (record.expanded) { 
    detailParams.value = {
      api: codeApiMap[props.monitorCode].detailApi,
      orgId: queryParams.orgId,
      monitorCode: props.monitorCode,
      recordId: record[props.rowKey],
    }
  } else {
    detailParams.value = {}
  }
  tableRef.value.expand(record[props.rowKey], record.expanded)
}

</script>
