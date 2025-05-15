/* eslint-disable @typescript-eslint/ban-types */
import { defineStore, type Pinia } from 'pinia';
import { OrgModel } from '@/util/store/org/types';
import api from '@/api/base';
import { merge } from 'lodash-es';
import logoImg from '@/layout/bi-grid/img/header/logo.png'
import { checkImageAccess } from '@/util/common/image';
import { isMarketization } from '@/util/common/projectType';

const defaultLogoInfo: Record<string, string> = {
  '20230012.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2025-02-08/17389987076990.png', // 钻达公司 - 正式
  'hleoak.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-12-09/17337106912950.png', // 橡樹街地盘 - 正式
  'j370.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-12-09/17337106912950.png', // 山道地盘 - 正式
  'kudos.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-10-21/17295000980670.png', // 恒暉建築 - 正式
  'mte.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-09-12/17261109582200.png', // 美東邨 - 正式
  'nfcy-il7912.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-12-26/17351968616770.png', // 南豐 - 正式
  'tc119.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-09-12/17261109582200.png', // 东涌119 - 正式
  'tysan.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-09-26/17273390791660.png', // 泰昇地基 - 正式
  'tysanltc42.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-09-26/17273390791660.png', // 泰昇地基(東涌42) - 正式
  'wcfe.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2024-09-12/17261109582200.png', // 长沙湾 - 正式
  'wingfat.c-smart.hk': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2025-02-08/17390011619030.png', // 榮發 - 正式
  'localhost': 'https://sunley-oss.oss-accelerate.aliyuncs.com/service/logo/2025-02-08/17390011619030.png', // 榮發 - 正式
}

interface OrgState {
  tree: Array<OrgModel>;
	preCurrent: {
		preCurrentId: null | number;
		prePath: string;
		pathType: number | null;
		secondLevelPath?: string;
		path?: string;
	};
	current: OrgModel;
}

export const createOrgStore = (options: {
  state?: Partial<OrgState>
  actions?: Record<string, Function>
  getters?: Record<string, Function>
} = {}) => {
  return defineStore({
    id: 'smartOrg',
    state: (): OrgState => ({
      tree: [],
      preCurrent: {
        preCurrentId: null,
        pathType: null,
        prePath: '',
        secondLevelPath: '',
        path: '',
      },
      current: {
        id: 0,
        type: 1,
        name: '',
        level: 1,
        parentId: 0,
        enabled: true,
        homeLogo: ''
      },
      ...options.state,
    }),
    getters: {
      value(state: OrgState): OrgModel {
        return { ...state.current };
      },
      listTree(state: OrgState): Array<OrgModel> {
        return state.tree;
      },
      ...options.getters
    },
    actions: {
      async init(val?: any, isLogin = false) {
        const resultData = await api.listTree({
          typeList: [1, 2],
          enabled: true,
          language: val || 'tc',
        });
        if (resultData && Object.keys(resultData).length > 0) {
          this.setList(resultData);
          this.setValue(resultData[0], isLogin);
        } else {
          throw new Error('获取组织架构失败');
        }
      },
      async setValue (data: OrgModel, emptyId = false) {
        this.current = data
        
        if (isMarketization()) {
          // 市场化会有多个域名, 需要通过域名获取logo
          // 市场化-sass, 获取地盘logo, 通过域名获取, 域名获取失败时设置为默认logo
          this.getLogoById()
        } else {
          this.getLogo(emptyId ? undefined : this.current.id)
        }
      },
      setList(list: Array<OrgModel>) {
        this.tree = list;
      },
      // 地盘logo单独获取
      async getLogo(orgId?: number) {
        try {
          const res = await api.getLogo({
            orgId: orgId ?? undefined,
          });
          const logoAccess = await checkImageAccess(res.homeLogo);
          // 图片地址不可访问时设置为默认logo
          this.current.homeLogo = logoAccess ? res.homeLogo : logoImg;
        } catch (e) {
          this.current.homeLogo = logoImg;
        }
      },
      async getLogoById() {
        try {
          let hostName = window.location.host;
          const defaultLogo = defaultLogoInfo[window.location.hostname];
          // 如果是开发环境, 则直接获取生产环境 logo
          if (window.location.hostname.includes('localhost')) {
            hostName = 'wingfat.c-smart.hk';
          }
          const res = await api.getLogoById(hostName);
          const logoAccess = await checkImageAccess(res.logoUrl);
          // 图片地址不可访问时设置为默认logo
          if (logoAccess) {
            this.current.homeLogo = res.logoUrl;
          } else {
            this.current.homeLogo = defaultLogo || logoImg;
          }
        } catch (error) {
          console.log('调用getLogoById失败', error);
          
          this.current.homeLogo = logoImg;
        }
      },
      ...options.actions,
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
}

export const useOrgStore = createOrgStore();

// export const useOrgStore = defineStore({
//   id: 'smartOrg',
//   state: (): OrgState => ({
//     tree: [],
//     current: {
//       id: 0,
//       type: 1,
//       name: '',
//       level: 1,
//       parentId: 0,
//       enabled: true,
//     },
//   }),
//   getters: {
//     value(state: OrgState): OrgModel {
//       return { ...state.current };
//     },
//     listTree(state: OrgState): Array<OrgModel> {
//       return state.tree;
//     },
//   },
//   actions: {
//     async init(val?: any, emptyId = false) {
//       const resultData = await api.listTree({
//         typeList: [1, 2],
//         enabled: true,
//         language: val || 'tc'
//       });
//       if (resultData && Object.keys(resultData).length > 0) {
//         this.setList(resultData);
//         this.setValue(resultData[0], emptyId);
//       } else {
//         throw new Error('获取组织架构失败');
//       }
//     },
//     async setValue (data: OrgModel, emptyId = false) {
//       this.current = data
//       this.getLogo(emptyId ? undefined : this.current.id)
//     },
//     setList(list: Array<OrgModel>) {
//       this.tree = list;
//     },
//     // 地盘logo单独获取
//     async getLogo(orgId?: number) {
//       try {
//         const res = await api.getLogo({
//           orgId
//         })

//         const imgAccess = await checkImageAccess(res.homeLogo)
//         // 图片地址不可访问时设置为默认logo
//         this.current.homeLogo = imgAccess ? res.homeLogo : logoImg
//       } catch (e) {
//         this.current.homeLogo = logoImg
//       }
//     }
//   },
//   // 开启数据缓存
//   persist: {
//     enabled: true,
//     strategies: [
//       {
//         storage: sessionStorage,
//       },
//     ],
//   },
// });
