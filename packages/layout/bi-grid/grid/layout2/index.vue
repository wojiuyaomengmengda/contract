<template>
  <!-- 布局模板结构不需要写业务 通过deep穿透修改13个小模块样式-->
  <div class="bi-gird">
    <div class="grid-header-left">
      <!-- 折叠/展开左侧菜单 -->
      <slot name="GridHeadFoldMenu">
        <GridHeadFoldMenu />
      </slot>

      <!-- 顶部菜单 -->
      <slot name="GirdHeaderMenu">
        <GirdHeaderMenu class="GirdHeaderMenu"></GirdHeaderMenu>
      </slot>
    </div>
    <div class="header-org">
      <slot name="GridCompanyName">
        <GridCompanyName></GridCompanyName>
      </slot>
    </div>

    <div class="grid-header-right">
      <!-- 天气 -->
      <slot name="Weather">
        <Weather />
      </slot>
      <!-- 右侧功能 -->
      <div class="extra">
        <!-- 后台入口 -->
        <slot name="GridHeadAdmin">
          <GridHeadAdmin></GridHeadAdmin>
        </slot>
        <!-- 警报中心 -->
        <slot name="GridHeadAlarm">
          <GridHeadAlarm></GridHeadAlarm>
        </slot>

        <!-- Ai助手 -->
        <slot name="GridHeadAiAssistant">
          <GridHeadAiAssistant></GridHeadAiAssistant>
        </slot>
        <!-- 个人信息 -->
        <slot name="GridHeadPersonal">
          <GridHeadPersonal></GridHeadPersonal>
        </slot>
      </div>
    </div>

    <GirdLeftMenu class="container">
      <template #header>
        <div class="optons">
          <div class="name">{{ t('菜单') }}</div>
          <div class="close" @click="ctx.collpased = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.6464 6.76355C18.8417 6.56829 18.8417 6.25171 18.6464 6.05645L17.9436 5.35355C17.7483 5.15829 17.4317 5.15829 17.2364 5.35355L12 10.59L6.76355 5.35355C6.56829 5.15829 6.25171 5.15829 6.05645 5.35355L5.35355 6.05645C5.15829 6.25171 5.15829 6.56829 5.35355 6.76355L10.59 12L5.35355 17.2364C5.15829 17.4317 5.15829 17.7483 5.35355 17.9436L6.05645 18.6464C6.25171 18.8417 6.56829 18.8417 6.76355 18.6464L12 13.41L17.2364 18.6464C17.4317 18.8417 17.7483 18.8417 17.9436 18.6464L18.6464 17.9436C18.8417 17.7483 18.8417 17.4317 18.6464 17.2364L13.41 12L18.6464 6.76355Z"
                fill="#4E5969"
              />
            </svg>
          </div>
        </div>
      </template>
    </GirdLeftMenu>
    <GirdMainContent></GirdMainContent>
    <template v-if="!ctx.getComponent">
      <slot></slot>
    </template>
    <Transition name="bi-slide-left">
      <GridOrgSearchPanel class="GridOrgSearchPanel">
        <div
          class="option"
          @click="onOrgNameClick"
   
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="292"
            viewBox="0 0 38 292"
            fill="none"
          >
            <path
              d="M38 292V0L37.0662 1.71727C-12.1895 92.295 -11.8374 201.741 38 292Z"
              fill="url(#paint0_linear_11493_58356)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_11493_58356"
                x1="40"
                y1="146"
                x2="-12.4702"
                y2="147.251"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#A3DCFF" stop-opacity="0" />
                <stop offset="0.767421" stop-color="#007AFF" />
              </linearGradient>
            </defs>
          </svg>
          <div class="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M6.66699 4L10.743 0L26.667 16L10.743 32L6.66699 28L18.667 16L6.66699 4Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </GridOrgSearchPanel>
    </Transition>
    <Transition name="bi-slide-left">
      <GridAiAssistantPanel class="GridAiAssistantPanel" />
    </Transition>
    <!-- 关闭组件按钮 -->
    <CloseOrg />
  </div>
</template>
<script setup lang="ts">
import { useGridContext } from '../../context/index'
import { useI18n } from '@/locale'
import { useBiGridStore } from '../../store/grid'
import useDocumentClick from '@/hooks/useDocumentClick'
import useGridOrgSearchPanel from '../../hooks/useGridOrgSearchPanel'
import CloseOrg from './components/close-org.vue'

const biGridStore = useBiGridStore()
const { t } = useI18n()
const ctx = useGridContext()
const { enableCanGridOrgSearchPanelHide, disableCanGridOrgSearchPanelHide } =
  useGridOrgSearchPanel()
const {
  GridHeadFoldMenu,
  GirdLogo,
  GirdHeaderMenu,
  GridCompanyName,
  GirdLeftMenu,
  GirdMainContent,
  GridHeadAdmin,
  GridHeadAlarm,
  GridHeadAiAssistant,
  GridHeadPersonal,
  Weather,
  GridOrgSearchPanel,
  GridAiAssistantPanel
} = ctx.gridComponents!

const onOrgNameClick = () => {
  if (biGridStore.gridOrgSearchPanelShow) {
    biGridStore.setGridOrgSearchPanelShow(false)
  } else {
    biGridStore.setGridOrgSearchPanelShow(true)
  }
}
</script>
<style lang="scss" scoped>
.bi-gird {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .grid-header {
    &-left,
    &-right {
      width: fit-content;
      position: fixed;
      display: flex;
      height: 48px;
      top: 20px;
      align-items: center;
      padding: 12px 16px;
      z-index: 1000;
    }
    &-left {
      left: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 50px;
      border: 1px solid #fff;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      .GirdHeaderMenu {
        margin-left: 32px;
        :deep(.header-menu_btn) {
          .header-menu_text {
            max-width: 78px;
          }
        }
      }
      .collapse-icon {
        width: 24px;
        height: 24px;
        margin-left: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.collapse-icon__active {
          background-color: transparent;
        }
      }
    }

    &-right {
      right: 20px;
      justify-content: flex-end;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
    }
  }
  .header-org {
    width: fit-content;
    position: fixed;
    display: flex;
    height: 48px;
    top: 20px;
    align-items: center;
    padding: 12px 16px;
    left: 270px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    z-index: 1000;
    :deep(.org-name-wrap) {
      height: 100%;
      padding: 12px 16px;
      &:hover {
        background-color: transparent;
      }
      .org-name {
        max-width: 241px;
        text-align: left;
        font-size: 20px;
        &__toggle-icon {
          // display: none;
          visibility: visible;
        }
      }
    }
  }

  .extra {
    min-width: 184px;
    padding: 0 20px 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 24px;

    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 16px;
      background: var(--color-bg-white);
    }
  }

  .container {
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0;
    overflow-y: auto;
    width: 240px;
    border: 2px solid var(--colors-neutral-fill-0, #fff);
    background: #fff;
    box-shadow: 8px 8px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(30px);
    z-index: 1000;
    .optons {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e5e6eb;
      .name {
        font-size: 16px;
        color: var(--color-text-0);
      }
      .close {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        cursor: pointer;
      }
    }
  }
  .GridOrgSearchPanel {
    position: fixed;
    top: 84px;
    right: 20px;
    bottom: 20px;
    left: initial;
    border-radius: 8px;
    border: 2px solid var(--colors-neutral-fill-0, #fff);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 4px 12px 0px rgba(0, 98, 217, 0.08);
    backdrop-filter: blur(15px);
    overflow: visible;

    .option {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -42px;
      cursor: pointer;
      .btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    :deep(.tabs-wrap) {
      display: none;
    }
  }
  .GridAiAssistantPanel {
    position: fixed;
    top: 84px;
    right: 20px;
  }
}
</style>
