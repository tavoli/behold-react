// =====================
// ELEMENT CREATION
// =====================

import type { Element, ElementType, Props } from './types'

export function createElement(
  type: ElementType,
  props: Props | null,
  ...children: (Element | string | number)[]
): Element {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  }
}

export function createTextElement(text: string | number): Element {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: String(text),
      children: [],
    },
  }
}