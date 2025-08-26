<template>
  <a-tag 
    :class="['alarm-tag', type && `alarm-tag-type-${type}`, type === 'alarm' && `alarm-tag-level-${level}`]" 
    v-bind="attrs"
    :color="color"
  >
    <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="data">
      <slot :name="slot" v-bind="data || {}"></slot>
    </template>
    <template #icon v-if="type === 'alarm'">
      <img :src="alarmLevel" alt="">
    </template>
  </a-tag>
</template>
  
<script setup lang='ts'>
import { computed, useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false
})

interface Props {
  type?: '' | 'alarm'
  level?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  type: '',
  level: '',
})

const attrs = useAttrs()
const alarmLevel = computed(() => {
  return new URL(`./img/alarm-${props.level}.png`, import.meta.url).href;
})

const color = computed(() => {

  if (props.type === 'alarm') {
    switch (+props.level) {
      case 1:
        return 'red'
      case 2:
        return 'orange'
      case 3:
        return 'blue'
      default:
        return 'red'
    }
  }

  if (attrs.color) {
    return attrs.color as string
  }
  return ''
})

</script>
  
<style>
  
</style>