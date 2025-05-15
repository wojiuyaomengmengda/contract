<template>
  <BIGrid :data="data"></BIGrid>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { getCurrentScreen } from '@/util/screen'

const data = ref([])

getCurrentScreen().then((res) => {
  console.log(`output->res`,res)
  data.value = res
})

</script>

<style></style>
