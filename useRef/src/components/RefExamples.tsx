import { useRef, useState, useEffect } from "react";

const RefExamples = () => {
  // 1. Basic mutable value ref
  const countRef = useRef(0);

  // 2. DOM element ref
  const inputRef = useRef<HTMLInputElement>(null);

  // 3. State for comparison
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // 4. Ref for storing previous values
  const prevCountRef = useRef<number>();

  // 5. Ref for storing any value
  const anyValueRef = useRef<any>(null);

  // 6. Ref for storing functions
  const callbackRef = useRef<() => void>();

  // Effect to demonstrate ref persistence across renders
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
    prevCountRef.current = count;
  }, [count]);

  // 7. Function to demonstrate ref vs state behavior
  const handleIncrement = () => {
    // State update triggers re-render
    setCount((prev) => prev + 1);

    // Ref update doesn't trigger re-render
    countRef.current += 1;

    // Store callback in ref
    callbackRef.current = () => console.log("Callback executed!");

    // Store any value
    anyValueRef.current = { message: "Hello from ref!", timestamp: Date.now() };
  };

  // 8. Function to demonstrate DOM manipulation
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // 9. Function to demonstrate ref value access
  const logRefValues = () => {
    console.log("Count ref:", countRef.current);
    console.log("Any value ref:", anyValueRef.current);
    console.log("Callback ref:", callbackRef.current);

    if (callbackRef.current) {
      callbackRef.current();
    }
  };

  return (
    <div className="ref-examples">
      <h2>Basic useRef Patterns</h2>

      <div className="section">
        <h3>1. Mutable Values (No Re-renders)</h3>
        <p>Ref value: {countRef.current}</p>
        <p>State value: {count}</p>
        <p>Render count: {renderCount}</p>
        <button onClick={handleIncrement}>Increment Both</button>
        <p className="note">
          Notice: Ref value doesn't update in UI because it doesn't trigger
          re-renders!
        </p>
      </div>

      <div className="section">
        <h3>2. DOM Element References</h3>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something here..."
          className="demo-input"
        />
        <button onClick={focusInput}>Focus Input</button>
        <p className="note">
          Click the button to focus the input field using ref
        </p>
      </div>

      <div className="section">
        <h3>3. Previous Value Tracking</h3>
        <p>Current count: {count}</p>
        <p>Previous count: {prevCountRef.current ?? "None"}</p>
        <p className="note">
          We track the previous value using ref in useEffect
        </p>
      </div>

      <div className="section">
        <h3>4. Storing Any Values</h3>
        <button onClick={logRefValues}>Log Ref Values</button>
        <p className="note">
          Check console to see ref values. Refs can store any type of data.
        </p>
      </div>

      <div className="section">
        <h3>5. Key Differences: State vs Ref</h3>
        <div className="comparison">
          <div>
            <h4>useState</h4>
            <ul>
              <li>Triggers re-renders when updated</li>
              <li>Updates are asynchronous</li>
              <li>Best for values that affect UI</li>
              <li>Value is always current in render</li>
            </ul>
          </div>
          <div>
            <h4>useRef</h4>
            <ul>
              <li>No re-renders when updated</li>
              <li>Updates are synchronous</li>
              <li>Best for values that don't affect UI</li>
              <li>Value persists between renders</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>6. Common Use Cases</h3>
        <ul>
          <li>
            <strong>DOM manipulation:</strong> Focus, scroll, measure elements
          </li>
          <li>
            <strong>Storing previous values:</strong> Compare current vs
            previous
          </li>
          <li>
            <strong>Storing mutable values:</strong> Counters, flags, timers
          </li>
          <li>
            <strong>Storing callbacks:</strong> Latest function reference
          </li>
          <li>
            <strong>Storing any data:</strong> Objects, arrays, functions
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RefExamples;
