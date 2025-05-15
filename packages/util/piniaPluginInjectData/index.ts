import { PiniaPluginContext } from 'pinia';
import { useI18n } from '@/locale';

/**
 * 要为指定store 安装时做一些操作
 */
export const piniaPluginInjectData = (id: string) => {
	return ({ app, store, options }: PiniaPluginContext) => {
		const { $id, $state } = store;
    const { t } = useI18n();
		if ($id === id) {
			// 快速批量处理所有页面标题问题
			document.title = t('工程管理数字平台');
		}
	};
};
