import { useOrgStore } from '@/util/store/org'
import { useTokenStore } from '@/util/store/oauth'
import { Notification } from '@arco-design/web-vue'
import { IconClose } from '@arco-design/web-vue/es/icon'
import { h, withModifiers } from 'vue'
import dayjs from 'dayjs'
import dangerImage from '@/assets/images/danger.png'
import dangerIconImage from '@/assets/images/danger-icon.png'
import { Session } from '@/util/storage'
import useWebSocket from './websocket'

type ResultData = {
  teamName: string
  heartRateAlarmStatus: number
  workTypeName: string
  onlineStatus: number
  companyName: string
  battery: string
  bindingTime: number
  orgId: number
  updateId: number
  heartRateCollectTime: number
  lastConnectionTime: number
  temperature: string
  id: string
  activationTime: number
  longitudeLatitude: string
  temperatureAlarmStatus: number
  bloodPressureAlarmStatus: number
  employeeName: string
  workTypeId: number
  address: string
  updateDatetime: string
  shrink: string
  photo: string
  employeeId: string
  createDatetime: string
  bloodPressureCollectTime: number
  stepCollectTime: number
  companyId: number
  alarmType: string
  diastolic: string
  heartRate: string
  phone: string
  bindingStatus: number
  temperatureCollectTime: number
  createId: number
  teamId: number
  deviceModel: string
  step: string
  longitudeLatitudeTime: number
}

type Msg = {
  data: ResultData
  action: string
}

export default function useHealthAlarm() {
  const orgStore = useOrgStore()
  const openWarining = (data: ResultData) => {
    const id = `${Date.now()}`
    Notification.info({
      id,
      class: 'custom-alarm-notification',
      duration: 0,
      position: 'bottomRight',
      title: () => {
        return h('div', { class: 'custom-alarm-notification-header' }, [
          h('div', { class: 'danger-icon' }, h('img', { src: dangerIconImage })),
          h(
            'div',
            { class: 'title' },
            `${['', '脱落', '关机', 'SOS', '体温', '血压', '心率'][data.alarmType] || ''} 监测报警`
          )
        ])
      },
      content: () => {
        return h('div', { class: 'custom-alarm-notification-content' }, [
          h('div', { class: 'personal-info' }, [
            h('div', { class: 'personal-info-left' }, [
              h('div', { class: 'info' }, [
                h('img', {
                  class: 'avatar',
                  src:
                    data.photo ||
                    'https://tushen.oss-cn-hangzhou.aliyuncs.com/service/2024-04-22/17137769405810.png'
                }),
                h('div', { class: 'name' }, data.employeeName)
              ]),
              h(
                'div',
                { class: 'post-info' },
                [data.companyName, data.teamName, data.workTypeName].filter(Boolean).join('-')
              )
            ]),
            h(
              'div',
              { class: 'personal-info-right' },
              h('img', {
                src: dangerImage
              })
            )
          ]),
          h('div', { class: 'info-list' }, [
            h('div', { class: 'info-list_item' }, [
              h('div', { class: 'info-list_item_label' }, '联系方式：'),
              h('div', { class: 'info-list_item_value' }, data.phone || '-')
            ]),
            h('div', { class: 'info-list_item' }, [
              h('div', { class: 'info-list_item_label' }, '报警时间：'),
              h('div', { class: 'info-list_item_value' }, dayjs().format('YYYY-MM-DD HH:mm:ss'))
            ]),
            h('div', { class: 'info-list_item' }, [
              h('div', { class: 'info-list_item_label' }, '最后定位：'),
              h(
                'div',
                { class: 'info-list_item_value' },
                dayjs(data.lastConnectionTime).format('YYYY-MM-DD HH:mm:ss')
              )
            ]),
            h('div', { class: 'info-list_item' }, [
              h('div', { class: 'info-list_item_label' }, '定位地址：'),
              h('div', { class: 'info-list_item_value' }, data.address || '-')
            ])
          ]),
          h('div', { class: 'health-list' }, [
            h('div', { class: 'health-list_item' }, [
              h(
                'div',
                {
                  class: 'health-list_item_value',
                  style: {
                    color: data.alarmType === '4' ? '#FF0500' : '#000000'
                  }
                },
                [`${data.temperature || '-'}`, h('span', { class: 'unit' }, '℃')]
              ),
              h('div', { class: 'health-list_item_label' }, '体温')
            ]),
            h('div', { class: 'health-list_item' }, [
              h(
                'div',
                {
                  class: 'health-list_item_value',
                  style: {
                    color: data.alarmType === '6' ? '#FF0500' : '#000000'
                  }
                },
                [`${data.heartRate || '-'}`, h('span', { class: 'unit' }, '次/分')]
              ),
              h('div', { class: 'health-list_item_label' }, '心率')
            ]),
            h('div', { class: 'health-list_item' }, [
              h(
                'div',
                {
                  class: 'health-list_item_value',
                  style: {
                    color: data.alarmType === '5' ? '#FF0500' : '#000000'
                  }
                },
                [
                  `${data.diastolic || '-'}/${data.shrink || '-'}`,
                  h('span', { class: 'unit' }, 'mmHg')
                ]
              ),
              h('div', { class: 'health-list_item_label' }, '血压(舒张/收缩压)')
            ])
          ])
        ])
      },
      closable: true,
      closeIconElement: () => {
        return h(IconClose, {
          style: { fontSize: 16, color: '#d24432' },
          onClick: withModifiers(() => {
            Notification.remove(id)
          }, [])
        })
      }
    })
  }

  const websocketCb = (data: string) => {
    try {
      const msg = JSON.parse(data) as Msg
      // 体征监测
      if (msg.action.startsWith('bracelet') && msg.action.indexOf('1') !== -1) {
        openWarining(msg.data)
      }
    } catch (err) {
      console.log('体征提醒失败', err)
    }
  }

  let baseUrl = 'wss://test-message.c-smart.cn'
  try {
    const loginConfig = Session.get('smartLoginConfig')
    baseUrl =
      loginConfig.id === '4.c-smart.cn'
        ? 'wss://message.c-smart.cn'
        : 'wss://test-message.c-smart.cn'
  } catch (error) {
    console.log('获取登录信息失败', error)
  }
  useWebSocket(`${baseUrl}/socket/${orgStore.current.id}/${useTokenStore().access_token}`, {
    onmessageCb: websocketCb
  })
}
