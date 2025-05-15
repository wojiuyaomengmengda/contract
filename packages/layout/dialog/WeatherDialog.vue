<template>
  <Transition name="weather-dialog">
    <div
      v-show="visible"
      class="weather-dialog"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
      >
      <div class="weather-dialog_header z-text-roll z-is-roll" style="--gap: 20px; --time: 40s;">
        <div class="weather-dialog_header_title" :data-text="title"></div>
      </div>
      <div class="weather-dialog_content">
        <div v-for="item in weatherList" :key="item" class="weather-item">
          <div class="weather-item_date">{{ setDate(item) }}</div>
          <div class="weather-item_weekday">{{ item.week }}</div>
          <img class="weather-item_icon" :src="`https://custom.verywis.com/COMM/c-smart4.0/pic${item.ForecastIcon}.png`" alt="">
          <div class="weather-item_weather">
            <a-tooltip :content="item.forecastWeather" background-color="#49596b">
              <span class="weather-item_weather_text">{{ item.forecastWeather }}</span>
            </a-tooltip>
          </div>
          <div class="weather-item_temperature">{{ item.forecastMintemp.value }} - {{ item.forecastMaxtemp.value }}℃</div>
        </div>
      </div>
    </div>
  </Transition>
</template>
  
<script setup lang='ts'>

const emit = defineEmits(['mouseleave', 'mouseenter'])

withDefaults(defineProps<{
  visible?: boolean
  weatherList: any[]
  title: string
}>(), {
  visible: false,
  weatherList: () => [],
  title: ''
})

const onMouseenter = () => {
  emit('mouseenter')
}
const onMouseleave = () => {
  emit('mouseleave')
}

const setDate = (val: any) => {
  const str1 = val.forecastDate.slice(4);
  const month = str1.slice(0, 2);
  const date = str1.slice(2);
  return `${month  }-${  date}`
};
</script>
  
<style lang="scss" scoped>
.weather-dialog {
  border-radius: var(--border-radius-large);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.10);
  position: fixed;
  top: 60px;
  box-sizing: border-box;
  padding: 32px 16px 16px;
  overflow: hidden;
  max-width: 960px;
  &_header {
    white-space: nowrap;
  }
  &_content {
    margin-top: 16px;
    display: flex;
    gap: 8px;
    .weather-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 96px;
      height: 168px;
      padding: 14px 0;
      background: linear-gradient(180deg, #F1F5F8 0%, #F4F8FC 100%);
      border-radius: var(--border-radius-medium);
      &:hover {
        background: rgb(var(--primary-1))
      }
      &_temperature,
      &_date {
        font-size: 16px;
        line-height: 24px;
        color: var(--color-text-0);
      }
      &_weather,
      &_weekday {
        font-size: 12px;
        line-height: 18px;
        color: var(--color-text-2);
        padding: 0 4px;
        max-width: 100%;

        &_text {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
      }
      &_icon {
        width: 40px;
        height: 40px;
        margin: 8px auto;
      }
    }
  }

  
  .z-text-roll {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    --gap: 0;
    --time: 15s;
  }

   .weather-dialog_header_title {
    position: relative;
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    line-height: 36px;
    height: 36px;
  }

  .weather-dialog_header_title::before {
    position: relative;
    left: 0;
    background: linear-gradient(180deg, #007AFF 0%, #284A69 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    content: attr(data-text);
  }

  .weather-dialog_header_title::before {
    --index: 0;
    animation: z-text-anim var(--time) linear infinite;
  }

  .weather-dialog_header_title::after {
    position: absolute;
    left: calc(100% + var(--gap));
    animation: z-text-anim var(--time) linear infinite;
    content: attr(data-text);
    background: linear-gradient(180deg, #007AFF 0%, #284A69 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    --index: 1;
  }

  @keyframes z-text-anim {
    0% {
      /* --index 为第几个文本 */
      left: calc((100% + var(--gap)) * var(--index));
    }

    100% {
      left: calc((100% + var(--gap)) * (var(--index) - 1));
    }
  }
}
</style>
<style>
.weather-dialog-enter-active,
.weather-dialog-leave-active {
  will-change: transform;
  transition: all 0.6s ease;
}

.weather-dialog-enter-from,
.weather-dialog-leave-to {
  opacity: 0;
  height: 0;
}

.weather-dialog-enter-to,
.weather-dialog-leave-from {
  opacity: 1;
  height: 268px;
}
</style>