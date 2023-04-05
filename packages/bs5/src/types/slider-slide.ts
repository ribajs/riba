export interface Bs5SliderSlide<T = any> {
  active: boolean
  index: number
  el?: HTMLElement
  style?: string
  /** Additional data */
  data?: T
}
