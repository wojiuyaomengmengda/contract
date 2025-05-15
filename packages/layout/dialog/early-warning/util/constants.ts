export const EARLY_WARNING_STATUS = [
  {
    label: '待处理',
    value: 0,
    color: 'rgb(var(--red-6))'
  },
  {
    label: '已处理',
    value: 1,
    color: 'var(--color-text-4)'
  },
  {
    label: '误警',
    value: 2,
    color: 'rgb(var(--red-6))'
  },
  {
    label: '处理中',
    value: 3,
    color: 'rgb(var(--primary-6))'
  }
]

export const ALARM_LEVEL = [
  {
    value: 1,
    label: '通知',
  },
  {
    value: 10,
    label: '一级警报',
  },
  {
    value: 20,
    label: '二级警报',
  },
]
export const ALARM_STATUS_DESC = [
  {
    value: 1,
    label: '水浸警报',
  },
  {
    value: 2,
    label: '低电量警报',
  },

]
export const LOCK_DEVICE_TYPE = {
  1: '智能蓝牙锁',
  2: '普通蓝牙锁',
  3: '4S智能锁'
}