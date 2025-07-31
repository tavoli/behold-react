// =====================
// PUBLIC API
// =====================

import { createElement } from './element'
import { render } from './render'
import { useState } from './hooks'
import './scheduler' // Initialize the scheduler

export const Behold = {
  createElement,
  render,
  useState,
}
