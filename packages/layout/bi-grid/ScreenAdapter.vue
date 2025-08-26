<template>
  <template v-if="ctx.isAdapter">
    <div :class="{ 'home-page': isStyle }" :style="{ height: isStyle ? '1080px' : '100%' }">
      <slot></slot>
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { addGridContext, useGridContext } from './context'
import { GridOptions } from './types/grid.d'

const props = withDefaults(defineProps<{ isStyle?: any }>(), {
  isStyle: true
})
const ctx = useGridContext()
const app = document.getElementById('app') as HTMLElement
const docEle = document.documentElement

const handleScreenAuto = () => {
  const designDraftWidth = 1920
  const designDraftHeight = 1080
  const scale =
    document.documentElement.clientWidth / document.documentElement.clientHeight <
    designDraftWidth / designDraftHeight
      ? document.documentElement.clientWidth / designDraftWidth
      : document.documentElement.clientHeight / designDraftHeight
  app.style.transform = `scale(${scale}) translate(-50%)`
  app.classList.add('scale-app')
}

watch(
  () => ctx.isAdapter!,
  (val: boolean) => {
    console.log(val)

    if (!val) {
      const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
      const resizeFun = () => {
        const designDraftWidth = 1920
        const designDraftHeight = 1080
        const fontSize =
          document.documentElement.clientWidth / document.documentElement.clientHeight <
          designDraftWidth / designDraftHeight
            ? `${100 * (docEle.clientWidth / 1920)}px`
            : `${100 * (docEle.clientHeight / 1080)}px`
        docEle.style.fontSize = fontSize
      }
      app.style.removeProperty('transform')
      app.classList.remove('scale-app')
      window.removeEventListener(resizeEvt, resizeFun, false)
      window.addEventListener(resizeEvt, resizeFun, false)
      window.addEventListener('DOMContentLoaded', resizeFun, false)
    } else {
      handleScreenAuto()
      window.addEventListener('resize', () => {
        handleScreenAuto()
      })
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<style lang="scss">
// @import url('./reset.css');
.scale-app {
  background-color: transparent;
  display: inline-block;
  width: 1920px !important;
  height: 1080px !important;
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
}

.home-page {
  position: relative;
  margin: 0 20px;
  height: 1080px;
}
</style>
