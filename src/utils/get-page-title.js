import defaultSettings from '@/settings'

const title = defaultSettings.title || '济工网'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
