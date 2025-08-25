import { memo } from "react";

interface SearchProps {
  onChange: (text: string) => void;
}

/**
 * 🔍 Search Component - Optimized with React.memo
 *
 * This component demonstrates the power of React.memo + useCallback combination.
 * It only re-renders when its props actually change, not when parent re-renders.
 */
function Search({ onChange }: SearchProps) {
  // 📊 Performance Tracking: Log when component actually renders
  console.log("🔄 Search component rendered");

  return (
    <input
      type="text"
      placeholder="🔍 Search users..."
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  );
}

// 🚀 React.memo wraps the component to prevent unnecessary re-renders
// Only re-renders when props change (shallow comparison)
export default memo(Search);

/*
=================================================================
📚 REACT.MEMO EXPLANATION:

🎯 What React.memo does:
├── Wraps functional components for optimization
├── Performs shallow comparison of props
├── Skips re-render if props haven't changed
└── Perfect companion for useCallback

⚡ Performance Benefits:
├── Prevents unnecessary re-renders
├── Reduces DOM manipulation
├── Improves app performance
└── Essential for complex component trees

🔧 When to use React.memo:
✅ Components that receive stable props
✅ Components with expensive render logic
✅ Child components in frequently updating parents
❌ Components that always receive new props
❌ Simple components with cheap renders

=================================================================
🧪 TESTING THIS OPTIMIZATION:

1. Watch console for "Search component rendered" logs
2. Without memo: Logs appear on every parent re-render
3. With memo: Logs only when search props actually change
4. Combined with useCallback: Maximum optimization achieved!

This demonstrates React's performance optimization strategies in action!
*/
