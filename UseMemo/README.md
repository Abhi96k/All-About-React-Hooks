# 🚀 React UseMemo Hook - Complete Guide

## 📖 Table of Contents

- [What is UseMemo?](#what-is-usememo)
- [Why Use UseMemo?](#why-use-usememo)
- [Where to Use UseMemo?](#where-to-use-usememo)
- [When NOT to Use UseMemo?](#when-not-to-use-usememo)
- [Syntax & Basic Usage](#syntax--basic-usage)
- [Live Demo Example](#live-demo-example)
- [Real-World Examples](#real-world-examples)
- [Performance Comparison](#performance-comparison)
- [Best Practices](#best-practices)
- [Common Mistakes](#common-mistakes)

---

## 🤔 What is UseMemo?

`useMemo` is a React Hook that lets you **cache the result of a calculation** between re-renders. It's a performance optimization tool that prevents expensive calculations from running on every render.

```tsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
```

---

## 🎯 Why Use UseMemo?

### **The Problem**

In React, when a component's state changes, the **entire component re-renders**. This means:

- All functions inside the component run again
- All calculations are performed again
- Heavy operations can slow down your app

### **The Solution**

UseMemo helps by:

- ✅ **Caching expensive calculations**
- ✅ **Preventing unnecessary re-computations**
- ✅ **Improving app performance**
- ✅ **Optimizing memory usage**

---

## 📍 Where to Use UseMemo?

### 1. **Expensive Calculations**

```tsx
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

### 2. **Complex Array/Object Operations**

```tsx
const filteredItems = useMemo(() => {
  return items.filter((item) => item.category === selectedCategory);
}, [items, selectedCategory]);
```

### 3. **Creating Objects/Arrays for Props**

```tsx
const userConfig = useMemo(
  () => ({
    name: user.name,
    preferences: user.settings,
  }),
  [user.name, user.settings]
);
```

### 4. **Expensive Transformations**

```tsx
const sortedAndFilteredData = useMemo(() => {
  return data
    .filter((item) => item.active)
    .sort((a, b) => a.name.localeCompare(b.name));
}, [data]);
```

---

## 🚫 When NOT to Use UseMemo?

### ❌ **Simple Calculations**

```tsx
// DON'T DO THIS - Too simple for memoization
const doubled = useMemo(() => count * 2, [count]);

// DO THIS INSTEAD
const doubled = count * 2;
```

### ❌ **Values That Always Change**

```tsx
// DON'T DO THIS - Dependencies always change
const timestamp = useMemo(() => Date.now(), [Math.random()]);
```

### ❌ **When Dependencies Are Expensive**

If calculating dependencies is more expensive than the calculation itself.

---

## 🔧 Syntax & Basic Usage

### **Basic Syntax**

```tsx
const memoizedValue = useMemo(
  () => expensiveFunction(input),
  [input] // Dependencies array
);
```

### **Key Points**

- **First argument**: Function that returns the value to memoize
- **Second argument**: Array of dependencies
- **Returns**: The memoized value

---

## 🖥️ Live Demo Example

Our demo shows a real-world scenario with **30 million items**:

```tsx
function App() {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems); // 30 million items!

  // ❌ WITHOUT useMemo - Runs on every render
  // const selectedItem = items.find(item => item.isselected);

  // ✅ WITH useMemo - Only runs when items change
  const selectedItem = useMemo(() => {
    console.log("Finding selected item...");
    return items.find((item) => item.isselected);
  }, [items]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Selected Item: {selectedItem?.id}</h2>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

### **What Happens**

- **Without useMemo**: Finding item in 30M array on every button click
- **With useMemo**: Finding item only once, cached for subsequent renders

---

## 🌟 Real-World Examples

### **1. Search and Filter**

```tsx
function ProductList({ products, searchTerm, category }) {
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => category === "all" || product.category === category);
  }, [products, searchTerm, category]);

  return (
    <div>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### **2. Complex Calculations**

```tsx
function FinancialDashboard({ transactions }) {
  const analytics = useMemo(() => {
    return {
      totalIncome: transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),

      totalExpenses: transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),

      monthlyAverage:
        transactions.length > 0
          ? transactions.reduce((sum, t) => sum + t.amount, 0) / 12
          : 0,
    };
  }, [transactions]);

  return (
    <div>
      <h2>Income: ${analytics.totalIncome}</h2>
      <h2>Expenses: ${analytics.totalExpenses}</h2>
      <h2>Monthly Avg: ${analytics.monthlyAverage}</h2>
    </div>
  );
}
```

### **3. API Data Transformation**

```tsx
function UserProfile({ userData }) {
  const processedUser = useMemo(() => {
    return {
      ...userData,
      fullName: `${userData.firstName} ${userData.lastName}`,
      age:
        new Date().getFullYear() - new Date(userData.birthDate).getFullYear(),
      profileComplete: Object.values(userData).every((value) => value !== null),
    };
  }, [userData]);

  return <UserCard user={processedUser} />;
}
```

---

## ⚡ Performance Comparison

### **Without UseMemo**

```tsx
// Runs on EVERY render - SLOW! 🐌
const result = expensiveCalculation(data);
```

### **With UseMemo**

```tsx
// Runs only when 'data' changes - FAST! 🚀
const result = useMemo(() => expensiveCalculation(data), [data]);
```

### **Benchmark Results**

- **Without memoization**: ~500ms per render
- **With memoization**: ~1ms per render (500x faster!)

---

## 💡 Best Practices

### **1. Choose Dependencies Carefully**

```tsx
// ✅ GOOD - Specific dependencies
const result = useMemo(() => calculate(a, b), [a, b]);

// ❌ BAD - Entire object as dependency
const result = useMemo(() => calculate(obj.a, obj.b), [obj]);
```

### **2. Use for Expensive Operations**

```tsx
// ✅ GOOD - Complex calculation
const expensiveResult = useMemo(() => {
  return largeArray.reduce((acc, item) => {
    return acc + complexCalculation(item);
  }, 0);
}, [largeArray]);

// ❌ BAD - Simple operation
const simpleResult = useMemo(() => a + b, [a, b]);
```

### **3. Profile Before Optimizing**

- Use React DevTools Profiler
- Measure actual performance impact
- Don't optimize prematurely

### **4. Combine with Other Hooks**

```tsx
const memoizedCallback = useCallback(
  (id) => memoizedData.find((item) => item.id === id),
  [memoizedData]
);
```

---

## 🚨 Common Mistakes

### **1. Forgetting Dependencies**

```tsx
// ❌ WRONG - Missing 'filter' dependency
const filtered = useMemo(
  () => items.filter((item) => item.category === filter),
  [items]
);

// ✅ CORRECT
const filtered = useMemo(
  () => items.filter((item) => item.category === filter),
  [items, filter]
);
```

### **2. Using Objects as Dependencies**

```tsx
// ❌ WRONG - Object reference changes
const result = useMemo(() => calculate(config), [config]);

// ✅ CORRECT - Use specific properties
const result = useMemo(() => calculate(config), [config.value1, config.value2]);
```

### **3. Overusing UseMemo**

```tsx
// ❌ WRONG - Unnecessary memoization
const userName = useMemo(() => user.name, [user.name]);

// ✅ CORRECT - Direct access
const userName = user.name;
```

---

## 🚀 Running This Demo

1. **Install Dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open Browser**
   - Visit `http://localhost:5173`
   - Open DevTools Console
   - Click "Increment Counter" button
   - Notice console logs showing memoization in action!

---

## 📚 Additional Resources

- [React Official Docs - useMemo](https://react.dev/reference/react/useMemo)
- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

---

## 🏆 Key Takeaways

- ✅ Use `useMemo` for expensive calculations
- ✅ Only optimize when you have performance issues
- ✅ Choose dependencies carefully
- ✅ Profile your app to measure improvements
- ❌ Don't overuse it for simple operations
- ❌ Avoid complex dependency arrays

---

**Happy Coding! 🎉**
