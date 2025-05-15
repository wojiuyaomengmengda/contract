import { ref, reactive, watch } from 'vue'
import { EarlyWarningQuery } from '@/api/early-warning/types'
import { useOrgStore } from '@/util/store/org'
import { debounce } from 'lodash-es'
import earlyWarningApi from '@/api/early-warning'
import { codeApiMap } from './config'

export const useTable = (monitorCode: string) => {
  const loading = ref(false)
  
  const orgStore = useOrgStore()
  const tableData = ref<any[]>([])
  const total = ref(0)
  const queryParams = reactive<EarlyWarningQuery>({
    orgId: orgStore.value.id, 
    largeScreenStatus: 1,
    monitorCode,
    pageNum: 1,
    pageSize: 10,
  })

  const initData = async () => {
    try {
      loading.value = true
      const res = await earlyWarningApi.getAlarmList({
        ...queryParams,
        api: codeApiMap[monitorCode].listApi
      })
  
      tableData.value = res.list.map((item: any) => ({
        ...item,
        expanded: false
      }))
      total.value = res.totalCount
    } finally {
      loading.value = false
    }
  }

  const pageChange = (page: number) => {
    queryParams.pageNum = page
  }
  
  const pageSizeChange = (size: number) => {
    queryParams.pageSize = size
  }

  watch(
    () => queryParams,
    () => {
      debounce(() => {
        initData()
      }, 300)()
    },
    { deep: true, immediate: true }
  )

  return {
    tableData,
    loading,
    queryParams,
    total,
    pageChange,
    pageSizeChange,
    orgId: orgStore.value.id
  }
}