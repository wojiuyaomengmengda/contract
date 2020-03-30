import defaultSettings from '@/settings'

const title = defaultSettings.title || '电子合同管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
