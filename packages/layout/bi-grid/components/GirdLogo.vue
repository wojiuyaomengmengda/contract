<template>
  <img :src="logo" alt="" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useOrgStore } from '@/util/store/org'
import defaultLogo from '../img/header/logo.png'

const props = defineProps<{
  logoUrl: string
}>()

const orgStore = useOrgStore()

// logo
const logo = computed(() => {
  if (props.logoUrl) {
    return props.logoUrl
  }
  
  if (orgStore.current.homeLogo) {
    return orgStore.current.homeLogo
  }

  return defaultLogo
})
</script>
<style lang="scss" scoped>
img {
  height: 34px;
}
</style>
