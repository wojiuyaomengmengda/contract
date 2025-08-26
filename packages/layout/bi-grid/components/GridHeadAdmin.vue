<template>
  <div class="extra-item" @click="goAdmin">
    <a-tooltip :content="t('管理后台')" background-color="#49596b">
      <span class="business-icon icon-workcenter"></span>
    </a-tooltip>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/util/store/user'
import { useI18n } from '@/locale'
import { Modal } from '@arco-design/web-vue'
import { h } from 'vue'

const { t } = useI18n()
const userStore = useUserStore()
// 跳后台
const goAdmin = () => {
  if (userStore.account === 'csmart5') {
    Modal.info({
      content: () =>
        h('div', { class: 'info-modal-content' }, [
          h('span', {}, t('5.0试用账号暂时不支持进入后台管理系统!'))
        ])
    })
    return
  }
  const adminUrl = `${window.location.origin}${process.env.adminBaseUrl}/index.html`
  window.location.replace(adminUrl)
}
</script>

<style lang="scss" scoped>
.extra-item {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
