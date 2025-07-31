// =====================
// DOM OPERATIONS
// =====================

import type { Fiber, Props } from './types'

export function createDom(fiber: Fiber): HTMLElement | Text {
  const dom = fiber.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type as string)

  updateDom(dom as HTMLElement | Text, {}, fiber.props)
  return dom
}

const isEvent = (key: string): boolean => key.startsWith('on')
const isProperty = (key: string): boolean => key !== 'children' && !isEvent(key)
const isNew = (prev: Props, next: Props) => (key: string): boolean => prev[key] !== next[key]
const isGone = (_prev: Props, next: Props) => (key: string): boolean => !(key in next)

export function updateDom(dom: HTMLElement | Text, prevProps: Props, nextProps: Props): void {
  // Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      ;(dom as HTMLElement).removeEventListener(eventType, prevProps[name])
    })

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      ;(dom as any)[name] = ''
    })

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      ;(dom as any)[name] = nextProps[name]
    })

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      ;(dom as HTMLElement).addEventListener(eventType, nextProps[name])
    })
}