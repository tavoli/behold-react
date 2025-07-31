// =====================
// HOOKS
// =====================

import type { Hook } from './types'
import { 
  getWipFiber, 
  getHookIndex, 
  incrementHookIndex, 
  getCurrentRoot, 
  setWipRoot, 
  setNextUnitOfWork, 
  setDeletions,
  getWipRoot 
} from './state'

export function useState<T>(initial: T): [T, (action: T | ((prev: T) => T)) => void] {
  const wipFiber = getWipFiber()
  const hookIndex = getHookIndex()
  const oldHook = wipFiber?.alternate?.hooks?.[hookIndex] as Hook<T> | undefined
  
  const hook: Hook<T> = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  }

  const actions = oldHook ? oldHook.queue : []
  actions.forEach((action: (prev: T) => T) => {
    hook.state = action(hook.state)
  })

  const setState = (action: T | ((prev: T) => T)): void => {
    const actionFn = typeof action === 'function' 
      ? action as (prev: T) => T
      : () => action
    
    hook.queue.push(actionFn)
    
    const currentRoot = getCurrentRoot()
    if (currentRoot) {
      setWipRoot({
        type: currentRoot.type,
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot,
        parent: null,
        child: null,
        sibling: null,
      })
      setNextUnitOfWork(getWipRoot())
      setDeletions([])
    }
  }

  wipFiber?.hooks?.push(hook)
  incrementHookIndex()
  
  return [hook.state, setState]
}