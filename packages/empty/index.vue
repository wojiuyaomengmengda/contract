<template>
	<div class="flex items-center justify-center w-full h-full">
		<a-empty v-bind="props.emptyOptions" :description="props.description || t('暂无数据')" >
      <template #image>
        <NoDataIcon />
      </template>
    </a-empty>
	</div>
</template>
<script lang="ts" setup>
import {Empty} from '@arco-design/web-vue';
import { useI18n } from '@/locale'
import NoDataIcon from './NoDataIcon.vue';

const { t } = useI18n()
const props = defineProps<{
	description?: string;
	emptyOptions?: Omit<InstanceType<typeof Empty>['$props'], 'description'>;
}>();
</script>
<style scoped lang="scss">
.flex {
	display: flex;
}

.items-center {
	align-items: center;
}
:deep(.arco-empty-image){
  display: flex;
  justify-content: center;
  align-items: center;
}
.w-full {
	width: 100%;
}

.h-full {
	height: 100%;
}

.justify-center {
	justify-content: center;
}
</style>
