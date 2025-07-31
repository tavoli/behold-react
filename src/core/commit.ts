// =====================
// COMMIT PHASE
// =====================

import type { Fiber } from './types'
import { getDeletions, getWipRoot, setCurrentRoot, setWipRoot } from './state'
import { updateDom } from './dom'

export function commitRoot(): void {
  getDeletions().forEach(commitWork)
  const wipRoot = getWipRoot()
  if (wipRoot?.child) {
    commitWork(wipRoot.child)
  }
  setCurrentRoot(wipRoot)
  setWipRoot(null)
}

export function commitWork(fiber: Fiber | null): void {
  if (!fiber) return

  let domParentFiber = fiber.parent
  while (domParentFiber && !domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  
  if (!domParentFiber?.dom) return
  const domParent = domParentFiber.dom as HTMLElement

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom && fiber.alternate) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent)
  }

  if (fiber.child) commitWork(fiber.child)
  if (fiber.sibling) commitWork(fiber.sibling)
}

export function commitDeletion(fiber: Fiber, domParent: HTMLElement): void {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else if (fiber.child) {
    commitDeletion(fiber.child, domParent)
  }
}