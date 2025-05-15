<template>
  <div
    v-if="ctx.showMenu"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    :class="['header-menu', visible && 'active']"
  >
    <div class="header-menu_btn">
      <div class="header-menu_text">
        <EllipsisTip> {{ menu.name }} - {{ currentSubMenu }} </EllipsisTip>
      </div>
      <icon-down />
    </div>
    <div :class="['dropdown-menu', visible && 'opened']">
      <div class="dropdown-menu-group">
        <div class="parent-name">
          <i class="dropdown-menu__icon">
            <img v-if="menu.icon" :src="menu.icon" alt="" />
            <img v-else :src="workerImg" alt="" />
          </i>
          <span>{{ menu.name }}</span>
        </div>
        <div
          v-for="(item, index) in menu.screenList"
          :class="['child-item', item.path === pathStore.value && 'active']"
          @click="jumpPage(item)"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { usePathStore } from '@/util/store/path'
import { useOrgStore } from '@/util/store/org'
import EllipsisTip from '@/ellipsis-tooltip/index.vue'
import workerImg from '../img/header/worker.png'
import { useGridContext } from '../context'
import { RootOrgPath } from '@/common/business/const/org'

const ctx = useGridContext()
const orgStore = useOrgStore()

const pathStore = usePathStore()
const menu = ref<any>({})

watchEffect(() => {
  menu.value = ctx.scrrenGroup?.name ? ctx.scrrenGroup : {}
})

const currentSubMenu = computed(() => {
  return menu.value.screenList?.find((item: any) => item.path === pathStore.value)?.name
})

const jumpPage = async (e: any) => {
  if (e.path) {
    if (e.path === RootOrgPath) {
      await orgStore.init(localStorage.getItem('language') || 'tc', true)
    }
    pathStore.setValue(e.path)
    if (e.dataType === 1) {
      window.location.href = `${window.location.origin}${process.env.base}${e.path}/index.html`
    } else if (e.dataType === 2) {
      window.location.href = `${window.location.origin}${process.env.base}iframe/index.html`
    }
  }
}

const visible = ref(false)
</script>

<style lang="scss" scoped>
.header-menu {
  position: relative;
  max-width: 350px;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 16px;
    background: var(--color-bg-white);
  }
  &_btn {
    background-color: transparent;
    padding: 0 16px;
    height: 36px;
    line-height: 36px;
    display: flex;
    align-items: center;
    cursor: pointer;
    :deep(.arco-icon-down) {
      width: 20px;
      height: 20px;
      margin-left: 6px;
      color: var(--color-text-3);
      transition: all 0.3s;
    }
  }

  .header-menu_text {
    text-transform: capitalize;
    font-size: 16px;
    color: var(--color-text-0);
    font-weight: bold;
  }
  &.active {
    .header-menu_btn {
      border-radius: 4px;
      background: rgb(var(--primary-1));
      .arco-icon-down {
        transform: rotate(180deg);
        color: rgb(var(--primary-6));
      }
    }
  }
}
.dropdown-menu {
  position: absolute;
  height: 0;
  left: 0;
  z-index: 9999;
  margin-top: 1px;
  overflow: hidden;
  border: 2px solid var(--color-white);
  // backdrop-filter: blur(15px);
  border-radius: var(--border-radius-large);
  background:
    linear-gradient(161deg, rgb(219, 239, 250) -9.13%, #d3edfb),
    linear-gradient(181deg, rgb(223, 240, 251) 0.84%, #c9e6fb);
  box-shadow: 0 4px 12px 0 #d0e5f4;
  opacity: 0;
  transform: translateY(-40px);
  transition: 0.5s;
  visibility: hidden;
  &-group {
    border-radius: inherit;
    background: rgba(255, 255, 255, 0.6);
    padding: 8px 16px;
  }
  &.opened {
    min-height: 100px;
    height: auto;
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
  .parent-name {
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
    color: var(--color-text-1);
    border-bottom: 1px solid var(--color-border-2);
    display: flex;
    align-items: center;
    padding: 0 8px;
    white-space: nowrap;
  }
  &__icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 20px;
    }
  }
  .child-item {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    color: var(--color-text-0);
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background-color: #e6f6ff;
    }
    &:active {
      background-color: #e6f6ff;
      color: rgb(var(--primary-6));
    }
    &.active {
      color: rgb(var(--primary-6));
    }
  }
}

.parent-name,
.child-item,
.header-menu_text {
  text-transform: capitalize;
}
</style>
