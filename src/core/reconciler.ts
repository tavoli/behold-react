// =====================
// RECONCILIATION
// =====================

import type { Fiber, Element, ElementTypeFunction } from './types'
import { setWipFiber, setHookIndex, getWipFiber, addDeletion } from './state'
import { createDom } from './dom'

export function updateFunctionComponent(fiber: Fiber): void {
  setWipFiber(fiber)
  setHookIndex(0)
  const wipFiber = getWipFiber()
  if (wipFiber) {
    wipFiber.hooks = []
  }
  
  const functionComponent = fiber.type as ElementTypeFunction
  const children = [functionComponent(fiber.props)]
  reconcileChildren(fiber, children)
}

export function updateHostComponent(fiber: Fiber): void {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  reconcileChildren(fiber, fiber.props.children || [])
}

export function reconcileChildren(wipFiber: Fiber, elements: Element[]): void {
  let index = 0
  let oldFiber = wipFiber.alternate?.child
  let prevSibling: Fiber | null = null

  while (index < elements.length || oldFiber) {
    const element = elements[index]
    let newFiber: Fiber | null = null

    const sameType = oldFiber && element && element.type === oldFiber.type

    // am i rendering the same element that i rendered last time?
    if (sameType && oldFiber) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
        child: null,
        sibling: null,
      }
    }
    
    // i need to render a new element and i doesn't recognize it from previous render
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
        child: null,
        sibling: null,
      }
    }
    
    // i've rendered something at this position before but the new element wants to take its place
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION'
      addDeletion(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      wipFiber.child = newFiber
    } else if (element && prevSibling) {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}
