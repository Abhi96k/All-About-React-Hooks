import "./App.css";
import { useState, useMemo } from "react";
import { initialItems } from "./utils";

function App() {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

  // const selectedItem = items.find((item) => item.isselected);

  //above code will find the selected item from the items array
  //but it will run on every render, which is not optimal

  const selectedItem = useMemo(() => {
    console.log("Finding selected item...");
    return items.find((item) => item.isselected);
  }, [items]);

  return (
    <div className="app-container">
      <h1 className="title">🎯 UseMemo Hook Demo</h1>

      <div className="stats-grid">
        <div className="stat-card counter-display">
          <div className="stat-value sparkle">{count}</div>
          <div className="stat-label">Current Count</div>
        </div>

        <div className="stat-card selected-item-display">
          <div className="stat-value">{selectedItem?.id || "None"}</div>
          <div className="stat-label">Selected Item ID</div>
        </div>
      </div>

      <button className="increment-btn" onClick={() => setCount((c) => c + 1)}>
        Increment Counter
      </button>

      <div className="memo-info">
        <strong>💡 UseMemo Optimization:</strong> The selected item calculation
        is memoized and only recalculates when the items array changes, not when
        the count changes. Check the console to see when the expensive operation
        runs!
      </div>
    </div>
  );
}

export default App;
