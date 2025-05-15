import { reactive, provide, inject, toRefs, ToRefs, Ref, isReactive, isRef, markRaw } from 'vue'
import { key } from './key'
import { GridOptions, gridComponents, GridMethods } from '../types/grid'

type GridContext = GridOptions & { gridComponents: gridComponents } & {
  methods: GridMethods
}

/**
 *  Grid组件上下文  方法在methods调用
 * @returns GridContext
 */
export const useGridContext = () => {
  return (inject(key) as Partial<GridContext>) || {}
}
/**
 * 第一层响应式，reactive转为原始ref合并，如果ref直接合并 第二层对象为普通对象合并引用值无需代理
 * @param obj1
 * @param obj2
 */
const mergeObj = <T extends object, R extends object>(obj1: T, obj2: Array<R> | R) => {
  const values = Array.isArray(obj2) ? obj2 : [obj2]

  for (let index = 0; index < values.length; index++) {
    const element = values[index]
    if (isReactive(element)) {
      Object.assign(obj1, toRefs(element))
    } else {
      const keys = Object.keys(element)
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        if (isRef((element as any)[key])) {
          Object.assign(obj1, { [key]: (element as any)[key] })
        } else {
          if ((element as any)[key] !== undefined) {
            Object.assign(obj1, { [key]: markRaw((element as any)[key]) })
          }
        }
      }
    }
  }
}
export const addGridContext = <T extends object = Partial<GridContext>>(obj: Array<T> | T) => {
  const gridContext = inject(key)

  if (gridContext) {
    mergeObj(gridContext, obj)
  } else {
    const newContext = reactive<Partial<GridContext>>({})
    mergeObj(newContext, obj)

    provide(key, newContext)
  }
}
