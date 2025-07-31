// =====================
// GLOBAL STATE
// =====================

import type { Fiber } from './types'

let nextUnitOfWork: Fiber | null = null
let currentRoot: Fiber | null = null
let wipRoot: Fiber | null = null
let deletions: Fiber[] = []
let wipFiber: Fiber | null = null
let hookIndex: number = 0

// Controlled access functions for nextUnitOfWork
export const getNextUnitOfWork = (): Fiber | null => nextUnitOfWork
export const setNextUnitOfWork = (fiber: Fiber | null): void => {
  nextUnitOfWork = fiber
}

// Controlled access functions for currentRoot
export const getCurrentRoot = (): Fiber | null => currentRoot
export const setCurrentRoot = (fiber: Fiber | null): void => {
  currentRoot = fiber
}

// Controlled access functions for wipRoot
export const getWipRoot = (): Fiber | null => wipRoot
export const setWipRoot = (fiber: Fiber | null): void => {
  wipRoot = fiber
}

// Controlled access functions for deletions
export const getDeletions = (): Fiber[] => deletions
export const setDeletions = (newDeletions: Fiber[]): void => {
  deletions = newDeletions
}
export const addDeletion = (fiber: Fiber): void => {
  deletions.push(fiber)
}

// Controlled access functions for wipFiber
export const getWipFiber = (): Fiber | null => wipFiber
export const setWipFiber = (fiber: Fiber | null): void => {
  wipFiber = fiber
}

// Controlled access functions for hookIndex
export const getHookIndex = (): number => hookIndex
export const setHookIndex = (index: number): void => {
  hookIndex = index
}
export const incrementHookIndex = (): void => {
  hookIndex++
}