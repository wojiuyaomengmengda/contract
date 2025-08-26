<template>
  <!-- 布局模板结构不需要写业务 -->
  <div class="bi-gird">
    <div class="grid-header">
      <div class="grid-header-left">
        <slot name="GridHeadFoldMenu">
          <GridHeadFoldMenu />
        </slot>
        <!-- logo 区域 -->
        <div v-if="ctx.showLogo" class="logo">
          <slot name="GirdLogo">
            <GirdLogo :logo-url="ctx.logoUrl"></GirdLogo>
          </slot>
        </div>
        <!-- 顶部菜单 -->
        <slot name="GirdHeaderMenu">
          <GirdHeaderMenu></GirdHeaderMenu>
        </slot>
      </div>
      <slot name="GridCompanyName">
        <GridCompanyName class="grid-header-center"></GridCompanyName>
      </slot>

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
    </div>
    <GirdLeftMenu class="container"></GirdLeftMenu>
    <GirdMainContent></GirdMainContent>
    <template v-if="!ctx.getComponent">
      <slot></slot>
    </template>
    <Transition name="bi-slide-right">
      <GridOrgSearchPanel />
    </Transition>
    <Transition name="bi-slide-left">
      <GridAiAssistantPanel />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { useGridContext } from '../../context/index'

const ctx = useGridContext()
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
</script>
<style lang="scss" scoped>
.bi-gird {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .grid-header {
    display: flex;
    align-items: center;
    height: 64px;
    border-bottom: 1px solid transparent;
    background: linear-gradient(90deg, #edf6fb 0%, #fff 50%, #edf6fb 100%);
    // backdrop-filter: blur(20px);
    border-image: linear-gradient(to right, #badbff, #19b7ff, #007aff, #badbff);
    border-image-slice: 1;
    justify-content: space-between;
    user-select: none;
    z-index: 1000;

    &-left,
    &-center,
    &-right {
      display: flex;
      height: 100%;
      align-items: center;
    }

    &-left,
    &-right {
      flex: 1;
    }

    &-right {
      justify-content: flex-end;
    }
    .collapse-icon {
    }
    .logo {
      height: 63px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      user-select: none;
      flex-shrink: 0;
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
    position: absolute;
    left: 0;
    top: 62px;
    bottom: 0;
    overflow-y: auto;
    width: 240px;
  }
}
</style>
