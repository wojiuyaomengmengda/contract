export const alarmLevelTag = (level: number) => {
  switch (level) {
    case 1:
      return 3
    case 20:
      return 2
    case 0:
    case 10:
      return 1
    default:
      return ''
  }
}