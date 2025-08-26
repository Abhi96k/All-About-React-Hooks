# React useContext Hook Learning Example

This project demonstrates the power and usage of React's `useContext` hook with TypeScript, showing how to create and consume context throughout your application.

## 🎯 What You'll Learn

### 1. **Context Creation & Provider Setup**

- How to create a context with `createContext()`
- Setting up context providers with default values
- TypeScript integration for type safety

### 2. **Context Consumption**

- Using `useContext()` hook to access context values
- **Custom Hook Pattern**: `useDashboardContext()` for better error handling
- Avoiding prop drilling
- Sharing state across component trees

### 3. **Interactive Context Updates**

- Updating context values from child components
- Demonstrating state changes through context
- Real-time UI updates

### 4. **Modern React Patterns**

- Functional components with hooks
- TypeScript best practices
- Responsive design with CSS Grid/Flexbox
- Custom hooks for context consumption

## 🚀 Key Features

- **User Profile Management**: Edit names, toggle subscription status
- **Real-time Updates**: Changes reflect immediately across all components
- **Responsive Design**: Works on all device sizes
- **TypeScript Integration**: Full type safety and IntelliSense
- **Modern UI**: Beautiful gradients, shadows, and animations
- **Custom Hook**: `useDashboardContext()` with proper error handling

## 🏗️ Project Structure

```
src/
├── App.tsx              # Main app with context provider
├── Context.ts           # Context definition, types, and custom hook
├── componets/
│   ├── DashBoard.tsx    # Main dashboard layout
│   ├── Profile.tsx      # User profile with editing
│   └── SideBar.tsx      # Sidebar with user info
└── App.css              # Comprehensive styling
```

## 🔧 How It Works

### 1. **Context Setup** (`Context.ts`)

```typescript
export interface DashboardContextValue {
  user: User;
  toggleSubscription: () => void;
  updateName: (newName: string) => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

// Custom hook with error handling
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider"
    );
  }
  return context;
};
```

### 2. **Provider Setup** (`App.tsx`)

```typescript
<DashboardContext.Provider value={{ user, toggleSubscription, updateName }}>
  <div className="app">
    <header className="app-header">
      <h1>useContext Learning Example</h1>
      <p>React Context API with TypeScript</p>
    </header>
    <DashBoard />
  </div>
</DashboardContext.Provider>
```

### 3. **Context Consumption** (Using custom hook)

```typescript
// Instead of: const { user } = useContext(DashboardContext);
const { user, toggleSubscription, updateName } = useDashboardContext();
```

## 📚 Learning Concepts Demonstrated

### **useContext Hook**

- **Purpose**: Access React context without prop drilling
- **When to Use**: Sharing data across component trees
- **Benefits**: Cleaner code, better performance, easier state management

### **Custom Hooks with Context**

- **useDashboardContext**: Custom hook that wraps useContext
- **Error Handling**: Throws meaningful errors if used outside provider
- **Better Developer Experience**: Clear error messages and type safety
- **Reusability**: Can be used in any component that needs context

### **Context API**

- **Provider Pattern**: Wrapping components to share data
- **Consumer Pattern**: Accessing shared data in child components
- **Error Boundaries**: Proper error handling for context usage

### **State Management**

- **Centralized State**: Single source of truth for user data
- **State Updates**: Functions to modify context from anywhere
- **Real-time Sync**: Changes propagate to all consumers

## 🎨 CSS Features

- **Modern Design**: Gradient backgrounds, rounded corners, shadows
- **Responsive Layout**: CSS Grid for desktop, Flexbox for mobile
- **Interactive Elements**: Hover effects, transitions, animations
- **Accessibility**: Focus states, proper contrast, semantic structure

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

## 🔍 Try These Experiments

1. **Edit User Name**: Click "Edit Name" and change the user's name
2. **Toggle Subscription**: Click subscribe/unsubscribe to see status changes
3. **Watch Real-time Updates**: Notice how changes appear in both Profile and Sidebar
4. **Responsive Design**: Resize your browser to see mobile layout
5. **Error Handling**: Try using `useDashboardContext` outside the provider (will show error)

## 💡 Advanced Learning Path

### **Next Steps to Explore**

1. **Multiple Contexts**: Create separate contexts for different data types
2. **Context with useReducer**: Combine context with complex state logic
3. **Performance Optimization**: Use `useMemo` and `useCallback` with context
4. **Custom Hooks**: Extract context logic into reusable custom hooks
5. **Testing**: Write tests for context providers and consumers
6. **Error Boundaries**: Implement proper error handling for context errors

### **Real-world Applications**

- **User Authentication**: Login state, user preferences
- **Theme Management**: Dark/light mode, color schemes
- **Shopping Cart**: Product state, cart management
- **App Settings**: Language, notifications, preferences

## 🎯 Key Takeaways

1. **useContext eliminates prop drilling** - No need to pass props through multiple component levels
2. **Custom hooks enhance context usage** - Better error handling and developer experience
3. **Context provides global state** - Share data across your entire component tree
4. **TypeScript + Context = Type Safety** - Get IntelliSense and compile-time error checking
5. **Context is perfect for app-wide state** - User data, themes, authentication, etc.
6. **Provider pattern is powerful** - Wrap your app to make data available everywhere

## 🔗 Related Concepts

- **useState**: Local component state
- **useReducer**: Complex state logic
- **Custom Hooks**: Reusable logic extraction
- **React.memo**: Performance optimization
- **Error Boundaries**: Error handling in React

## 🆕 What's New in This Version

- **Custom Hook**: `useDashboardContext()` for better context consumption
- **Error Handling**: Clear error messages when context is used incorrectly
- **Type Safety**: Proper TypeScript integration with undefined handling
- **Better Developer Experience**: Intuitive hook usage with clear error feedback

This example provides a solid foundation for understanding React Context and the useContext hook. The custom hook pattern makes context usage more robust and developer-friendly. Experiment with the code, add new features, and explore how context can solve real-world state management challenges!
