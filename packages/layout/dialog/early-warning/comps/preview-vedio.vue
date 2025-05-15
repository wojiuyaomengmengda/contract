<template>
   <a-modal 
    v-model:visible="visible" 
    title-align="start"
    :title="modalTitle"
    :width="1000"
    :footer="false"
    popup-container="#app"
    :style="{zIndex: 9999}"
  >
  <video 
    :src="url"
    autoplay
    controls
    style="margin: 0 auto;"
  />
  </a-modal>
</template>
  
<script setup lang='ts'>
import { ref } from 'vue'
const visible = ref(false)
const url = ref('')
const modalTitle = ref('')
const open = (title: string, src: string) => {
  url.value = src
  modalTitle.value = title
  visible.value = true
}

const close = () => {
  visible.value = false
}

defineExpose({
  open,
  close
})
</script>
  
<style>
  
</style>