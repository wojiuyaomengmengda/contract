<template>
  <BIGrid :data="data" :isAdapter="a" :customGrid="'BILayout2'" px2rem :orgName="'111'"> </BIGrid>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { getCurrentScreen } from '@/util/screen'

const a = ref(true)
// setInterval(()=>{
//   a.value = !a.value
// },3000)
const data = ref([])

getCurrentScreen().then((res) => {
  console.log(`output->res`, res)
  data.value = res
})
</script>

<style></style>
