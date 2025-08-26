import { useRef, useState, useEffect } from "react";

const PreviousValue = () => {
  // State for current values
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [user, setUser] = useState({ id: 0, name: "", email: "" });

  // Refs to store previous values
  const prevNameRef = useRef<string>("");
  const prevAgeRef = useRef<number>(0);
  const prevIsOnlineRef = useRef<boolean>(false);
  const prevUserRef = useRef<{ id: number; name: string; email: string }>({
    id: 0,
    name: "",
    email: "",
  });

  // Ref to store render count
  const renderCountRef = useRef(0);

  // Ref to store change history
  const changeHistoryRef = useRef<
    Array<{ field: string; from: any; to: any; timestamp: number }>
  >([]);

  // Effect to track previous values and changes
  useEffect(() => {
    renderCountRef.current += 1;

    // Track name changes
    if (name !== prevNameRef.current) {
      changeHistoryRef.current.push({
        field: "name",
        from: prevNameRef.current,
        to: name,
        timestamp: Date.now(),
      });
      prevNameRef.current = name;
    }

    // Track age changes
    if (age !== prevAgeRef.current) {
      changeHistoryRef.current.push({
        field: "age",
        from: prevAgeRef.current,
        to: age,
        timestamp: Date.now(),
      });
      prevAgeRef.current = age;
    }

    // Track online status changes
    if (isOnline !== prevIsOnlineRef.current) {
      changeHistoryRef.current.push({
        field: "isOnline",
        from: prevIsOnlineRef.current,
        to: isOnline,
        timestamp: Date.now(),
      });
      prevIsOnlineRef.current = isOnline;
    }

    // Track user object changes
    if (JSON.stringify(user) !== JSON.stringify(prevUserRef.current)) {
      changeHistoryRef.current.push({
        field: "user",
        from: prevUserRef.current,
        to: user,
        timestamp: Date.now(),
      });
      prevUserRef.current = { ...user };
    }
  }, [name, age, isOnline, user]);

  // Function to clear change history
  const clearHistory = () => {
    changeHistoryRef.current = [];
  };

  // Function to get formatted timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Function to reset all values
  const resetValues = () => {
    setName("");
    setAge(0);
    setIsOnline(false);
    setUser({ id: 0, name: "", email: "" });
  };

  return (
    <div className="previous-value">
      <h2>Previous Value Tracking with useRef</h2>

      <div className="section">
        <h3>Why Track Previous Values?</h3>
        <p className="note">
          useRef is perfect for tracking previous values because:
        </p>
        <ul>
          <li>Values persist between renders without causing re-renders</li>
          <li>Perfect for comparing current vs previous state</li>
          <li>Useful for detecting changes and triggering side effects</li>
          <li>Common in custom hooks and complex state management</li>
        </ul>
      </div>

      <div className="section">
        <h3>Current Values</h3>
        <div className="values-grid">
          <div className="value-item">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="input-field"
            />
          </div>

          <div className="value-item">
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
              placeholder="Enter age"
              className="input-field"
            />
          </div>

          <div className="value-item">
            <label>Online Status:</label>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`status-btn ${isOnline ? "online" : "offline"}`}
            >
              {isOnline ? "Online" : "Offline"}
            </button>
          </div>

          <div className="value-item">
            <label>User ID:</label>
            <input
              type="number"
              value={user.id}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  id: Number(e.target.value) || 0,
                }))
              }
              placeholder="Enter ID"
              className="input-field"
            />
          </div>

          <div className="value-item">
            <label>User Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter user name"
              className="input-field"
            />
          </div>

          <div className="value-item">
            <label>User Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Enter email"
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Previous Values (Stored in Refs)</h3>
        <div className="previous-values">
          <div className="prev-item">
            <strong>Previous Name:</strong> {prevNameRef.current || "None"}
          </div>
          <div className="prev-item">
            <strong>Previous Age:</strong> {prevAgeRef.current || "None"}
          </div>
          <div className="prev-item">
            <strong>Previous Online Status:</strong>{" "}
            {prevIsOnlineRef.current ? "Online" : "Offline"}
          </div>
          <div className="prev-item">
            <strong>Previous User:</strong>{" "}
            {JSON.stringify(prevUserRef.current)}
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Change History</h3>
        <div className="history-controls">
          <button onClick={clearHistory} className="btn btn-secondary">
            Clear History
          </button>
          <button onClick={resetValues} className="btn btn-secondary">
            Reset Values
          </button>
        </div>

        <div className="change-history">
          {changeHistoryRef.current.length === 0 ? (
            <p className="no-changes">
              No changes recorded yet. Try modifying the values above!
            </p>
          ) : (
            changeHistoryRef.current.map((change, index) => (
              <div key={index} className="change-item">
                <span className="change-field">{change.field}</span>
                <span className="change-arrow">→</span>
                <span className="change-from">
                  {String(change.from) || "empty"}
                </span>
                <span className="change-to">
                  {String(change.to) || "empty"}
                </span>
                <span className="change-time">
                  {formatTime(change.timestamp)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="section">
        <h3>Render Information</h3>
        <p>
          Component has rendered <strong>{renderCountRef.current}</strong> times
        </p>
        <p className="note">
          Notice that updating refs doesn't cause re-renders, but we can still
          track changes!
        </p>
      </div>

      <div className="section">
        <h3>Common Use Cases for Previous Value Tracking</h3>
        <div className="use-cases">
          <div className="use-case">
            <h4>1. Custom Hooks</h4>
            <p>Track previous values to detect changes and trigger effects</p>
          </div>
          <div className="use-case">
            <h4>2. Form Validation</h4>
            <p>Compare current vs previous values for change detection</p>
          </div>
          <div className="use-case">
            <h4>3. Animation Triggers</h4>
            <p>Trigger animations when values change from specific states</p>
          </div>
          <div className="use-case">
            <h4>4. Performance Optimization</h4>
            <p>Skip expensive operations when values haven't changed</p>
          </div>
          <div className="use-case">
            <h4>5. Debugging</h4>
            <p>Track state changes for debugging and logging</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Implementation Pattern</h3>
        <div className="code-pattern">
          <pre>{`// 1. Create ref to store previous value
const prevValueRef = useRef(initialValue);

// 2. Use useEffect to update ref when value changes
useEffect(() => {
  if (currentValue !== prevValueRef.current) {
    // Do something with the change
    console.log('Value changed from', prevValueRef.current, 'to', currentValue);
    
    // Update the ref
    prevValueRef.current = currentValue;
  }
}, [currentValue]);

// 3. Access previous value anytime
const previousValue = prevValueRef.current;`}</pre>
        </div>
      </div>
    </div>
  );
};

export default PreviousValue;
