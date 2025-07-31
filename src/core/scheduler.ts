// =====================
// SCHEDULER
// =====================

import type { Fiber } from './types'
import { getNextUnitOfWork, setNextUnitOfWork, getWipRoot } from './state'
import { commitRoot } from './commit'
import { updateFunctionComponent, updateHostComponent } from './reconciler'

function workLoop(deadline: IdleDeadline): void {
  let shouldYield = false
  while (getNextUnitOfWork() && !shouldYield) {
    const nextUnit = getNextUnitOfWork()
    if (nextUnit) {
      setNextUnitOfWork(performUnitOfWork(nextUnit))
    }
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!getNextUnitOfWork() && getWipRoot()) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber: Fiber): Fiber | null {
  if (typeof fiber.type === 'function') {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  if (fiber.child) return fiber.child
  
  let nextFiber: Fiber | null = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
  
  return null
}
