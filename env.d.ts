/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}
// 添加类型声明
interface Window {
  __CUS_PROJECT_CONFIG__: {
    projectNameEnv: string
    [key: string]: any
  }
}
interface CustomEnvironment {
  /**
   * 顶级组织id
   */
  readonly RootOrgID: string
  /**
   * org  页面path
   */
  readonly RootOrgPath: string

  readonly RootHomePath: string
  readonly base: string
  readonly adminBaseUrl: string
  readonly PROJECT_NAME: string
  readonly TENANT_ID: string
  readonly CN_URL: string
}

declare namespace NodeJS {
  interface ProcessEnv extends CustomEnvironment {}
}
