<template>
  <Content v-if="ctx.getComponent" :data="ctx.renderData" :px2rem="ctx.px2rem"></Content>
</template>
<script setup lang="ts">
import { useGridContext } from '../context'
import Content from './content/Content.vue'
const ctx = useGridContext()
</script>
