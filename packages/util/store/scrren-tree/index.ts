/* eslint-disable @typescript-eslint/ban-types */
import { defineStore } from 'pinia';
import permissionTool from '@/util/permission';
import Message from "@arco-design/web-vue/es/message";
import { ScreenTreeModel } from './types';
import { useOrgStore } from '../org';

export const createScreenTreeStore = (options: {
  state?: Record<string, Array<ScreenTreeModel>>;
  getters?: Record<string, Function>;
  actions?: Record<string, Function>;
} = {}) => defineStore({
	id: 'screenTree',
	state: (): Record<string, Array<ScreenTreeModel>> => ({ ...options.state }),
	getters: {
		value(state: Record<string, Array<ScreenTreeModel>>) {
			const orgStore = useOrgStore();
			return this.$state[orgStore.value.id];
		},
    ...options.getters
	},
	actions: {
		setValue(data: Array<ScreenTreeModel>): void {
			const orgStore = useOrgStore();

			// 大屏页面权限处理, 根据角色返回的权限id，作为查询源, 匹配大屏页面的权限id，进行重新组装大屏数据, 權限id為0時代表有權限
			const temp = data.filter((item: any) => {
        if (item.screenList.length) {
          item.screenList = item.screenList.filter((screen: any) => {
            return screen.permissionId === 0 || screen.permissionId == null ||  permissionTool.check([screen.permissionId])
          })
        }
        return item.permissionId === 0 || item.permissionId == null  ||  permissionTool.check([item.permissionId])
      })
			// 首先检查变量temp的长度。如果temp不为空，它会将temp的值赋给this.$state[orgStore.value.id]。
			// 如果temp为空，则显示一个错误消息“暂无权限！”，并在1秒后重定向用户到登录页面，然后抛出一个的异常。用於登錄頁阻斷
			console.error(temp)
			if (temp.length) {
				this.$state[orgStore.value.id] = temp;
			} else {
				Message.error({
					content: '暫無權限'
				});
				const timer = setTimeout(() => {
					window.location.replace(`../login/index.html`);
					clearTimeout(timer)
				}, 1000);
				// eslint-disable-next-line no-throw-literal
				throw "";
			}

		},
    ...options.actions
	},

	// 开启数据缓存
	persist: {
		enabled: true,
		strategies: [
			{
				storage: sessionStorage,
			},
		],
	},
});

export const useScreenTreeStore = createScreenTreeStore();