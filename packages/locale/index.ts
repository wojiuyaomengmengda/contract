/* eslint-disable no-restricted-syntax */
import { ref, reactive, computed } from "vue"
import { isString, merge } from "lodash"
import base from "@/api/base"
import { getCurrlocale } from '@/util/common';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import zhTW from '@arco-design/web-vue/es/locale/lang/zh-tw';
import { useLocale, addI18nMessages } from "@arco-design/web-vue";
import sc from './sc'
import en from './en'
import tc from './tc'
import { isMarketization } from "@/util/common/projectType";

const arcoLang: any = {
  en: {
    code: 'en-US',
    message: enUS
  },
  sc: {
    code: 'zh-CN',
    message: zhCN
  },
  tc: {
    code: 'zh-TW',
    message: zhTW
  }
}
const LOCALE = ref(getCurrlocale())
const I18N_MESSAGES = reactive<{[key: string]: any}>({
  sc,
  tc,
  en
});

const setGlobalLang = async () => {
  const message: any = {}
  addI18nMessages({
    [arcoLang[LOCALE.value].code]: arcoLang[LOCALE.value].message
  })
  useLocale(arcoLang[LOCALE.value].code)

  if (process.env.PROJECT_NAME !== 'sunley' && !isMarketization()) {
    try {
      const res = await base.getLanguageDict({
        tenantId: process.env.TENANT_ID as string
      })
  
      message[LOCALE.value] = res[LOCALE.value]
      I18N_MESSAGES[LOCALE.value] = merge({}, I18N_MESSAGES[LOCALE.value], message)
    } catch (e) {
      console.error(e)
    } 
  }
}

setGlobalLang()
// 仅内部使用
export const useI18n = () => {
  const i18nMessage = computed(
    () => I18N_MESSAGES[LOCALE.value]
  );
  const locale = computed(() => i18nMessage.value.locale);

  const transform = (key: string, ...args: any[]): string => {
    const keyArray = key.split('.');
    let temp: any = i18nMessage.value;
    for (const keyItem of keyArray) {
      if (!temp[keyItem]) {
        return key;
      }
      temp = temp[keyItem];
    }
    if (isString(temp)) {
      if (args.length > 0) {
        return temp.replace(/{(\d+)}/g, (sub, index) => args[index] ?? sub);
      }

      return temp;
    }
    return temp;
  }

  return {
    i18nMessage,
    locale,
    t: transform,
  };
};