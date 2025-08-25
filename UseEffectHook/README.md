# useEffect React Hook

`useEffect` is a React Hook that lets you perform side effects in function components. Side effects include data fetching, subscriptions, manually changing the DOM, and more.

## What does `useEffect` do?

- Runs code after render (by default, after every render).
- Can clean up resources (e.g., remove event listeners, cancel timers).
- Replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.

## Basic Usage

```jsx
import React, { useEffect } from "react";

function Example() {
  useEffect(() => {
    // Code to run after render
    document.title = "Hello, useEffect!";
  });

  return <div>Hello World</div>;
}
```

## When to Use `useEffect`

- Fetching data from APIs.
- Subscribing to events (e.g., window resize).
- Setting up timers.
- Directly manipulating the DOM.
- Cleaning up resources when a component unmounts.

## Dependency Array

You can control when `useEffect` runs by passing a dependency array:

- `[]`: Runs only once after initial render.
- `[value]`: Runs when `value` changes.

```jsx
useEffect(() => {
  // Runs only when count changes
}, [count]);
```

## Cleanup Function

Return a function inside `useEffect` to clean up resources:

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    // Do something
  }, 1000);

  return () => clearTimeout(timer); // Cleanup
}, []);
```

## Common Bugs & How to Avoid Them

- **Missing dependencies:** Always include all variables used inside `useEffect` in the dependency array.
- **Infinite loops:** Avoid updating state inside `useEffect` without proper dependencies.
- **Stale closures:** Use dependencies to ensure latest values are used.
- **Memory leaks:** Always clean up subscriptions, timers, or event listeners.

## References

- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [Rules of Hooks](https://react.dev/reference/react/hooks#rules-of-hooks)
