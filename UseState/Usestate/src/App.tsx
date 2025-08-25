import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [input, setInput] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  return (
    <div className={`app-container ${theme}`}>
      <h1>useState Patterns Demo</h1>
      <div className="card">
        <h2>Counter</h2>
        <div className="counter-btns">
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
        <p>
          Current count: <span className="count">{count}</span>
        </p>
      </div>

      <div className="card">
        <h2>Theme Toggle</h2>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <p>
          Current theme: <b>{theme}</b>
        </p>
      </div>

      <div className="card">
        <h2>Input Field</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <p>
          You typed: <span className="input-value">{input}</span>
        </p>
      </div>

      <div className="card">
        <h2>Show/Hide Message</h2>
        <button onClick={() => setShowMsg((s) => !s)}>
          {showMsg ? "Hide" : "Show"} Message
        </button>
        {showMsg && (
          <p className="show-msg">
            Hello! This message is toggled by useState.
          </p>
        )}
      </div>

      <footer>
        <p>useState is simply explained</p>
      </footer>
    </div>
  );
}

export default App;
