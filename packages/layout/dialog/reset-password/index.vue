<template>
   <a-modal 
    v-model:visible="currentShow" 
    hide-title
    :footer="false"
    modal-class="reset-password-modal"
    :width="dialogWidth"
    :mask-closable="currentStep === 2 ? false : true"
    popup-container="#app"
    :style="{zIndex: 9999}"
    @cancel="close"
  >
    <!-- 中海通用户须知 -->
      <div v-show="isZhtUser" class="reset-notice">
        <i class="business-icon icon-close" @click="close"></i>
        <div class="modal-title">{{ t('系统监测到您是中海通账户哦！') }}</div>
        <div class="notice-content">
          <div class="content-title">{{ t('如果修改密码请') }}：</div>
  
          <div class="notice-list">
            1、{{ t('登录企业邮箱') }} 
            <a href="https://owahk.cohl.com" target="_blank">（https://owahk.cohl.com）</a>
            {{ t('【选项】>【常规】>【我的账号】>【更改您的密码】进行密码修改（邮箱登录的时候，用户名前要加csci') }}\)
          </div>
          <div class="notice-list">
            2、{{ t('访问') }}
            <a href="https://bim.coli688.com/business-ui/" target="_blank">https://bim.coli688.com/business-ui/</a>
            {{ t('点击【忘记密码】进行密码修改。') }}
            {{ t('详细密码修改方法可到') }}
            <a href="https://webapp.csci.com.hk/nfs" target="_blank">https://webapp.csci.com.hk/nfs</a>
            {{ t('查阅') }}
          </div>
          <div class="shield">
            <img src="https://tushen.oss-cn-hangzhou.aliyuncs.com/static/shield.svg" alt="">
          </div>
        </div>
        <div class="button-wrap">
          <a-button class="business-btn" type="primary" @click="close">{{ t('我已知晓') }}</a-button>
        </div>
      </div>
      <!-- 选择验证方式 -->
      <div v-show="!isZhtUser && currentStep === 1" class="verification-mode">
        <i class="business-icon icon-close" @click="close"></i>
        <div class="modal-title">{{ t('请选择你的验证方式') }}</div>

        <img class="mode-bg" src="https://tushen.oss-cn-hangzhou.aliyuncs.com/mode-bg.svg" />
        <div class="verification-mode_list" @click="selectType('phone')">
          <div class="verification-mode_icon">
            <img src="../../bi-grid/img/phone.png" alt="">
          </div>
          <div class="verification-mode_info">
            <div class="verification-mode_title">{{ t('通过短信验证码验证') }}</div>
            <div class="verification-mode_desc">{{ t('如果你的手机还在正常使用，请选择此方式') }}</div>
          </div>
        </div>
        <div class="verification-mode_list" @click="selectType('email')">
          <div class="verification-mode_icon">
            <img src="../../bi-grid/img/email.png" alt="">
          </div>
          <div class="verification-mode_info">
            <div class="verification-mode_title">{{ t('通过邮箱验证码验证') }}</div>
            <div class="verification-mode_desc">{{ t('如果你的邮箱还在正常使用，请选择此方式') }}</div>
          </div>
        </div>
      </div>

      <!-- 手机验证码修改 -->
      <div v-show="currentStep === 2 && modifyCurrentShow === 'phone'" class="verification-code">
        <i class="business-icon icon-close" @click="close"></i>
        <div class="modal-title">{{ t('为确认是您本人操作，请完成以下验证') }}</div>
        <img class="code-bg1" src="../../bi-grid/img/codebg-1.png" alt="">
        <img class="code-bg2" src="../../bi-grid/img/codebg-2.png" alt="">
        <a-form ref="phoneModifyFormRef" auto-label-width class="form" :model="phoneModifyForm" :rules="modifyPhoneFormRules">
          <a-form-item :label="t('已验证手机')">
            <a-input :default-value="phone" disabled />
          </a-form-item>
          <a-form-item :label="t('短信验证码')" field="code">
            <a-input v-model="phoneModifyForm.code" :placeholder="t('请输入验证码')" style="margin-right: 24px;" />
            <a-button 
              v-if="!isCountDownModifyPhone"
              :loading="loadingSentModify"
              type="primary" 
              class="business-btn"
              @click="sendCodeModify" 
            >{{ t('获取验证码') }}</a-button>
            <a-button
              v-else
              class="business-btn"
              disabled
              type="primary" 
            >{{ timeNumModifyPhone }}{{ t("s后重新获取") }}</a-button>

            <template #extra>
              <div class="help-text">{{ t('没收到验证码？') }}</div>
            </template>
          </a-form-item>
          <a-form-item :label="t('新密码')" field="newPassword">
            <a-input-password 
            v-model="phoneModifyForm.newPassword" 
            autocomplete="off"
            :placeholder="t('请输入新密码')" />
          </a-form-item>
          <a-form-item :label="t('确认密码')" field="reNewPassword">
            <a-input-password 
              v-model="phoneModifyForm.reNewPassword" 
              autocomplete="off"
              :placeholder="t('请二次输入密码')" 
            />
          </a-form-item>
        </a-form>
        <div class="button-wrap">
          <a-button :loading="phoneModifyLoading" type="primary" class="business-btn" @click="phoneModifyHandle">{{ t('提交') }}</a-button>
          <div class="exchange-type" @click="changeModifyType">{{ t('更换其他修改方式') }}</div>
        </div>
      </div>
      <!-- 邮箱验证码修改 -->
      <div v-show="currentStep === 2 && modifyCurrentShow === 'email'" class="verification-code">
        <i class="business-icon icon-close" @click="close"></i>
        <img class="code-bg1" src="../../bi-grid/img/codebg-1.png" alt="">
        <img class="code-bg2" src="../../bi-grid/img/codebg-2.png" alt="">
        <div class="modal-title">{{ t('为确认是您本人操作，请完成以下验证') }}</div>
        <a-form ref="mailModifyFormRef" auto-label-width class="form" :model="mailModifyForm" :rules="modifyMailFormRules">
          <a-form-item :label="t('已验证邮箱')">
            <a-input :default-value="email" disabled />
          </a-form-item>
          <a-form-item :label="t('邮箱验证码')" field="code">
            <a-input v-model="mailModifyForm.code" :placeholder="t('请输入验证码')" style="margin-right: 24px;" />
            <a-button 
              v-if="!isCountDownModifyPhone"
              :loading="loadingSentModify"
              type="primary" 
              class="business-btn"
              @click="sendCodeModify" 
            >{{ t('获取验证码') }}</a-button>
            <a-button 
              v-else
              disabled
              class="business-btn"
              type="primary" 
            >{{ timeNumModifyPhone }}{{ t("s后重新获取") }}</a-button>

            <template #extra>
              <div class="help-text">{{ t('没收到验证码？') }}</div>
            </template>
          </a-form-item>
          <a-form-item :label="t('新密码')" field="newPassword">
            <a-input-password 
            v-model="mailModifyForm.newPassword" 
            autocomplete="off"
            :placeholder="t('请输入新密码')" />
          </a-form-item>
          <a-form-item :label="t('确认密码')" field="reNewPassword">
            <a-input-password 
              v-model="mailModifyForm.reNewPassword" 
              autocomplete="off"
              :placeholder="t('请二次输入密码')" 
            />
          </a-form-item>
        </a-form>
        <div class="button-wrap">
          <a-button :loading="loading" type="primary" class="business-btn" @click="mailModifyHandle">{{ t('提交') }}</a-button>
          <div class="exchange-type" @click="changeModifyType">{{ t('更换其他修改方式') }}</div>
        </div>
      </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useI18n } from '@/locale';
import { useUserStore } from '@/util/store/user'
import oauthApi from '@/api/oauth'
import { Message } from '@arco-design/web-vue';

const { t } = useI18n()
const props = withDefaults(defineProps<{
  visible: boolean
}>(), {
  visible: false
})

const userStore = useUserStore()

const phone = computed(() => {
  return (userStore.phone ?? '').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})

const email = computed(() => {
  return (userStore.email ?? '').replace(/(.{2}).*(.{2}@.*)/, '$1****$2')
})

const isZhtUser = computed(() => {
  return userStore.type === 2
})

const currentStep = ref(1)

const dialogWidth = computed(() => {
  if (isZhtUser.value) {
    return 800
  }

  if (currentStep.value === 1) {
    return 680
  }

  return 660
})

const modifyCurrentShow = ref('phone')

const emit = defineEmits(['update:visible', 'confirm'])
const currentShow = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

// 强密码正则
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,20}$/;

/**
 * 手机验证码修改
 */
const phoneModifyFormRef = ref()
const phoneModifyForm = reactive({
  phone: userStore.phone,
  code: '',
  phoneCountryCode: userStore.phoneCountryCode,
  captcha: '',
  newPassword: '',
  reNewPassword: '',
})


const modifyPhoneFormRules: any = {
  code: [
    {
      required: true,
      message: t('请输入验证码'),
      trigger: "blur",
    },
  ],
  newPassword: [
    {
      required: true,
      message: t("请重新输入新密码"),
    },
    {
      validator: (value: any, cb: any) => {
        if (value === "") {
          cb(t("请重新输入新密码"));
        } else if (!passwordRegex.test(value)) {
          cb(t("密码应包含数字、大写字母、小写字母和特殊符号，长度为8-20字符"));
        } else if (
          phoneModifyForm.reNewPassword !== "" &&
          phoneModifyForm.reNewPassword !== value
        ) {
          cb(t("请确保两次密码输入一致"));
        } else {
          cb();
        }
      },
      trigger: "blur",
    },
  ],
  reNewPassword: [
    {
      required: true,
      message: t("请重新输入新密码"),
    },
    {
      validator: (value: any, cb: any) => {
        if (value === "") {
          cb(t("请重新输入新密码"));
        } else if (!passwordRegex.test(value)) {
          cb(t("密码应包含数字、大写字母、小写字母和特殊符号，长度为8-20字符"));
        } else if (
          phoneModifyForm.newPassword !== "" &&
          phoneModifyForm.newPassword !== value
        ) {
          cb(t("请确保两次密码输入一致"));
        } else {
          cb();
        }
      },
      trigger: "blur",
    },
  ],
};

const modifyMailFormRules: any = {
  code: [
    {
      required: true,
      message: t('请输入验证码'),
      trigger: "blur",
    },
  ],
  newPassword: [
    {
      required: true,
      message: t("请重新输入新密码"),
    },
    {
      validator: (value: any, cb: any) => {
        if (value === "") {
          cb(t("请重新输入新密码"));
        } else if (!passwordRegex.test(value)) {
          cb(t("密码应包含数字、大写字母、小写字母和特殊符号，长度为8-20字符"));
        } else if (
          phoneModifyForm.reNewPassword !== "" &&
          phoneModifyForm.reNewPassword !== value
        ) {
          cb(t("请确保两次密码输入一致"));
        } else {
          cb();
        }
      },
      trigger: "blur",
    },
  ],
  reNewPassword: [
    {
      required: true,
      message: t("请重新输入新密码"),
    },
    {
      validator: (value: any, cb: any) => {
        if (value === "") {
          cb(t("请重新输入新密码"));
        } else if (!passwordRegex.test(value)) {
          cb(t("密码应包含数字、大写字母、小写字母和特殊符号，长度为8-20字符"));
        } else if (
          phoneModifyForm.newPassword !== "" &&
          phoneModifyForm.newPassword !== value
        ) {
          cb(t("请确保两次密码输入一致"));
        } else {
          cb();
        }
      },
      trigger: "blur",
    },
  ],
};

// 倒計時

const isCountDownModifyPhone = ref(false);
const timeNumModifyPhone = ref(60);
const countDownModifyPhone = ref();

const isCountDownModifyMail = ref(false);
const timeNumModifyMail = ref(60);
const countDownModifyMail = ref();

const loadingSentModify = ref(false);

// 开始倒计时
const startCountdownModify = (): void => {
  if (modifyCurrentShow.value === "phone") {
    countDownModifyPhone.value = setInterval(() => {
      setTimeout(() => {
        if (timeNumModifyPhone.value > 0 && timeNumModifyPhone.value <= 60) {
          isCountDownModifyPhone.value = true;
          timeNumModifyPhone.value -= 1;
        } else {
          isCountDownModifyPhone.value = false;
          clearInterval(countDownModifyPhone.value);
          timeNumModifyPhone.value = 60;
        }
      }, 0);
    }, 1000);
  } else {
    countDownModifyMail.value = setInterval(() => {
      setTimeout(() => {
        if (timeNumModifyMail.value > 0 && timeNumModifyMail.value <= 60) {
          isCountDownModifyMail.value = true;
          timeNumModifyMail.value -= 1;
        } else {
          isCountDownModifyMail.value = false;
          clearInterval(countDownModifyMail.value);
          timeNumModifyMail.value = 60;
        }
      }, 0);
    }, 1000);
  }
};


// 確定修改
const phoneModifyLoading = ref(false);
const phoneModifyHandle = () => {
  if (!phoneModifyFormRef.value) return;
  phoneModifyFormRef.value.validate(async (errors: any) => {
    if (!errors) {
      phoneModifyLoading.value = true;
      try {
        const res: any = await oauthApi.modifyPassword({
          tenantId: process.env.TENANT_ID,
          type: 1,
          phone: phoneModifyForm.phone,
          phoneCountryCode: phoneModifyForm.phoneCountryCode,
          captcha: phoneModifyForm.code,
          password: phoneModifyForm.reNewPassword,
        });
        phoneModifyLoading.value = false;
        if (res) {
          Message.success(t("修改密码成功，请输入新密码登录"));
          // 修改密碼成功，回到登錄界面
          window.location.replace('../../home/login/index.html')
        } else {
          Message.error(res.msg ? res.msg : t("系统错误"));
        }
      } catch (error: any) {
        phoneModifyLoading.value = false;
        Message.error(error || t("系统错误"));
      }
    }
  });
};

/**
 * 邮箱修改
 */
const mailModifyFormRef = ref();

const mailModifyForm = reactive({
  email: userStore.email,
  code: "",
  newPassword: "",
  reNewPassword: "",
  captcha: "",
});

// 確定修改
const loading = ref(false)
const mailModifyHandle = () => {
  if (!mailModifyFormRef.value) return;
  mailModifyFormRef.value.validate(async (errors:any) => {
    if (!errors) {
      if (loading.value) return;
      loading.value = true;
      try {
        const res: any = await oauthApi.modifyPassword({
          tenantId: process.env.TENANT_ID,
          type: 2,
          email: mailModifyForm.email,
          captcha: mailModifyForm.code,
          password: mailModifyForm.reNewPassword,
        });
        loading.value = false;
        if (res) {
          Message.success(t("修改密码成功，请输入新密码登录"));
          // 修改密碼成功，回到登錄界面
          window.location.replace('../../home/login/index.html')
        } else {
          Message.error(res.msg ? res.msg : t("系统错误"));
        }
      } catch (error: any) {
        loading.value = false;
        Message.error(error || t("系统错误"));
      }
    }
  });
};

// 发送短信
const sendCodeModify = async () => {
  if (modifyCurrentShow.value === "phone") {
    if (!phoneModifyForm.phone) {
      Message.error(t("你尚未绑定手机号码，请先手机号码"));
      return
    }
    try {
      await oauthApi.sendCodeOfModify({
        tenantId: process.env.TENANT_ID,
        phone: phoneModifyForm.phone,
        phoneCountryCode: phoneModifyForm.phoneCountryCode,
        type: 1,
      })
      startCountdownModify();
    } catch (error: any) {
      Message.error(error || t("系统错误"));
    } finally {
      loadingSentModify.value = false;
    }
  } else {
    if (!mailModifyForm.email) {
      Message.error(t("你尚未绑定邮箱，请先绑定邮箱"));
      return
    }
    try {
      await oauthApi.sendCodeOfModify({
        tenantId: process.env.TENANT_ID,
        email: mailModifyForm.email,
        type: 2,
      })
      startCountdownModify();
    } catch (error: any) {
      Message.error(error || t("系统错误"));
    } finally {
      loadingSentModify.value = false;
    }
  }
};

const reset = () => {
  isCountDownModifyPhone.value = false;
  timeNumModifyPhone.value = 60;

  isCountDownModifyMail.value = false;
  timeNumModifyMail.value = 60;
  loadingSentModify.value = false
  clearInterval(countDownModifyPhone.value)
  clearInterval(countDownModifyMail.value)

  mailModifyFormRef.value?.resetFields()
  phoneModifyFormRef.value?.resetFields()
}

const selectType = (type: string) => {
  modifyCurrentShow.value = type
  reset()
  currentStep.value = 2
}

const changeModifyType = () => {
  currentStep.value = 1
  reset()
}

const close = () => {
  reset()
  currentStep.value = 1
  currentShow.value = false
}
</script>

<style lang="scss" scoped>
.business-icon.icon-close {
  position: absolute;
  top: 32px;
  right: 32px;
  cursor: pointer;
  font-size: 32px;
  z-index: 100;
}
.modal-title {
  color: var(--color-text-0);
  font-size: 24px;
  position: relative;
  z-index: 20;
}

.reset-notice {
  padding: 32px;
  background: linear-gradient(to bottom, #E6F4FF 0%, #FFFFFF 100%);
  position: relative;

  .notice-content {
    margin-top: 40px;
    backdrop-filter: blur(40px);
    border: 2px solid rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 2px 8px 0px rgba(66, 118, 195, 0.1);
    padding: 20px;
    border-radius: 2px;
    position: relative;

    .shield {
      position: absolute;
      width: 162px;
      height: 182px;
      top: 50px;
      right: -20px;
      z-index: -1;
    }

    .content-title {
      color: rgb(var(--primary-6));
      font-size: 18px;
    }

    .notice-list {
      margin-top: 16px;
      color: var(--color-text-2);
      line-height: 24px;
      padding-right: 130px;
      a {
        color: rgb(var(--primary-6));
      }
    }
  }
}

.help-text {
  color: #0062D9;
  font-size: 12px;
  margin-top: 8px;
  cursor: pointer;
}

.verification-mode {
  background: linear-gradient(175.68deg, #E4DEFF -15.77%, #FFFFFF 25.28%);
  position: relative;
  padding: 56px;

  .mode-bg {
    width: 302px;
    height: 148px;
    position: absolute;
    top: 29px;
    right: 47px;
    transform: rotate(-8.28deg);
  }

  .icon-CSMART-tongyong-guanbi {
    top: 56px;
    right: 56px;
    color: #86909C;
  }

  &_list {
    margin-top: 32px;
    display: flex;
    align-items: center;
    border: 1px solid #E4E8F3;
    border-radius: 8px;
    padding: 32px 20px;
    box-sizing: border-box;
    background: #F6F9FF;
    position: relative;
    cursor: pointer;
  }

  &_icon {
    width: 56px;
    height: 56px;
    margin-right: 24px;
  }

  &_title {
    font-size: 20px;
    color: var(--color-text-0);
    line-height: 24px;
  }

  &_desc {
    color: #86909C;
    margin-top: 8px;
    line-height: 24px;
  }
}
.button-wrap {
  display: flex;
  justify-content: center;
  margin-top: 38px;
  flex-direction: column;
  align-items: center;

  :deep(.arco-btn-size-medium) {
    width: 270px;
    height: 42px;
    line-height: 42px;
    border-radius: 6px;
  }
}

.exchange-type {
  color: #86909C;
  margin-top: 16px;
  cursor: pointer;
}

.verification-code {
  padding: 40px;
  background: linear-gradient(175.84deg, #FFDEE6 -7.65%, #FFFFFF 24.63%);
  position: relative;
  .code-bg1 {
    position: absolute;
    width: 152px;
    height: 163px;
    top: 0;
    left: 0;
  }

  .code-bg2 {
    position: absolute;
    width: 196px;
    height: 157px;
    right: 122px;
    top: -20px;
  }

  .icon-CSMART-tongyong-guanbi {
    top: 40px;
    right: 40px;
  }

  .form {
    margin-top: 40px;
    position: relative;

    :deep(.arco-form-item) {
      margin-bottom: 24px;
    }

    :deep(.arco-input) {
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset !important;
        -webkit-text-fill-color: var(--color-text-1) !important;
      }
    }
  }

  .button-wrap {
    margin-top: 16px;
  }
}
</style>

<style lang="scss">
.reset-password-modal {
  border-radius: 16px;
  .arco-modal-body {
    padding: 0;
    border-radius: 16px;
    overflow: hidden;
  }
}
</style>