<template>
    <div
        class="ai-assistant-list-item"
        :class="`ai-assistant-list-item--${isPositionLeft ? 'left' : 'right'}`">
        <div
            v-if="!isPositionLeft"
            class="ai-assistant-list-item__gap"></div>
        <div class="ai-assistant-list-item__text">
            <DotLoading v-if="props.showLoading"/>
            <span v-else>
                {{ record?.text || props.text }}
            </span>
        </div>
        <div v-if="isPositionLeft" class="ai-assistant-list-item__gap"></div>
    </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'
import DotLoading from '@/loading/dot-loading.vue';
import { FromType, ListItemProp } from './types';

const props = withDefaults(defineProps<ListItemProp>(), {})

const isPositionLeft = computed(() => props.position === 'left' || props.record?.fromType === FromType.AI);

const {record} = toRefs(props)

</script>
<style lang="scss">
.ai-assistant-list-item {
    width: 100%;
    height: auto;
    display: flex;

    & + .ai-assistant-list-item {
        margin: 12px 0;
    }

    &__gap {
        width: 40px;
    }

    &__text {
        flex: 1;
        border-radius: var(--border-radius-large);
        background-color: var(--color-fill-1);
        color: var(--color-black);
        white-space: pre-wrap;
        line-height: 24px;
        padding: 16px;
    }

    &--left {
        .ai-assistant-list-item__text {
            border-top-left-radius: var(--border-radius-small);
        }
    }

    &--right {
        .ai-assistant-list-item__text {
            border-top-right-radius: var(--border-radius-small);
            background-color: rgb(var(--primary-6));
            color: var(--color-white)
        }
    }

}
</style>