import "./App.css";
import { useRef, useState, useEffect } from "react";
import RefExamples from "./components/RefExamples";
import FocusManagement from "./components/FocusManagement";
import PreviousValue from "./components/PreviousValue";
import DOMManipulation from "./components/DOMManipulation";
import TimerExample from "./components/TimerExample";
import ScrollPosition from "./components/ScrollPosition";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: "Basic Refs", component: <RefExamples /> },
    { id: 1, name: "Focus Management", component: <FocusManagement /> },
    { id: 2, name: "Previous Value", component: <PreviousValue /> },
    { id: 3, name: "DOM Manipulation", component: <DOMManipulation /> },
    { id: 4, name: "Timer Management", component: <TimerExample /> },
    { id: 5, name: "Scroll Position", component: <ScrollPosition /> },
  ];

  return (
    <div className="app">
      <h1>useRef Hook - Complete Guide</h1>
      <p>Learn all the patterns and use cases of useRef hook</p>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="tab-content">{tabs[activeTab].component}</div>
    </div>
  );
}

export default App;
