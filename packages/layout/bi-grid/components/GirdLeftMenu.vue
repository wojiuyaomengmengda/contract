<template>
  <div
    :class="['menu-container', ctx.collpased && 'opened']"
    @mouseenter="() => enableCanGridLeftMenuHide()"
    @mouseleave="() => disableCanGridLeftMenuHide()"
  >
    <slot name="header"></slot>
    <div class="menu-wrap">
      <div class="menu">
        <template v-for="item in renderMenu" :key="item.groupId">
          <div
            :class="['menu-item', item.opened && 'is-opened']"
            @click="item.opened = !item.opened"
          >
            <div class="menu-item-title">
              <div class="menu-item-title-info">
                <i class="icon">
                  <img :src="item.icon || workerImg" alt="" />
                </i>
                <span class="menu-item__level1">
                  <EllipsisTip>{{ item.name }}</EllipsisTip>
                </span>
              </div>
              <i class="arrow-down">
                <icon-down />
              </i>
            </div>
            <div
              class="menu-item-content"
              :style="{ height: item.opened ? menuItemHeight(item) : '0' }"
            >
              <div
                v-for="(subItem, index) in item.screenList"
                :key="index"
                class="menu-item-content-item"
                @click="jumpPage(subItem)"
              >
                <span class="menu-item__level2">
                  <EllipsisTip>{{ subItem.name }}</EllipsisTip>
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watchEffect } from 'vue'
import { usePathStore } from '@/util/store/path'
import useDocumentClick from '@/hooks/useDocumentClick'
import EllipsisTip from '@/ellipsis-tooltip/index.vue'
import { useOrgStore } from '@/util/store/org'
import workerImg from '../img/header/worker.png'
import { useBiGridStore } from '../store/grid'
import useGridLeftMenu from '../hooks/useGridLeftMenu'
import { useGridContext } from '../context'
import { RootOrgPath } from '@/common/business/const/org'

const orgStore = useOrgStore()
const { enableCanGridLeftMenuHide, disableCanGridLeftMenuHide } = useGridLeftMenu()
const ctx = useGridContext()

const hideLeftMenu = () => {
  ctx.collpased = false
}
const biGridStore = useBiGridStore()
useDocumentClick(() => {
  if (biGridStore.isCanGridLeftMenuHide) {
    hideLeftMenu()
  }
})

const renderMenu = ref<any[]>([])

watchEffect(() => {
  renderMenu.value = ctx.menus!.length
    ? ctx.menus!.map((item: any) => {
        return {
          ...item,
          opened: false
        }
      })
    : []
})
const jumpPage = async (e: any) => {
  if (e.path) {
    if (e.path === RootOrgPath) {
      await orgStore.init(localStorage.getItem('language') || 'tc', true)
    }
    usePathStore().setValue(e.path)
    usePathStore().setDesValue(e.description)
    if (e.dataType === 1) {
      window.location.href = `${window.location.origin}${process.env.base}${e.path}/index.html`
    } else if (e.dataType === 2) {
      window.location.href = `${window.location.origin}${process.env.base}iframe/index.html`
    }
  }
}

const menuItemHeight = (item: any) => {
  let height = '0'
  if (!ctx.px2rem) {
    height = `${item.screenList.length * 34}px`
  } else {
    height = `${(item.screenList.length * 34) / 100}rem`
  }
  return height
}
</script>

<style lang="scss" scoped>
.menu-container {
  opacity: 0;
  transition: all 0.6s;
  transform: translateX(-300px);
  z-index: 999;
  background:
    linear-gradient(161deg, rgba(219, 239, 250, 1) -9.13%, #d3edfb),
    linear-gradient(181deg, rgba(223, 240, 251, 1) 0.84%, #c9e6fb);
  &.opened {
    transform: translateX(0);
    opacity: 1;
  }
}

.menu-wrap {
  width: 100%;
  border: 2px solid var(--color-bg-white);
  background: rgba(255, 255, 255, 0.6);
  padding: 24px 12px;
  user-select: none;
  min-height: 100%;

  .menu {
    &-item {
      &:not(:first-child) {
        margin-top: 32px;
      }

      &__level1 {
        font-size: 16px;
        margin-left: 16px;
        text-transform: capitalize;

        &:deep(.ellipsis-tooltip) {
          text-transform: capitalize;
        }
      }

      &-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        color: var(--color-text-0);
        cursor: pointer;
        padding-right: 14px;

        &-info {
          display: flex;
          align-items: center;
        }

        .icon {
          width: 40px;
          height: 40px;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;

          img {
            height: 20px;
          }
        }

        &:hover {
          color: rgb(var(--primary-6));
          background: rgb(var(--primary-1));
          border-radius: var(--border-radius-medium);
        }

        .arrow-down {
          transition: all 0.6s;
        }
      }

      &-content {
        padding-left: 56px;
        height: 0;
        overflow: hidden;
        transition: all 0.6s;

        &-item {
          margin-top: 12px;
          line-height: 22px;
          color: var(--color-text-1);
          cursor: pointer;

          .menu-item__level2:deep(.ellipsis-tooltip),
          .menu-item__level2 {
            font-size: 14px;
            text-transform: capitalize;
          }

          &:hover,
          &:hover .menu-item__level2 {
            color: rgb(var(--primary-6));
          }
        }
      }

      &.is-opened {
        .menu-item-title {
          color: rgb(var(--primary-6));
          background: rgb(var(--primary-1));
          border-radius: var(--border-radius-medium);

          .arrow-down {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}
</style>
