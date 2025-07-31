// =====================
// TYPES & INTERFACES
// =====================

export type Hook<T = any> = {
  state: T
  queue: Array<(prevState: T) => T>
}

export type ElementTypeFunction = (props: any) => Element
export type ElementType = string | ElementTypeFunction

export interface Props {
  children?: Element[]
  nodeValue?: string
  [key: string]: any
}

export interface Element {
  type: ElementType
  props: Props
}

export interface Fiber extends Element {
  alternate: Fiber | null
  dom: HTMLElement | Text | null
  parent: Fiber | null
  child: Fiber | null
  sibling: Fiber | null
  effectTag?: 'PLACEMENT' | 'UPDATE' | 'DELETION'
  hooks?: Hook[]
}