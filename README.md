# Behold React - A React Implementation Study

![React Architecture Diagram](./react-how-it-works-visually.png)

## Purpose

This project serves as both an igniter and fuel for my journey into understanding how React works internally. I've always been curious about React's internal mechanisms, and this provides the perfect motivation to dive deep into the library's engineering.

## Goals

- **Deep Understanding**: Showcase interest in the frontend ecosystem and demonstrate knowledge of how one of the most famous libraries works internally
- **Performance Understanding**: Become more skilled at frontend debugging and adding performance optimizations to components
- **Foundation for Future Learning**: Build a solid understanding of React as a stepping stone to explore other frameworks like Svelte, Vue, and SolidJS

## Key Functions Focused On

This implementation focuses on the core React concepts:

- **Virtual DOM**: Understanding how React creates and manages virtual representations of the DOM
- **Reconciliation**: How React compares (diffs) the virtual DOM trees to determine what changes need to be made
- **Fiber Architecture**: React's reconciliation algorithm that enables features like time-slicing and prioritization
- **Hooks**: State management and lifecycle methods in functional components
- **Scheduler**: How React prioritizes and schedules work

## Why These Libraries Exist

Understanding React's virtual DOM approach helps explain why alternatives like Svelte and SolidJS exist:

- **React**: Uses a virtual DOM which is very fast (as I've studied for several weeks), but still requires a reconciliation step to compare trees and decide what to change in the real DOM.

- **Svelte**: Takes a different approach that removes the need for a virtual DOM entirely. It "compiles" components into exactly the vanilla JavaScript as if we had coded the components ourselves. Svelte knows exactly what needs to change in the DOM, eliminating the reconciliation step.

- **SolidJS**: Also knows exactly what to change by subscribing state directly to DOM elements, avoiding the comparison overhead.

Both Svelte and SolidJS exist primarily for performance reasons - while React's virtual DOM is sufficient for the vast majority of projects, demanding applications might benefit from these more direct approaches.

## Important Disclaimer

⚠️ **This React implementation is NOT intended for production use.** It's a study project missing many critical performance enhancements that real React includes:

- **Selective Tree Walking**: In this implementation, we walk the entire tree during the render phase. React follows hints and heuristics to skip entire sub-trees where nothing changed.

- **Efficient Commit Phase**: We walk the whole tree in the commit phase. React maintains a linked list with only the fibers that have effects and visits only those fibers.

- **Fiber Recycling**: Every time we build a new work-in-progress tree, we create new objects for each fiber. React recycles fibers from previous trees for better memory efficiency.

- **Update Prioritization**: When this implementation receives a new update during the render phase, it throws away the work-in-progress tree and starts over from the root. React tags each update with an expiration timestamp and uses it to decide which update has higher priority.

- **Concurrent Features**: Missing time-slicing, Suspense, error boundaries, and many other production-ready features.

## Future Learning Path

This React foundation will enable deeper exploration of:
- Svelte's compile-time optimizations
- Vue's reactivity system
- SolidJS's fine-grained reactivity
- Performance optimization techniques across frameworks
- Framework-agnostic frontend architecture patterns

---

*This project represents a learning journey into the heart of modern frontend development, motivated by curiosity to understand the tools we use every day.*