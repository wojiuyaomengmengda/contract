import dayjs from 'dayjs'
import { useUserRoleStore } from '@/util/store/user-role'

/**
 * 获取权限
 * @param permissionId 权限id
 */
export function checkPermission(permissionId: number): boolean {
  const userRoleStore = useUserRoleStore()
  return !permissionId || userRoleStore.permissionIdList.includes(permissionId);
}


/**
 * 是否为生产环境
 */
export function isProdEnv () {
  // 业务侧打包配置会定义versionTypeCode变量
  return process.env.versionTypeCode === 'prod'
}

/**
 * 获取当前语言
 */
// 导出一个函数，用于获取当前语言
export function getCurrlocale () {
  // 从localStorage中获取语言，如果没有则返回默认语言'tc'
  return localStorage.getItem('language') || 'tc'
}

// 千分号规则
export function formatNumberToThousands(num: any): string {
  // 如果是非 string 或 number 类型，返回 "--"
  if (typeof num !== 'string' && typeof num !== 'number') {
    return '--';
  }

  // 如果是字符串类型，尝试将其转换为数字
  if (typeof num === 'string') {
    num = parseFloat(num);
    // 如果无法转为有效的数字，返回 "--"
    if (Number.isNaN(num)) {
      return '--';
    }
  }

  // 如果是数字类型，直接转换为千分位格式
  if (typeof num === 'number') {
    return num.toLocaleString();
  }

  // 默认返回 "--"（这行通常不会执行，因为前面的类型检查已经覆盖了所有情况）
  return '--';
}