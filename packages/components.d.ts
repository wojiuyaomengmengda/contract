import BIGrid from './layout/bi-grid/Grid.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BIGrid: typeof BIGrid
  }
}
