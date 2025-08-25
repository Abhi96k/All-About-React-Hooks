# 📝 `useCallback` — Developer Notes & Complete Guide

A comprehensive developer-oriented guide for React's `useCallback` hook — when to use it, when not to, and why.

---

## 🔹 What is `useCallback`?

- A React Hook that **memoizes a function reference**.
- Prevents function recreation **until dependencies change**.
- Returns the same function reference across renders if dependencies haven't changed.

👉 **Syntax:**

```jsx
const memoizedFn = useCallback(() => {
  // function body
}, [dependencies]);
```

---

## 🔹 Why do we need it?

In JavaScript, **functions are objects**.
On every render, new functions are created → new memory reference.

```jsx
// Without useCallback - New function on every render
function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ❌ New function every render
    console.log("Clicked!");
  };

  return <ChildComponent onClick={handleClick} />;
}
```

⚡ **This matters when:**

1. Passing functions to **memoized children** (`React.memo`).
2. Using functions inside **dependency arrays** (`useEffect`, `useMemo`).
3. Avoiding **unnecessary re-renders** in performance-critical apps.

---

## 🔹 When to use `useCallback`

✅ **Use `useCallback` when function identity matters.**

### 1. **Passing callbacks to memoized children**

```jsx
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered"); // This will log unnecessarily without useCallback
  return <button onClick={onClick}>Click Child</button>;
});

function App() {
  const [count, setCount] = useState(0);

  // ✅ Memoized function - Child won't re-render unnecessarily
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Parent {count}</button>
      <Child onClick={handleClick} />
    </>
  );
}
```

👉 **Without `useCallback`:** Child re-renders every time parent state changes.
👉 **With `useCallback`:** Child only renders when its own props actually change.

### 2. **Stable functions in dependency arrays**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ Stable function reference
  const fetchUser = useCallback(async () => {
    const response = await fetch(`/api/user/${userId}`);
    const userData = await response.json();
    setUser(userData);
  }, [userId]); // Only recreates when userId changes

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Safe - won't cause infinite loops

  return <div>{user?.name}</div>;
}
```

### 3. **Event handlers with dependencies**

```jsx
function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  // ✅ Only recreates when query or filters change
  const handleSearch = useCallback(() => {
    onSearch(query, filters);
  }, [query, filters, onSearch]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
```

### 4. **Performance optimization in large lists**

```jsx
function TodoList({ todos }) {
  const [filter, setFilter] = useState("all");

  // ✅ Prevents all TodoItem components from re-rendering
  const handleToggle = useCallback((id) => {
    // Toggle todo logic
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </div>
  );
}

const TodoItem = React.memo(({ todo, onToggle }) => {
  return <div onClick={() => onToggle(todo.id)}>{todo.text}</div>;
});
```

---

## 🔹 When NOT to use `useCallback`

❌ **Don't use it for every function** — it adds overhead.

- React still has to **store the memoized function** and compare dependencies.
- For simple components, it makes code more complex with no real benefit.

### ❌ Don't use if the function is:

1. **Used only locally (not passed as props)**

```jsx
function App() {
  const [count, setCount] = useState(0);

  // ❌ Unnecessary - function isn't passed anywhere
  const increment = useCallback(() => setCount((c) => c + 1), []);

  return <button onClick={increment}>Count: {count}</button>;
}

// ✅ Better - simple and direct
function App() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

2. **Inline event handlers in simple components**

```jsx
// ❌ Overkill for simple cases
const handleClick = useCallback(() => {
  alert("Hello!");
}, []);

// ✅ Better for simple cases
<button onClick={() => alert("Hello!")}>Click me</button>;
```

3. **Functions that are cheap to recreate**

```jsx
// ❌ Unnecessary complexity
const simpleLog = useCallback(() => console.log("hello"), []);

// ✅ Just use regular function
const simpleLog = () => console.log("hello");
```

---

## 🔹 Rules of Thumb

### ✅ **Use `useCallback` when:**

- Passing functions to `React.memo` children
- Function is in a dependency array (`useEffect`, `useMemo`)
- You have **performance issues** due to unnecessary re-renders
- Working with large lists or complex component trees
- Function depends on props/state but shouldn't change often

### ❌ **Skip `useCallback` when:**

- Small apps where performance isn't critical
- Inline event handlers in simple components
- Function isn't passed as prop or dependency
- Function is only used within the component scope
- You haven't identified actual performance issues

---

## 🔹 Real-World Examples

### Example 1: Search Component (From Project)

```jsx
import { useCallback, useState } from "react";
import { user as allUsers } from "./user.constant";
import Search from "./Search";
import { shuffle } from "./utils";

function App() {
  const [users, setUsers] = useState(allUsers);

  // ✅ useCallback prevents Search component from re-rendering
  // when parent state changes (e.g., when shuffle button is clicked)
  const handleSearch = useCallback((text: string) => {
    console.log(users[0]);
    const filteredUsers = allUsers.filter((user) => user.includes(text));
    setUsers(filteredUsers);
  }, []); // Empty deps - function never changes

  return (
    <div className="tutorial">
      <div className="align-center mb-2 flex">
        <button onClick={() => setUsers(shuffle(allUsers))}>Shuffle</button>
        <Search onChange={handleSearch} />
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Key Points:**

- `Search` component is wrapped with `React.memo`
- Without `useCallback`, clicking "Shuffle" would re-render `Search` unnecessarily
- With `useCallback`, `Search` only re-renders when needed

### Example 2: API Data Fetching

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]); // Only recreate when userId changes

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // Stable reference prevents infinite loops

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## 🔹 Difference vs `useMemo`

| Hook          | Returns               | Use Case                     | Example                                      |
| ------------- | --------------------- | ---------------------------- | -------------------------------------------- |
| `useMemo`     | **Memoized value**    | Cache expensive computations | `useMemo(() => expensiveCalc(data), [data])` |
| `useCallback` | **Memoized function** | Cache function references    | `useCallback(() => handleClick(), [deps])`   |

```jsx
function App({ items }) {
  // useMemo - memoizes the result of computation
  const expensiveValue = useMemo(() => {
    return items.filter((item) => item.active).map((item) => item.value);
  }, [items]);

  // useCallback - memoizes the function itself
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  return (
    <div>
      <ExpensiveComponent data={expensiveValue} />
      <Button onClick={handleClick} />
    </div>
  );
}
```

---

## 🔹 Common Pitfalls & Solutions

### 1. **Forgetting dependencies → Stale closures**

```jsx
// ❌ Wrong - stale closure
function Counter() {
  const [count, setCount] = useState(0);

  const logCount = useCallback(() => {
    console.log(count); // Always logs 0!
  }, []); // Missing count dependency

  return <button onClick={logCount}>Log: {count}</button>;
}

// ✅ Correct - include all dependencies
function Counter() {
  const [count, setCount] = useState(0);

  const logCount = useCallback(() => {
    console.log(count); // Logs current count
  }, [count]); // Include count in dependencies

  return <button onClick={logCount}>Log: {count}</button>;
}
```

### 2. **Overusing useCallback**

```jsx
// ❌ Unnecessary complexity
function SimpleComponent() {
  const [name, setName] = useState("");

  const handleChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  return <input value={name} onChange={handleChange} />;
}

// ✅ Much simpler and cleaner
function SimpleComponent() {
  const [name, setName] = useState("");

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

### 3. **Incorrect dependency arrays**

```jsx
// ❌ Missing dependencies
const handleSubmit = useCallback(() => {
  submitForm(formData, userId); // formData and userId not in deps
}, []); // This will use stale values!

// ✅ Correct dependencies
const handleSubmit = useCallback(() => {
  submitForm(formData, userId);
}, [formData, userId]); // Include all used variables
```

---

## 🔹 Performance Considerations

### When useCallback Actually Helps:

1. **Large component trees** with many memoized children
2. **Expensive child components** that take time to render
3. **High-frequency updates** (animations, real-time data)
4. **Complex forms** with multiple interdependent fields

### When it Doesn't Help:

1. **Small applications** with simple component trees
2. **Functions that change frequently** anyway
3. **Components that re-render for other reasons**
4. **Over-optimization** without measuring performance

---

## 🔹 Decision Flowchart

```
Should I use useCallback?
├── Is the function passed to React.memo component?
│   ├── Yes → ✅ Use useCallback
│   └── No → Continue
├── Is the function in a dependency array?
│   ├── Yes → ✅ Use useCallback
│   └── No → Continue
├── Do you have performance issues with re-renders?
│   ├── Yes → ✅ Use useCallback
│   └── No → Continue
├── Is it a simple inline handler?
│   ├── Yes → ❌ Skip useCallback
│   └── No → Continue
└── When in doubt → ❌ Skip useCallback (optimize later if needed)
```

---

## 🔹 Best Practices

1. **Measure before optimizing** - Use React DevTools Profiler
2. **Don't useCallback everything** - It has its own overhead
3. **Include all dependencies** - Use ESLint rules to catch missing deps
4. **Consider component structure** - Sometimes lifting state up/down is better
5. **Use React.memo wisely** - Only for components that actually benefit
6. **Profile your app** - Understand where the real bottlenecks are

---

## 🔹 Testing useCallback

```jsx
// Test that function reference stays stable
function TestComponent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  const stableFunction = useCallback(() => {
    console.log(count);
  }, [count]);

  // This should maintain reference when 'other' changes
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <button onClick={() => setOther((o) => o + 1)}>Other: {other}</button>
      <MemoizedChild onAction={stableFunction} />
    </div>
  );
}
```

---

## 🔹 Summary Cheat Sheet

| Scenario                      | Use useCallback? | Why                             |
| ----------------------------- | ---------------- | ------------------------------- |
| Passing to React.memo child   | ✅ Yes           | Prevents unnecessary re-renders |
| Function in useEffect deps    | ✅ Yes           | Prevents infinite loops         |
| Simple inline handlers        | ❌ No            | Adds unnecessary complexity     |
| Large lists with handlers     | ✅ Yes           | Performance optimization        |
| Functions that never change   | ✅ Yes           | Stable reference beneficial     |
| Frequently changing functions | ❌ Maybe         | Depends on use case             |

---

## 🔹 Key Takeaways

- `useCallback(fn, deps)` memoizes a **function reference**
- Use it when **function identity matters** (memo children, dependency arrays)
- Don't use it everywhere - only when you have **actual performance issues**
- Always include **all dependencies** to avoid stale closures
- **Measure performance** before and after optimization
- Remember: **premature optimization is the root of all evil**

---

## 📚 Additional Resources

- [React Official Docs - useCallback](https://react.dev/reference/react/useCallback)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [ESLint React Hooks Rules](https://www.npmjs.com/package/eslint-plugin-react-hooks)

---

**Happy Coding! 🚀**
