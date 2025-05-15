<template>
  <div class="grid-main-content h-full w-full">
    <template v-if="props.data.dataType === 1">
      <div
        v-for="item in renderComponents"
        :key="item.id"
        :style="{
          position: 'absolute',
          top: exchangeRem(item.top),
          left: exchangeRemLeft(item.left),
          right: exchangeRemRight(item.left),
          width: item.width === 100 ? item.width + '%' : exchangeRem(item.width),
          height: item.height === 100 ? 'auto' : exchangeRem(item.height),
          'z-index': item.stackIndex,
          transition: 'all 300ms ease 0s'
        }"
        :class="[item.componentList[0]?.style]"
      >
        <template v-if="item.componentList.length === 1 || !item.showMore">
          <div
            v-if="item.componentList[0]?.openScreenPath"
            class="h-full w-full cursor-pointer"
            @click="showIframe(item.componentList[0].openScreenPath)"
          >
            <div v-if="item.componentList[0].dataType === 1" class="component-item">
              <a-tooltip :content="t('更多模块')" background-color="#49596b">
                <img
                  v-if="expanded && !item.showMore && item.componentList.length > 1"
                  class="more-component-icon"
                  src="../../img/more.png"
                  alt=""
                  @click.stop="showMore(item)"
                />
              </a-tooltip>
              <component :is="item.componentList[0].document" />
            </div>
            <iframe
              v-else
              :src="formatIframePath(item.componentList[0].path)"
              width="100%"
              height="100%"
              frameborder="0"
              scrolling="no"
            />
          </div>
          <div v-else-if="item.componentList[0].dataType === 1" class="component-item">
            <a-tooltip :content="t('更多模块')" background-color="#49596b">
              <img
                v-if="expanded && !item.showMore && item.componentList.length > 1"
                class="more-component-icon"
                src="../../img/more.png"
                alt=""
                @click.stop="showMore(item)"
              />
            </a-tooltip>
            <component :is="item.componentList[0].document" />
          </div>
          <iframe
            v-else
            ref="iframe"
            :src="
              item.componentList[0].path +
              (item.componentList[0].path.indexOf('?') !== -1
                ? '&language=' + locale
                : '?language=' + locale)
            "
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
          />
        </template>
        <div
          v-else-if="item.componentList.length > 1 && item.showMore"
          class="h-full w-full componentlist-wrap"
        >
          <template v-for="(component, cIndex) in item.componentList">
            <div
              v-if="component?.openScreenPath"
              :key="component.id"
              :class="['h-full w-full cursor-pointer component-item', `card-${component.position}`]"
              :style="{ 'z-index': cIndex }"
              @click="showIframe(component.openScreenPath)"
            >
              <component
                :is="component.document"
                v-if="component.dataType === 1"
                class="more-component"
              />
              <iframe
                v-else
                :src="formatIframePath(component.path)"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
              />
            </div>
            <div
              v-else
              :key="component.id!"
              :class="[
                'h-full w-full component-item',
                expanded && 'show-shadow',
                `card-${component.position}`
              ]"
              :style="{ 'z-index': cIndex }"
              @click="changeComponent(item, component, cIndex)"
            >
              <component
                :is="component.document"
                v-if="component.dataType === 1"
                class="more-component"
              />
              <iframe
                v-else
                :src="formatIframePath(component.path)"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
              />
            </div>
          </template>
        </div>
      </div>
    </template>
    <div v-else-if="props.data.dataType === 2" class="h-full w-full iframe-container">
      <iframe
        width="100%"
        height="100%"
        allow="clipboard-write"
        :src="
          props.data.path +
          (props.data.path.indexOf('?') !== -1 ? '&language=' + locale : '?language=' + locale)
        "
        style="border-radius: 0.1rem; overflow: hidden"
      ></iframe>
    </div>
  </div>

  <transition name="opacitys" mode="out-in">
    <div v-if="iframeVisible" class="mask">
      <i class="business-icon icon-close" @click="showIframe('')"></i>
      <iframe
        id="iframe"
        height="100%"
        width="100%"
        frameborder="0"
        scrolling="no"
        :src="formatIframePath(openIframeSrc)"
      ></iframe>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue'
import { useTokenStore } from '@/util/store/oauth'
import { useScreenStore } from '@/util/store/screen'
import { getCurrlocale } from '@/util/common'
import { useI18n } from '@/locale'
import { cloneDeep } from 'lodash-es'
import { RootHomePath } from '@/common/business/const/org'

const { t } = useI18n()
const { proxy } = getCurrentInstance() as any
const locale = getCurrlocale()
const screenStore = useScreenStore()
const props = withDefaults(
  defineProps<{
    data: any
    px2rem?: boolean // 是否需要px转rem
  }>(),
  {
    data: {},
    px2rem: false
  }
)

const renderComponents = ref<any[]>([])
const carouselChange = (e: number, item: any) => {
  item.carouselIndex = e
}

// 为iframe嵌入的增加token
const formatIframePath = (path: string) => {
  if (!path) {
    return path
  }
  try {
    const tokenStore = useTokenStore()
    // 创建一个 URL 对象
    const urlObj = new URL(path)
    // 使用 URLSearchParams 对象获取查询参数
    const params = new URLSearchParams(urlObj.search)
    // 设置或更新查询参数
    params.set('c-smart-token', tokenStore.access_token)
    // 更新 URL 对象的查询部分
    urlObj.search = params.toString()
    // 返回新的 URL 字符串
    return urlObj.toString()
  } catch (err) {
    return path
  }
}
const openIframeSrc = ref('')
const iframeVisible = ref(false)
const showIframe = (path: string): void => {
  if (!path) {
    iframeVisible.value = false
    openIframeSrc.value = path
    return
  }
  screenStore.value.forEach((item) => {
    if (item.path === path) {
      iframeVisible.value = true
      openIframeSrc.value = `${window.location.origin}${process.env.base}${path}/index.html`
    }
  })
}

const expanded = ref(false)
proxy.mittBus.on('expandAll', (expand: boolean) => {
  expanded.value = expand
})
const exchangeRem = (px: number) => {
  if (props.px2rem) {
    return `${px / 100}rem`
  }
  return `${px}px`
}

const exchangeRemLeft = (px: number) => {
  if (props.data.path !== RootHomePath) {
    if (props.px2rem) {
      return `${px / 100}rem`
    }
    return `${px}px`
  }
  if (props.px2rem) {
    return px < 1000 ? `${px / 100}rem` : 'unset'
  }
  return px < 1000 ? `${px}px` : 'unset'
}

const exchangeRemRight = (px: number) => {
  if (props.data.path !== RootHomePath) {
    return 'unset'
  }
  if (px > 1000) return '0.25rem'
  return 'unset'
}

const resetTransform = (componentList: any[]) => {
  componentList.forEach((item: any) => {
    item.position = ''
  })
}

const showMoreComponent = (componentList: any[], clickedIndex: number) => {
  // 如果点击的是已经在最面的卡片，不做处理
  if (componentList[clickedIndex].position === 'front') return

  // 循环调整所有卡片的位置
  const positions = componentList.map((item, index) => {
    return index === 0 ? 'back' : index === componentList.length - 1 ? 'front' : 'middle'
  })

  // 找到点击的卡片当前位置的索引
  const clickedPositionIndex = positions.indexOf(componentList[clickedIndex].position)

  // 调整位置
  componentList.forEach((card, index) => {
    const currentPosIndex = positions.indexOf(card.position)
    if (index === clickedIndex) {
      card.position = 'front'
    } else if (currentPosIndex > clickedPositionIndex) {
      card.position = positions[currentPosIndex - 1]
    }
  })
}

const moveToFirst = (arr: any[], index: number) => {
  if (index < 0 || index >= arr.length) {
    return [...arr]
  }

  // 创建数组副本
  const newArr = [...arr]
  // 删除指定索引的元素并获取该元素
  const item = newArr.splice(index, 1)[0]
  // 将元素插入到数组首位
  newArr.unshift(item)

  return newArr
}

const changeComponent = (item: any, component: any, index: number) => {
  item.componentList = moveToFirst(item.componentList, index)
  item.showMore = false
  resetTransform(item.componentList)
}

const showMore = (item: any) => {
  item.showMore = !item.showMore
  // if (item.showMore) {
  // resetTransform(item.componentList)
  item.componentList.forEach((component: any, index: number) => {
    if (item.showMore) {
      if (index === 0) {
        component.position = 'back'
      } else if (index === item.componentList.length - 1) {
        component.position = 'front'
      } else {
        component.position = 'middle'
      }
    } else {
      component.position = ''
    }
  })
}

watch(
  () => props.data,
  () => {
    const itemList = cloneDeep(props.data?.itemList)
    renderComponents.value = (itemList ?? []).map((item: any) => {
      return {
        ...item,
        showMore: false
      }
    })

    console.log(renderComponents.value)
    // (itemList ?? []).forEach((item: any) => {
    //   const componentList = item.componentList.length > 0 ? [] : item.componentList
    //   if (item.componentList.length > 0) {
    //     item.showMore = false
    //     // item.componentList.forEach((component: any, index: number) => {
    //     //   componentList.push({
    //     //     ...component,
    //     //     position: index === 0 ? 'back' : index === item.componentList.length - 1 ? 'front' : 'middle',
    //     //   })
    //     // })
    //   }

    //   renderComponents.value.push({
    //     ...item,
    //     componentList
    //   })
    // })
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.h-full {
  height: 100%;
}
.w-full {
  width: 100%;
}
.component-carousel {
  :deep(.arco-carousel-arrow-left) {
    left: 0;
    height: 0.18rem;
    width: 0.18rem;
    background: linear-gradient(90deg, #1880b4 0%, #001323 100%);
    box-shadow: 0px 2px 6px 0px rgba(0, 23, 42, 0.5);
    border: 1px solid rgba(153, 232, 241, 1);
    transform: translate(-0.09rem, -50%);
    .arco-icon {
      font-size: 0.11rem;
    }
  }
  :deep(.arco-carousel-arrow-right) {
    right: 0;
    height: 0.18rem;
    width: 0.18rem;
    background: linear-gradient(90deg, #1880b4 0%, #001323 100%);
    box-shadow: 0px 2px 6px 0px rgba(0, 23, 42, 0.5);
    border: 1px solid rgba(153, 232, 241, 1);
    font-size: 0.1rem;
    transform: translate(0.09rem, -50%);
    .arco-icon {
      font-size: 0.11rem;
    }
  }
}
.iframe-container {
  border-radius: 0.1rem;
  transition: 'all 300ms ease 0s';
  padding: 20px 0;
}
.grid-main-content {
  // position: relative;
}
.componentlist-wrap {
  position: relative;
  height: 100%;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: 'all 300ms ease 0s';

  .more-component-icon {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 30px;
    height: 30px;
    z-index: 999;
    cursor: pointer;
  }
}
.component-item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.3s;
  transform-origin: 50% 0;

  &.card-back {
    top: 0;
    z-index: 1;
    opacity: 1;
    transform: translateY(-5px) translateZ(-10px) rotateX(-38deg);
  }

  &.card-front {
    top: 0;
    z-index: 3;
    transform: translateY(110px) translateZ(-20px) rotateX(-40deg);
    // box-shadow: 0px -10px 27px 0px rgba(101, 101, 101, 0.4);
  }

  &.card-middle {
    top: 0;
    z-index: 2;
    opacity: 1;
    transform: translateY(30px) translateZ(-13px) rotateX(-38deg);
    // box-shadow: 0px -10px 27px 0px rgba(101,101,101,0.4);

    &:nth-of-type(2) {
      transform: translateY(50px) translateZ(-15px) rotateX(-38deg);
    }
    &:nth-of-type(3) {
      transform: translateY(80px) translateZ(-18px) rotateX(-38deg);
    }
  }

  &.show-shadow {
    &.card-front {
      box-shadow: 0px -10px 27px 0px rgba(101, 101, 101, 0.4);
    }
    &.card-middle {
      box-shadow: 0px -10px 27px 0px rgba(101, 101, 101, 0.4);
    }
  }

  .more-component-icon {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 30px;
    height: 30px;
    z-index: 999;
    cursor: pointer;
  }
}
</style>
