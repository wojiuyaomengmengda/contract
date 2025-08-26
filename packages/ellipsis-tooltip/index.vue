<template>
  <a-tooltip
    v-if="tootip && showTootip"
    :position="props.position"
    content-class="ellipsis-tooltip-popup"
     background-color="#49596b"
    :arrow-style="{ backgroundColor: 'transparent' }"
  >
    <template #content>
      <span class="ellipsis-tooltip-popup_content">
        <slot name="tooltipContent"></slot>
        <slot v-if="!slots.tooltipContent"></slot>
      </span>
    </template>
    <span
      ref="contentRef"
      class="ellipsis-tooltip"
      :class="{
        ellipsis: ellipsis
      }"
      :style="{
        '-webkit-line-clamp': props.ellipsisLine
      }"
    >
      <slot></slot>
    </span>
  </a-tooltip>
  <span
    v-else
    ref="contentRef"
    class="ellipsis-tooltip"
    :class="{
      ellipsis: ellipsis
    }"
    :style="{
      '-webkit-line-clamp': props.ellipsisLine
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { nextTick, ref, onMounted, watch, useSlots, onUnmounted } from 'vue'

const slots = useSlots()
const props = defineProps({
  ellipsisLine: {
    type: Number,
    default: 1
  },
  // 是否需要气泡
  tootip: {
    type: Boolean,
    default: true
  },
  // 气泡位置
  position: {
    type: String,
    default: 'br'
  }
})

const contentRef = ref<HTMLSpanElement>()
const showTootip = ref(false)

// 是否使用省略
const ellipsis = ref(true)

const initTootip = async (): Promise<void> => {
  // 不需要气泡不进行处理
  if (!props.tootip) return
  ellipsis.value = false
  await nextTick()
  try {
    if (!contentRef.value) return
    // 获取行数
    const line = contentRef.value.getClientRects().length
    showTootip.value = line > props.ellipsisLine
  } catch (error) {
    showTootip.value = true
  }
  ellipsis.value = true
}

onMounted(() => {
  initTootip()
  watch(
    () => slots.default && slots.default(),
    async () => {
      await nextTick()
      initTootip()
    },
    {
      deep: true
    }
  )

  window.addEventListener('resize', initTootip)
})

onUnmounted(() => {
  window.removeEventListener('resize', initTootip)
})
</script>

<style lang="scss" scoped>
.ellipsis-tooltip {
  &.ellipsis {
    display: -webkit-box; /* 必须设置此项才能生效 */
    -webkit-line-clamp: 3; /* 限制最大行数 */
    line-clamp: 3; /* 限制最大行数 */
    -webkit-box-orient: vertical; /* 垂直布局 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 显示省略号 */
  }
}
</style>

<style lang="scss">
.ellipsis-tooltip-popup {
  border-radius: var(--border-radius-medium) !important;
  padding: 8px 12px !important;
  .ellipsis-tooltip-popup_content {
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    line-height: 1.15;
  }
}
</style>
