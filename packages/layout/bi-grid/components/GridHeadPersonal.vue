<template>
  <div class="extra-item">
    <div @mouseenter="onAvatarMouseenter" @mouseleave="onAvatarMouseleave">
      <Avatar v-if="userStore.photo" :image-url="userStore.photo" size="xs" />
      <Avatar v-else type="icon" size="xs" />
    </div>
    <Transition name="bi-fade">
      <div
        v-show="isShowPersonalDialog"
        class="personal-dialog"
        @mouseenter="onPersonalDialogMouseenter"
        @mouseleave="onPersonalDialogMouseleave"
      >
        <!-- 头像 -->
        <Avatar v-if="userStore.photo" :image-url="userStore.photo" size="large" />
        <Avatar v-else type="icon" size="large" />
        <!-- 用户名 -->
        <div class="personal-name">{{ userStore.name }}</div>
        <!-- 角色 -->
        <div class="personal-role">{{ userRoleStore.roleName }}</div>

        <div class="personal-options">
          <div class="personal-options_item">
            <div class="personal-options_item-label">{{ t('语言') }}</div>
            <div class="personal-options_item-value">
              <span class="current-value">{{ currentLangText }}</span>
              <icon-right />
            </div>
            <div class="personal-options_popover language">
              <div
                v-for="item in langList"
                :key="item.value"
                class="personal-options_popover-item"
                :value="item.value"
                :class="[item.value === currentLang && 'personal-options_popover-item__active']"
                @click="exchangeLang(item.value)"
              >
                <div class="personal-options_popover-item-label">
                  <img v-if="item.icon" :src="item.icon" class="lang-icon" alt="" />
                  {{ item.label }}
                </div>
                <icon-check v-if="item.value === currentLang" />
              </div>
            </div>
          </div>
          <div class="personal-options_item">
            <div class="personal-options_item-label">{{ t('颜色选择') }}</div>
            <div class="personal-options_item-value">
              <span class="current-value">{{ currentThemeText }}</span>
              <icon-right />
            </div>
            <div class="personal-options_popover">
              <div
                v-for="item in themeList"
                :key="item.value"
                class="personal-options_popover-item"
                :value="item.value"
                :class="[item.value === currentTheme && 'personal-options_popover-item__active']"
                @click="exchangeTheme(item.value)"
              >
                {{ item.label }}<icon-check v-if="item.value === currentTheme" />
              </div>
            </div>
          </div>
        </div>

        <div class="personal-footer">
          <div class="personal-footer_item" @click="resetDialogShow = true">
            {{ t('修改密码') }}
          </div>
          <a-divider direction="vertical" />
          <div class="personal-footer_item" @click="logout">{{ t('退出登录') }}</div>
        </div>
      </div>
    </Transition>
    <ResetPassword v-model:visible="resetDialogShow" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Session } from '@/util/storage'
import { useOrgStore } from '@/util/store/org'
import { useUserStore } from '@/util/store/user'
import { useUserRoleStore } from '@/util/store/user-role'
import base from '@/api/base'
import { useScreenTreeStore } from '@/util/store/scrren-tree'
import useDelayExec from '@/hooks/useDelayExec'
import { useI18n } from '@/locale'
import ResetPassword from '@/layout/dialog/reset-password/index.vue'
import Avatar from '@/avatar/index.vue'

const { t } = useI18n()
const orgStore = useOrgStore()
const userStore = useUserStore()
const userRoleStore = useUserRoleStore()
const screenTreeStore = useScreenTreeStore()

const isShowPersonalDialog = ref(false)

const resetDialogShow = ref(false)

/**
 * 语言
 */
const currentLang = ref(localStorage.getItem('language') || 'tc')
const langList = ref<any>([])
const currentLangText = computed(() => {
  return langList.value.find((item: any) => item.value === currentLang.value)?.label || '繁體中文'
})
const getLangList = async () => {
  try {
    const res = await base.getLanguageList({
      tenantId: process.env.TENANT_ID as string
    })
    langList.value = res.map((item: any) => ({
      value: item.languageCode,
      label: item.languageValue,
      icon: item.languageImg
    }))
  } catch (e) {
    langList.value = [
      {
        value: 'tc',
        label: '繁體中文'
      },
      {
        value: 'sc',
        label: '简体中文'
      },
      {
        value: 'en',
        label: 'English'
      }
    ]
  }
}
// 切换语言
const exchangeLang = (key: string) => {
  userStore.setlanguage(key, true, async () => {
    const screenListTree = await base.scrrenListTree(orgStore.value.id, key)
    screenTreeStore.setValue(screenListTree)
    return ''
  })
}

/**
 * 主题颜色
 */
const currentTheme = ref(localStorage.getItem('theme') || 'light')
const themeList = [
  { label: t('浅色模式'), value: 'light' }
  // { label: t('深色模式'), value: 'dark' },
]
const currentThemeText = computed(() => {
  return themeList.find((item: any) => item.value === currentTheme.value)?.label || t('浅色模式')
})
// 切换主题
const exchangeTheme = (key: string) => {
  localStorage.setItem('theme', key)
  window.location.reload()
}

getLangList()
const logout = () => {
  Session.clear()
  window.location.href = `${window.location.origin}${process.env.base}login/index.html`
}

// 头像面板hover事件处理
const closePersonalDialog = () => {
  isShowPersonalDialog.value = false
}

const { start: closePersonalDialogStart, stop: closePersonalDialogStop } =
  useDelayExec(closePersonalDialog)
const showPersonalDialog = () => {
  closePersonalDialogStop()
  isShowPersonalDialog.value = true
}

const onAvatarMouseenter = () => {
  showPersonalDialog()
}
const onAvatarMouseleave = () => {
  closePersonalDialogStart()
}
const onPersonalDialogMouseenter = () => {
  showPersonalDialog()
}
const onPersonalDialogMouseleave = () => {
  closePersonalDialogStart()
}
</script>

<style lang="scss" scoped>
.extra-item {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.arco-dropdown-option__active {
  color: var(--primary-6);
  background-color: var(--color-fill-2);
}

.personal {
  &-dialog {
    cursor: default;
    width: 320px;
    border-radius: var(--border-radius-large);
    border: 2px solid var(--color-white);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 60px;
    right: 20px;
    box-sizing: border-box;
    padding: 32px 16px 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    height: auto;

    &::before {
      content: '';
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 320px;
      opacity: 0.2;
      background:
        linear-gradient(
          200deg,
          rgba(255, 255, 255, 0) 18.6%,
          rgba(255, 255, 255, 0.8) 54.65%,
          #fff 66.8%
        ),
        // url(./img/header/personal-dialolg_bg.png) lightgray 50% / cover no-repeat;
        url('https://tushen.oss-cn-hangzhou.aliyuncs.com/static/personal-dialolg_bg.png') lightgray
          50% / cover no-repeat;
      z-index: 0;
    }
  }

  &-name {
    font-size: 24px;
    font-weight: bold;
    line-height: 36px;
    color: var(--color-text-0);
    margin-top: 8px;
  }

  &-role {
    font-size: 16px;
    line-height: 24px;
    color: var(--color-text-3);
    margin-top: 8px;
  }

  &-options {
    margin: 24px;
    align-self: stretch;
    position: relative;

    &_item {
      display: flex;
      width: 100%;
      height: 48px;
      padding: 0px 8px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
      border-bottom: 1px solid var(--color-text-4);
      font-size: 16px;
      position: relative;
      cursor: pointer;
      &-label {
        color: var(--color-text-0);
      }
      &-value {
        color: var(--color-text-2);
        .current-value {
          margin-right: 8px;
        }
        :deep(.arco-icon-right) {
          color: var(--color-text-2);
          width: 20px;
        }
      }
    }

    &_popover {
      position: absolute;
      top: 45px;
      right: 0;
      width: 136px;
      padding: 8px 9px;
      border-radius: 4px;
      background: var(--color-white);
      z-index: 10;
      display: none;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);

      &.language {
        width: 150px;
      }

      &-item {
        display: flex;
        height: 32px;
        padding: 0px 8px;
        justify-content: space-between;
        align-items: center;
        color: var(--color-text-0);

        &:hover,
        &__active {
          background: rgb(var(--primary-1));
          border-radius: var(--border-radius-medium);
        }

        &-label {
          display: flex;
          align-items: center;
          gap: 8px;
          .lang-icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    &_item:hover {
      .personal-options_popover {
        display: block;
      }
    }
  }

  &-footer {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    &_item {
      color: var(--color-text-3);
      cursor: pointer;
    }
  }
}
</style>
