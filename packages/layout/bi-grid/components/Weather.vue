<template>
  <div
    class="weather"
    >
    <div v-if="extremeWeatherText || extremeWeatherImg.length" class="extreme-weather">
      <template v-if="extremeWeatherImg.length">
        <img 
          v-for="item in extremeWeatherImg"
          :key="item.code"
          class="extreme-weather__img"
          :src="item.elIcon" alt="" />
      </template>
      <span class="extreme-text">
        <EllipsisTip>{{ extremeWeatherText }}</EllipsisTip>
      </span>
    </div>
    <img 
      v-if="weather?.icon"
      class="weather-icon" 
      :src="weatherIcon" 
      alt="" />
    <div
      @mouseenter="() => onWeatherMouseenter()"
      @mouseleave="() => onWeatherMouseleave()"
      class="weather-info">
      <div class="weather-info-text">
        <div class="weather-info__temperature">{{ weather?.temp }}</div>
        <div class="weather-info__unit"> ℃</div>
      </div>
      <div class="weather-info__datetime">{{ currentTime }}</div>
    </div>
  </div>

  <WeatherDialog 
    :visible="isShowWeatherDialog" 
    :title="rangedateWeatherTitle"
    :weather-list="rangedateWeather"
    @mouseenter="() => onWeatherDialogMouseenter()"
    @mouseleave="() => onWeatherDialogMouseleave()"
    />
</template>
  
<script setup lang='ts'>
import { ref, watchEffect, computed } from 'vue';
import dayjs from 'dayjs';
import weatherApi from '@/api/weather';
import { useOrgStore } from '@/util/store/org';
import WeatherDialog from '@/layout/dialog/WeatherDialog.vue'
import useDelayExec from '@/hooks/useDelayExec';
import EllipsisTip from '@/ellipsis-tooltip/index.vue'

const orgStore = useOrgStore();
const locale = localStorage.getItem('language')  || 'tc'
const isShowWeatherPopover = ref(false)

const currentTime = ref('')
const updateTime = () => {
  currentTime.value = dayjs().format('YYYY-MM-DD HH:mm');
}
setInterval(updateTime, 1000);
updateTime()

const weather = ref<any>({})
const weatherIcon = computed(() => {
  if (typeof weather.value?.icon === 'number') {
    return `https://custom.verywis.com/COMM/c-smart4.0/pic${weather.value.icon}.png`
  }

  return weather.value?.icon
})

/**
 * 香港天气
 */
const getHkWeather = async () => {
	const data = await weatherApi.getHkRealtimeWeather({ orgId: orgStore.value.id, lang: locale });
	weather.value = data;
};
/**
 * 香港极端天气
 */
const extremeWeatherText = ref('')
const extremeWeatherImg = ref<any[]>([])
const getHkExtremeWeather = async () => {
  const res = await weatherApi.getHkExtremeWeather({ type: locale });
  if (res) {
    const num: any = Object.keys(Object.values(res)).map(item => {
      return item
    })
    const ff: any = num.map((item: any) => {
      return Object.values(res)[item]
    });

    extremeWeatherText.value = ff.map((item: any) => item.name).join(';')
    extremeWeatherImg.value = ff.map((item: any) => {
      return {
        ...item,
        elIcon: `https://new.c-smart.hk/BI/BI-icon/${  item.code  }.gif`
      }
    })
  }
}

const rangedateWeatherTitle = ref('')
const rangedateWeather = ref<any>([])
/**
 * 香港近段时间天气
 */
const getRangedateHkWeather = async () => {
  const data = await weatherApi.getRangDateweather({ lang: locale });
  rangedateWeather.value = data.weatherForecast.slice(0, 9)
  rangedateWeatherTitle.value = data.generalSituation
}

const getMacaoWeather = async () => {
	const data = await weatherApi.getMacaoRealtimeWeather({ orgId: orgStore.value.id, lang: locale });
	weather.value = data;
}

const getMacaoExtremeWeather = async () => {
  const res = await weatherApi.getMacaoWeathericon({ type: locale });
  if (res) {
    extremeWeatherImg.value = []
    extremeWeatherText.value = res
  }
}
watchEffect(() => {
  if (orgStore.value.region === 2) {
    getMacaoWeather()
    getMacaoExtremeWeather()
  } else {
    getHkWeather()
    getHkExtremeWeather()
    getRangedateHkWeather()
  }
})

const closeWeatherPopover = () => {
  isShowWeatherPopover.value = false
}


// 天气面板hover事件处理
const {
  start: closeWeatherPopoverStart,
  stop: closeWeatherPopoverStop
} = useDelayExec(closeWeatherPopover)
const showWeatherPopover = () => {
  closeWeatherPopoverStop();
  isShowWeatherPopover.value = true
}

const onWeatherMouseenter = () => {
  showWeatherPopover();
}
const onWeatherMouseleave = () => {
  closeWeatherPopoverStart();
}
const onWeatherDialogMouseenter = () => {
  showWeatherPopover();
}
const onWeatherDialogMouseleave = () => {
  closeWeatherPopoverStart();
}

const isShowWeatherDialog = computed(() => {
  return isShowWeatherPopover.value && (!!rangedateWeatherTitle.value || rangedateWeather.value.length > 0)
})

</script>
  
<style lang="scss" scoped>
.weather {
  min-width: 150px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &-icon {
    width: 40px;
    height: 40px;
    margin-left: 24px;
  }
  &-info {
    margin-left: 8px;
    &-text {
      display: flex;
    }
    &__temperature {
      font-size: 16px;
      font-style: normal;
      font-weight: bold;
      line-height: 24px;
      color: rgb(var(--primary-6));
    }
    &__unit {
      color: var(--color-text-2);
    }
    &__datetime {
      color: var(--color-text-2);
      font-size: 12px;
      font-style: normal;
      line-height: 18px;
      width: 105px;
    }
  }
}
.extreme-weather {
  display: flex;
  align-items: center;
  &__img {
    height: 46px;
    margin-right: 8px;
  }
}

.extreme-text {
  color: var(--color-text-0);
  font-size: 16px;
  font-weight: 500;
  max-width: 150px;
}

</style>