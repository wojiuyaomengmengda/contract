<template>
  <div class="close-org" v-show="!biGridStore.gridOrgSearchPanelShow">
    <div
      class="option"
      @click="onOrgNameClick"
      @mouseenter="() => enableCanGridOrgSearchPanelHide()"
      @mouseleave="() => disableCanGridOrgSearchPanelHide()"
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
          fill="url(#paint0_linear_11493_58366)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_11493_58366"
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
            d="M25.334 4L21.258 0L5.33398 16L21.258 32L25.334 28L13.334 16L25.334 4Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGridContext } from '../../../context/index'
import useGridOrgSearchPanel from '../../../hooks/useGridOrgSearchPanel'
import { useBiGridStore } from '../../../store/grid'

const biGridStore = useBiGridStore()
const ctx = useGridContext()
const { enableCanGridOrgSearchPanelHide, disableCanGridOrgSearchPanelHide } =
  useGridOrgSearchPanel()

const onOrgNameClick = () => {
  if (biGridStore.gridOrgSearchPanelShow) {
    biGridStore.setGridOrgSearchPanelShow(false)
  } else {
    biGridStore.setGridOrgSearchPanelShow(true)
  }
}
</script>
<style lang="scss" scoped>
.close-org {
  position: fixed;
  top: calc(50% + 20px);
  transform: translateY(-50%);
  right: 20px;
  cursor: pointer;

  .option {
    position: relative;
    .btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
