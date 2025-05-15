<template>
  <!-- 折叠/展开左侧菜单 -->
  <div
    v-if="ctx.showMenu"
    :class="['collapse-icon', ctx.collpased && 'collapse-icon__active']"
    @click="ctx.collpased = !ctx.collpased"
    @mouseenter="() => enableCanGridLeftMenuHide()"
    @mouseleave="() => disableCanGridLeftMenuHide()"
  >
    <span :class="['business-icon icon-menu', ctx.collpased && 'icon-menu_opened']"></span>
  </div>
</template>
<script setup lang="ts">
import { useGridContext } from '../context'
import useGridLeftMenu from '../hooks/useGridLeftMenu'

const { enableCanGridLeftMenuHide, disableCanGridLeftMenuHide } = useGridLeftMenu()
const ctx = useGridContext()
</script>
<style scoped lang="scss">
.collapse-icon {
  width: 64px;
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-right: 1px solid var(--color-bg-white);
  background: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;

  &:not(.collapse-icon__active):hover {
    background: #e6f6ff;
  }

  &__active {
    background: rgb(var(--primary-6));
  }
}
</style>
