<template>
  <div class="warning-detail">
    <a-spin v-if="loading" :loadin="loading" />
    <template v-else>
      <div class="warning-info">
        <div class="warning-info-desc">
          <div class="warning-info-item">
            <div class="warning-info_label">{{ t('处理时间') }}：</div>
            <div class="warning-info_value">{{ detail?.alertClearTime || '-' }}</div>
          </div>
          <div class="warning-info-item">
            <div class="warning-info_label">{{ t('处理人') }}：</div>
            <div class="warning-info_value">{{ detail?.approvalNodes?.find((item: any) => item.operatorRole === 'handler')
              ?.operatorName || '-' }}</div>
          </div>
          <div v-if="params.monitorCode !== 'tower-crane'" class="warning-info-item">
            <div class="warning-info_label">{{ t('当前定位') }}：</div>
            <div class="warning-info_value">{{ detail?.positionName || '-' }}</div>
          </div>
          <div class="warning-info-item">
            <div class="warning-info_label">{{ t('行动') }}：</div>
            <!-- <a-input v-model="detail?.actionContent|| '-'"></a-input> -->
            <div class="warning-info_value">{{ detail?.actionContent || '-' }}</div>
          </div>
          <div class="warning-info-item">
            <div class="warning-info_label">{{ t('备注') }}：</div>
            <div class="warning-info_value">{{ detail?.remark || '-' }}</div>
          </div>
        </div>
        <div class="warning-info-img">
          <a-image-preview-group infinite>
            <a-space>
              <a-image-preview-group 
                v-model:current="preCurrent"
                v-model:visible="preVisible"
                infinite
                >
                <a-space>
                  <a-image 
                    v-for="(item, index) in detail?.photoList" 
                    :key="index"
                    :src="item" 
                    width="138" 
                    height="78" 
                    fit="cover"
                  >
                    <template #extra>
                        <img src="../imgs/icons/view.png" alt="" @click="preVisible = true, preCurrent = index">
                    </template>
                  </a-image>
                </a-space>
              </a-image-preview-group>
              <div class="video-box">
                <video 
                  v-if="detail?.videoUrl"
                  :src="detail?.videoUrl"
                  style="width: 138px; height: 78px;"
                  
                />
                <div class="video-mask">
                  <img @click="playVideo" src="../imgs/icons/play.png" alt="">
                </div>
              </div>
            </a-space>
          </a-image-preview-group>
        </div>
      </div>
  
      <div class="warning-timeline" :class="locale">
        <a-timeline v-if="nodeList.length" direction="horizontal" mode="top">
          <a-timeline-item 
            v-for="(item, index) in nodeList" 
            :key="index" 
            :label="item.auditAt || '-'"
            :line-color="item.advice === 'A' || item.advice === 'R' || item.advice === 'F' ? '#007AFF' : '#C9CDD4'"
            :line-type="item.advice === 'A' || item.advice === 'R' || item.advice === 'F' ? 'solid' : 'dashed'"
          >
            <template #dot>
              <template v-if="item.nodeOrder === 1">
                <img 
                  v-if="item.advice === 'A' || item.advice === 'F'"
                  width="16"
                  height="16" 
                  :src="pandingActive" 
                  alt=""
                >
                <img 
                  v-else 
                  width="16"
                  height="16"
                  :src="panding" 
                  alt="">
              </template>
              <template v-if="item.nodeOrder === 2 || item.nodeOrder === 5">
                <img 
                  v-if="item.advice === 'A' || item.advice === 'F'" 
                  :src="chuliActive" 
                  alt=""
                  width="16"
                  height="16"
                >
                <img 
                  v-else 
                  width="16"
                  height="16"
                  :src="chuli" 
                  alt="">
              </template>
              <template v-if="item.nodeOrder === 3">
                <img 
                  v-if="item.advice === 'A' || item.advice === 'F'" 
                  :src="shenheActive" 
                  alt=""
                  width="16"
                  height="16"
                >
                <img 
                  v-else 
                  :src="shenhe" 
                  width="16"
                  height="16"
                  alt="">
              </template>
              <template v-if="item.nodeOrder === 4">
                <img
                  :src="returnImgActive" 
                  alt=""
                  width="16"
                  height="16"
                >
              </template>
              <template v-if="item.nodeOrder === 0">
                <img 
                  v-if="item.advice === 'A' || item.advice === 'F'" 
                  :src="checkActive" 
                  alt=""
                  width="16"
                  height="16"
                  fit="cover"
                >
                <img 
                  v-else 
                  width="16"
                  height="16"
                  :src="check" 
                  alt="">
              </template>
              <div class="custom-dot-text">{{ NodeName[item.nodeOrder] }}</div>
            </template>
            <a-tooltip v-if="item.nodeOrder !== 0" background-color="#49596b">
              <template #content>
                <div
                  v-for="(items, index2) in item.optionConnect"
                  :key="index2"
                  style="color:#fff;margin-bottom: 5px;">{{
                  items.operatorName + ' : ' + t('电话') +
                  items.operatorPhone + ' / ' +  t('邮箱')  + items.operatorEmail }}</div>
              </template>
              <div class="node-name">
                {{ item.operatorName ? item.operatorName : '-' }}
              </div>
            </a-tooltip>
            <div v-else class="node-name">
              {{ item.operatorName ? item.operatorName : '-' }}
            </div>
          </a-timeline-item>
          
        </a-timeline>
      </div>
    </template>
  </div>

  <a-modal 
    v-model:visible="visible"
    width="1284px"
    title-align="start"
    popup-container="#app"
    :style="{zIndex: 9999}"
    :title="t('警报视频')"
    :footer="false"
  >
    <div class="video-wrap">
      <video 
        :src="detail?.videoUrl"
        controls
        style="height: 500px;"
      />
    </div>

  </a-modal>
</template>
  
<script setup lang='ts'>
import { ref, watchEffect } from 'vue'
import earlyWarningApi from '@/api/early-warning'
import { useI18n } from '@/locale'
import { getCurrlocale } from '@/util/common'
import panding from '../imgs/icons/panding.svg'
import pandingActive from '../imgs/icons/panding-active.svg'
import chuli from '../imgs/icons/chuli.svg'
import chuliActive from '../imgs/icons/chuli-active.svg'
import shenhe from '../imgs/icons/shenhe.svg'
import shenheActive from '../imgs/icons/shenhe-active.svg'
import check from '../imgs/icons/check.svg'
import checkActive from '../imgs/icons/check-active.svg'
import returnImg from '../imgs/icons/return.svg'
import returnImgActive from '../imgs/icons/return-active.svg'

const locale = getCurrlocale()
const { t } = useI18n()
const props = withDefaults(defineProps<{
  params: any
}>(), {
  params: () => ({})
})
const NodeName: {[key: number]: string} = {
  0: t('完成'),
  1: t('判定'),
  2: t('处理'),
  3: t('审核'),
  4: t('驳回'),
  5: t('处理'),
}

const nodeList = ref<any[]>([])
const loading = ref(false)
const detail = ref<any>()

const preVisible = ref(false)
const preCurrent = ref(0)

const formatNodeList = (approvalNodes: any[]) => {
  nodeList.value = []
  if (!approvalNodes || !approvalNodes.length) { return [] }
  
  // 处理审核的节点
  const auditorNodeList = JSON.parse(JSON.stringify(approvalNodes.filter((item: any) => item.nodeOrder === 3)));
  let hasAuditorNode: any

  // 1、如果都未审核则合并为一条记录, 名称并排显示
  // 2、如果有一条进行了审核则只保留审核的那一条记录
  if (auditorNodeList.length) {
    hasAuditorNode = auditorNodeList.find((item: any) => item.advice === 'A')
    if (!hasAuditorNode) {
      // 合并后的人员名称
      let operatorName: string = ''
      // 合并后的联系方式
      const optionConnect: any = []

      hasAuditorNode = auditorNodeList[0]
      auditorNodeList.forEach((item: any) => {
        operatorName += `${item.operatorName ? item.operatorName : ''  },`
        optionConnect.push({
          operatorName: item.operatorName,
          operatorPhone: item.operatorPhone ? item.operatorPhone : '-',
          operatorEmail: item.operatorEmail ? item.operatorEmail : '-',
        })
      })

      hasAuditorNode.operatorName = operatorName
      hasAuditorNode.optionConnect = optionConnect
    } else {
      // 联系方式
      hasAuditorNode.optionConnect = [{
        operatorName: hasAuditorNode.operatorName,
        operatorPhone: hasAuditorNode.operatorPhone ? hasAuditorNode.operatorPhone : '-',
        operatorEmail: hasAuditorNode.operatorEmail ? hasAuditorNode.operatorEmail : '-',
      }]
    }

  }
  // 添加非审核节点
  approvalNodes.forEach((item: any) => {
    if (item.nodeOrder !== 3) {
      nodeList.value.push({
        ...item,
        // 联系方式
        optionConnect: [{
          operatorName: item.operatorName,
          operatorPhone: item.operatorPhone ? item.operatorPhone : '-',
          operatorEmail: item.operatorEmail ? item.operatorEmail : '-',
        }]
      })
    }
  });
  // 添加审核节点
  if (hasAuditorNode) {
    nodeList.value.push(hasAuditorNode)
    // 添加完成节点
    nodeList.value.push({
      ...hasAuditorNode,
      optionConnect: [],
      nodeOrder: 0,
      operatorName: t('系统'),
      auditAt: hasAuditorNode.advice === 'W' ? ' ' : hasAuditorNode.auditAt
    })
  }
}
watchEffect(async () => {
  if (props.params?.recordId) {
    try {
      loading.value = true
      detail.value = await earlyWarningApi.getAlarmDetail(props.params)
      formatNodeList(detail.value?.approvalNodes)
    } finally {
      loading.value = false
    }
  }
})

const visible = ref(false)
const playVideo = () => {
  console.log(visible)
  visible.value = true
}
</script>
  
<style lang="scss" scoped>
.warning-detail {
  padding: 10px 4px;

  :deep(.arco-spin) {
    height: 90px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.warning-info {
  display: flex;
  align-items: flex-start;

  &-desc {
    min-width: 400px;
    margin-right: 10px;
  }

  &_label {
    color: var(--color-text-2);
  }

  &_value {
    color: var(--color-text-0);
  }

  &-item {
    display: flex;
    line-height: 24px;
    font-size: 16px;
    
  }

  &-img {

    :deep(.arco-space-item) {
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 16px !important;
      }
    }

    :deep(.arco-image-footer) {
      height: 100%;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%);
      display: flex;
      align-items: center;
      justify-content: center;

      .arco-image-footer-extra {
        padding-left: 0;
      }
    }
  }
  
  .video-box {
    position: relative;
    .video-mask {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.warning-timeline {
  margin-top: 16px;

  :deep(.arco-timeline-item-dot-custom) {
    border-radius: 2px;
    border: 1px solid #007AFF;
    background: #E6F6FF; 
    display: flex;
    padding: 0 8px;
    height: 22px;
    line-height: 22px;
    align-items: center;
    transform: translate(-10%, -50%);
    width: 70px;
    .custom-dot-text {
      color: var(--color-text-0);
      font-size: 14px;
      margin-left: 4px;
    }
  }

  &.en {
    :deep(.arco-timeline-item-dot-custom) {
      width: 110px;
    }
  }
}
.node-name {
  color: #86909C;
  font-size: 12px;
  display: inline-block;
}

.video-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 670px;
}
</style>