<template>
    <div class="ai-assistant-panel">
        <div
            ref="scrollWrapRef"
            class="ai-assistant-panel-body bi-scrollbar--show-scrollbar">
            <ListItem
                position="left"
                :text="guidingWord"/>

            <ListItem v-for="(item, index) of dataList" :key="index" v-bind="item"></ListItem>
        </div>
        <div class="ai-assistant-panel-footer" :class="[isSending ? 'ai-assistant-panel-footer--disabled': '']">
            <div class="ai-assistant__input-wrap">
                <a-input
                    v-model="askContent"
                    class="ai-assistant__input"
                    type="text"
                    :placeholder="t('有什么问题尽管问我')"
                    @press-enter="() => doAsk()" />
                <img
                    class="ai-assistant__sent-btn"
                    :class="[isCanSend ? '': 'ai-assistant__sent-btn--disabled']"
                    :src="isCanSend ? sentBtn : sentBtnDisabled"
                    @click="() => doAsk()">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance, reactive, computed, nextTick } from 'vue';
import { askForShanShan } from '@/api/ai';
import { useI18n } from '@/locale';
import { v4 as uuidv4 } from 'uuid'
import { scrollToBottom } from '@/util/dom';
import ListItem from './ListItem.vue';
import { FromType, ListItemProp } from './types';
import sentBtnDisabled from '../../img/ai-assistant/sent-btn-disabled.png'
import sentBtn from '../../img/ai-assistant/sent-btn.png'

const { t } = useI18n();
const { proxy } = getCurrentInstance() as any;

const guidingWord = t('Hi!\n我是你的智能助手 闪闪助手，您当前模式为通用问答，有什么问题吗？');

const dataList = ref<ListItemProp []>([]);
const askContent = ref('');

// 添加用户提问
const addUserQuestion = (text: string, uuid = uuidv4()) => {
    const dataItem = reactive<ListItemProp>({
        record: {
            uuid,
            fromType: FromType.User,
            text
        }
    });
    dataList.value.push(dataItem);
    return dataItem;
}

// 添加AI回答
const addAIAnswer = (text: string = '', uuid = uuidv4()) => {
    const dataItem = reactive<ListItemProp>({
        record: {
            uuid,
            fromType: FromType.AI,
            text
        }
    })
    dataList.value.push(dataItem);
    return dataItem;
}

// 正在回答的AI项
const currAIAnswerItem = ref<ListItemProp | null>(null);

// 是否正在发送
const isSending = computed(() => {
    return !!currAIAnswerItem.value;
})

// 能否发送
const isCanSend = computed(() => {
    return !isSending.value && askContent.value !== '';
})

const isValid = () => {
    if (!askContent.value) {
        return t('问题不能为空!');
    }
    if (isSending.value) {
        return t('正在回答，请稍后重试!');
    }
    return true;
}

const scrollWrapRef = ref();

// 问 ai问题
const doAsk = async () => {
    const valid = isValid();
    if (valid !== true) {
        proxy.$message.warning(valid)
        return;
    }
    
    addUserQuestion(askContent.value);
    currAIAnswerItem.value = addAIAnswer();
    currAIAnswerItem.value.showLoading = true;  // 显示loading
    let answerText = '';
    try {
        const data = await askForShanShan(askContent.value);
        answerText = data.choices[0].message.content;
    } catch (e: any) {
        if (e.code === 'ECONNABORTED') {
            answerText = t('请求超时，请稍后再试');
        } else {
            answerText = t('网络异常，请稍后再试');
        }
    }

    if (currAIAnswerItem.value.record) {
        currAIAnswerItem.value.record.text = answerText;
    } else {
        currAIAnswerItem.value.text = answerText;
    }
    
    if (currAIAnswerItem.value) {
        currAIAnswerItem.value.showLoading = false; // 关闭loading
    }
    askContent.value = '';
    currAIAnswerItem.value = null;
    await nextTick();
    scrollToBottom(scrollWrapRef.value);
}


</script>
<style lang="scss">
$inputHeight: 50px;

.ai-assistant {
    &-panel {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        &-body {
            flex: 1;
            min-height: 0;
            overflow: auto;
        }

        &-footer {
            display: flex;
            justify-content: center;
            align-items: center;

            &--disabled {
                pointer-events: none;
            }
        }

        .arco-input-wrapper {
            border: none;
        }
    }

    &__sent-btn {
        width: 24px;
        height: 24px;
        cursor: pointer;

        &--disabled {
            cursor: unset;
            pointer-events: none;
        }
    }

    &__input-wrap {
        position: relative;
        flex: 1;
        min-width: 0;
        border-radius: 40px;
        border: 1px solid var(--color-border-2);
        height: 100%;
        padding: 0 48px 0 20px;
    }

    &__input.arco-input-wrapper .arco-input {
        font-size: 16px;
        height: $inputHeight;
        line-height: $inputHeight;
    }
    
    &__sent-btn {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>