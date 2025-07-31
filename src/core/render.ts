// =====================
// RENDER FUNCTION
// =====================

import type { Element } from './types'
import { getCurrentRoot, setWipRoot, setDeletions, setNextUnitOfWork, getWipRoot } from './state'

export function render(element: Element, container: HTMLElement): void {
  setWipRoot({
    type: 'ROOT',
    dom: container,
    props: {
      children: [element],
    },
    alternate: getCurrentRoot(),
    parent: null,
    child: null,
    sibling: null,
  })
  setDeletions([])
  setNextUnitOfWork(getWipRoot())
}