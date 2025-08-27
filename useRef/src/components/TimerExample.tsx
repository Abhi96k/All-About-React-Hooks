import { useRef, useState, useEffect, useCallback } from "react";

const TimerExample = () => {
  // State for timer display
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Refs for timer management
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const previousElapsedTimeRef = useRef<number>(0);

  // Ref for storing the latest callback function
  const latestCallbackRef = useRef<() => void>(() => {});

  // Ref for storing cleanup functions
  const cleanupRef = useRef<(() => void) | null>(null);

  // Effect to demonstrate timer cleanup
  useEffect(() => {
    // Store cleanup function in ref
    cleanupRef.current = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // Return cleanup function
    return cleanupRef.current;
  }, []);

  // Function to start countdown timer
  const startCountdown = useCallback(() => {
    if (intervalRef.current) return; // Already running

    setIsRunning(true);
    setCount(10); // Start from 10

    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          // Timer finished
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  }, []);

  // Function to start stopwatch
  const startStopwatch = useCallback(() => {
    if (intervalRef.current) return; // Already running

    setIsRunning(true);
    startTimeRef.current = Date.now() - previousElapsedTimeRef.current;

    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10); // Update every 10ms for smooth display
  }, []);

  // Function to stop timer/stopwatch
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsRunning(false);
    previousElapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  // Function to reset timer/stopwatch
  const resetTimer = useCallback(() => {
    stopTimer();
    setCount(10);
    setElapsedTime(0);
    previousElapsedTimeRef.current = 0;
  }, [stopTimer]);

  // Function to demonstrate delayed execution
  const delayedExecution = useCallback(() => {
    if (timeoutRef.current) return; // Already scheduled

    console.log("Scheduling delayed execution...");
    timeoutRef.current = setTimeout(() => {
      console.log("Delayed execution completed!");
      timeoutRef.current = null;
    }, 3000);
  }, []);

  // Function to demonstrate callback ref pattern
  const updateCallback = useCallback(() => {
    // This function will be stored in ref and can be called later
    latestCallbackRef.current = () => {
      console.log(`Current count: ${count}, Elapsed time: ${elapsedTime}ms`);
    };
  }, [count, elapsedTime]);

  // Function to execute stored callback
  const executeStoredCallback = useCallback(() => {
    if (latestCallbackRef.current) {
      latestCallbackRef.current();
    } else {
      console.log("No callback stored yet");
    }
  }, []);

  // Function to demonstrate cleanup on unmount
  const forceCleanup = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }
  }, []);

  // Format elapsed time for display
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="timer-example">
      <h2>Timer Management with useRef</h2>

      <div className="section">
        <h3>Why useRef for Timers?</h3>
        <p className="note">
          useRef is essential for timer management because:
        </p>
        <ul>
          <li>Timers persist between renders without causing re-renders</li>
          <li>Allows proper cleanup and cancellation</li>
          <li>Prevents memory leaks from abandoned timers</li>
          <li>Provides stable references for cleanup functions</li>
          <li>Essential for component lifecycle management</li>
        </ul>
      </div>

      <div className="section">
        <h3>Countdown Timer</h3>
        <div className="timer-display">
          <div className="countdown">
            <span className="count">{count}</span>
            <span className="label">seconds</span>
          </div>
          <div className="timer-controls">
            <button
              onClick={startCountdown}
              disabled={isRunning}
              className="btn btn-primary"
            >
              Start Countdown
            </button>
            <button
              onClick={stopTimer}
              disabled={!isRunning}
              className="btn btn-secondary"
            >
              Stop
            </button>
            <button onClick={resetTimer} className="btn btn-secondary">
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Stopwatch</h3>
        <div className="timer-display">
          <div className="stopwatch">
            <span className="time">{formatTime(elapsedTime)}</span>
            <span className="label">elapsed</span>
          </div>
          <div className="timer-controls">
            <button
              onClick={startStopwatch}
              disabled={isRunning}
              className="btn btn-primary"
            >
              Start Stopwatch
            </button>
            <button
              onClick={stopTimer}
              disabled={!isRunning}
              className="btn btn-secondary"
            >
              Stop
            </button>
            <button onClick={resetTimer} className="btn btn-secondary">
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Delayed Execution</h3>
        <div className="delayed-execution">
          <button
            onClick={delayedExecution}
            disabled={timeoutRef.current !== null}
            className="btn btn-primary"
          >
            Schedule 3s Delay
          </button>
          <p className="note">Check console for delayed execution messages</p>
        </div>
      </div>

      <div className="section">
        <h3>Callback Reference Pattern</h3>
        <div className="callback-pattern">
          <button onClick={updateCallback} className="btn btn-secondary">
            Update Stored Callback
          </button>
          <button onClick={executeStoredCallback} className="btn btn-primary">
            Execute Stored Callback
          </button>
          <p className="note">
            This demonstrates how refs can store and execute callbacks
          </p>
        </div>
      </div>

      <div className="section">
        <h3>Timer Status</h3>
        <div className="timer-status">
          <p>
            <strong>Countdown Active:</strong>{" "}
            {isRunning && count > 0 ? "Yes" : "No"}
          </p>
          <p>
            <strong>Stopwatch Active:</strong>{" "}
            {isRunning && count === 0 ? "Yes" : "No"}
          </p>
          <p>
            <strong>Interval ID:</strong>{" "}
            {intervalRef.current ? "Active" : "None"}
          </p>
          <p>
            <strong>Timeout ID:</strong>{" "}
            {timeoutRef.current ? "Active" : "None"}
          </p>
        </div>
      </div>

      <div className="section">
        <h3>Cleanup Controls</h3>
        <div className="cleanup-controls">
          <button onClick={forceCleanup} className="btn btn-warning">
            Force Cleanup
          </button>
          <p className="note">Use this to manually clean up all timers</p>
        </div>
      </div>

      <div className="section">
        <h3>Key Patterns Demonstrated</h3>
        <div className="patterns">
          <div className="pattern">
            <h4>1. Timer Storage</h4>
            <pre>{`const intervalRef = useRef<NodeJS.Timeout | null>(null);
const timeoutRef = useRef<NodeJS.Timeout | null>(null);`}</pre>
          </div>

          <div className="pattern">
            <h4>2. Timer Cleanup</h4>
            <pre>{`useEffect(() => {
  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, []);`}</pre>
          </div>

          <div className="pattern">
            <h4>3. Callback Storage</h4>
            <pre>{`const callbackRef = useRef<() => void>();
callbackRef.current = () => console.log('Latest callback');
// Execute later
callbackRef.current?.();`}</pre>
          </div>

          <div className="pattern">
            <h4>4. Cleanup Function Storage</h4>
            <pre>{`const cleanupRef = useRef<(() => void) | null>(null);
cleanupRef.current = () => { /* cleanup logic */ };
return cleanupRef.current;`}</pre>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Common Timer Use Cases</h3>
        <div className="use-cases">
          <div className="use-case">
            <h4>1. Countdown Timers</h4>
            <p>Game timers, session timeouts, auction countdowns</p>
          </div>
          <div className="use-case">
            <h4>2. Stopwatches</h4>
            <p>Performance measurement, user activity timing</p>
          </div>
          <div className="use-case">
            <h4>3. Delayed Actions</h4>
            <p>Auto-save, delayed API calls, user feedback</p>
          </div>
          <div className="use-case">
            <h4>4. Polling</h4>
            <p>Regular data updates, status checks</p>
          </div>
          <div className="use-case">
            <h4>5. Debouncing</h4>
            <p>Search input, resize handlers, scroll events</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Best Practices</h3>
        <div className="best-practices">
          <div className="practice">
            <h4>1. Always Clean Up</h4>
            <p>Clear timers in useEffect cleanup to prevent memory leaks</p>
          </div>
          <div className="practice">
            <h4>2. Check Before Setting</h4>
            <p>Verify no existing timer before setting a new one</p>
          </div>
          <div className="practice">
            <h4>3. Store in Refs</h4>
            <p>Use refs to store timer IDs for proper cleanup</p>
          </div>
          <div className="practice">
            <h4>4. Handle Component Unmount</h4>
            <p>Ensure timers are cleared when component unmounts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerExample;
