# useRef Hook - Complete Learning Guide

A comprehensive React application demonstrating all the patterns and use cases of the `useRef` hook with interactive examples and detailed explanations.

## 🎯 What You'll Learn

This project covers **6 major categories** of `useRef` usage:

### 1. **Basic Refs** (`RefExamples.tsx`)

- Mutable values that don't trigger re-renders
- DOM element references
- Previous value tracking
- Storing any type of data
- Key differences between `useState` and `useRef`

### 2. **Focus Management** (`FocusManagement.tsx`)

- Form field focus control
- Sequential focus navigation
- Accessibility improvements
- Programmatic focus management
- Form validation with focus

### 3. **Previous Value Tracking** (`PreviousValue.tsx`)

- Tracking state changes over time
- Change history logging
- Comparing current vs previous values
- Custom hooks pattern for value tracking
- Performance optimization techniques

### 4. **DOM Manipulation** (`DOMManipulation.tsx`)

- Element measurement and positioning
- Scroll control and positioning
- Canvas drawing and manipulation
- Media element control (video, audio)
- Dynamic styling and content manipulation

### 5. **Timer Management** (`TimerExample.tsx`)

- Countdown timers and stopwatches
- Interval and timeout management
- Proper cleanup and memory leak prevention
- Callback storage and execution
- Timer state persistence

### 6. **Scroll Position Tracking** (`ScrollPosition.tsx`)

- Window and container scroll tracking
- Infinite scroll implementation
- Scroll-based animations
- Performance optimization with RAF
- Throttling and debouncing techniques

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

### Installation

```bash
cd useRef
npm install
# or
pnpm install
```

### Running the App

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
useRef/
├── src/
│   ├── components/
│   │   ├── RefExamples.tsx      # Basic ref patterns
│   │   ├── FocusManagement.tsx  # Focus control examples
│   │   ├── PreviousValue.tsx    # Value tracking
│   │   ├── DOMManipulation.tsx  # DOM manipulation
│   │   ├── TimerExample.tsx     # Timer management
│   │   └── ScrollPosition.tsx   # Scroll tracking
│   ├── App.tsx                  # Main app with tab navigation
│   ├── App.css                  # Comprehensive styling
│   └── main.tsx                 # Entry point
├── package.json
└── README.md
```

## 💡 Key Concepts Demonstrated

### **useRef vs useState**

- **useRef**: Mutable values, no re-renders, direct DOM access
- **useState**: Immutable values, triggers re-renders, declarative UI updates

### **Common Patterns**

1. **DOM References**: `const elementRef = useRef<HTMLElement>(null)`
2. **Mutable Values**: `const countRef = useRef(0)`
3. **Previous Values**: `const prevValueRef = useRef<T>()`
4. **Timer Storage**: `const intervalRef = useRef<NodeJS.Timeout | null>(null)`
5. **Callback Storage**: `const callbackRef = useRef<() => void>()`

### **Best Practices**

- Always check `ref.current` before using
- Clean up timers and event listeners
- Use TypeScript for better type safety
- Prefer refs for imperative operations
- Use state for values that affect UI

## 🔧 Interactive Features

### **Live Examples**

- **Real-time Updates**: See ref values change without re-renders
- **DOM Manipulation**: Interactive canvas drawing and video control
- **Timer Controls**: Start, stop, and reset timers
- **Scroll Tracking**: Real-time scroll position monitoring
- **Focus Management**: Navigate forms with keyboard and mouse

### **Performance Demonstrations**

- **RequestAnimationFrame**: Smooth scroll tracking
- **Throttling**: Optimized event handling
- **Memory Management**: Proper cleanup examples
- **Efficient Updates**: Minimal re-renders

## 📚 Learning Path

### **Beginner Level**

1. Start with **Basic Refs** to understand the fundamental concept
2. Learn **Focus Management** for form handling
3. Explore **Previous Value Tracking** for state comparison

### **Intermediate Level**

4. Master **DOM Manipulation** for element control
5. Understand **Timer Management** for async operations
6. Implement **Scroll Position Tracking** for advanced UX

### **Advanced Level**

- Combine multiple patterns in custom hooks
- Implement performance optimizations
- Create reusable ref-based utilities

## 🎨 Customization

### **Adding New Examples**

1. Create a new component in `src/components/`
2. Add it to the tabs array in `App.tsx`
3. Import and use the component

### **Styling**

- Modify `App.css` for visual changes
- Use CSS custom properties for theming
- Responsive design included

## 🧪 Testing

### **Manual Testing**

- Navigate between tabs to see different examples
- Interact with form elements and buttons
- Test scroll behavior and animations
- Check console for logged information

### **Browser Compatibility**

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Touch-friendly interactions

## 📖 Additional Resources

### **React Documentation**

- [useRef Hook](https://react.dev/reference/react/useRef)
- [Refs and the DOM](https://react.dev/learn/manipulating-the-dom-with-refs)

### **Advanced Patterns**

- [Custom Hooks with useRef](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Performance Optimization](https://react.dev/learn/render-and-commit)

### **TypeScript Integration**

- [useRef with TypeScript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/)
- [Generic Types with Refs](https://www.typescriptlang.org/docs/handbook/generics.html)

## 🤝 Contributing

Feel free to:

- Add new useRef patterns
- Improve existing examples
- Enhance the UI/UX
- Fix bugs or typos
- Add more comprehensive documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React team for the amazing useRef hook
- TypeScript for type safety
- Vite for fast development experience
- Modern CSS for beautiful styling

---

**Happy Learning! 🚀**

Explore each tab to master different aspects of the `useRef` hook and become a React expert!
