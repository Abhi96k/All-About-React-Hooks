import { useRef, useState, useEffect } from "react";

const DOMManipulation = () => {
  // Refs for different DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for measurements and manipulations
  const [measurements, setMeasurements] = useState({
    width: 0,
    height: 0,
    scrollTop: 0,
    scrollLeft: 0,
  });

  const [boxStyle, setBoxStyle] = useState({
    width: 100,
    height: 100,
    backgroundColor: "#3498db",
    borderRadius: 0,
  });

  // Effect to measure container on mount and resize
  useEffect(() => {
    const measureContainer = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMeasurements((prev) => ({
          ...prev,
          width: rect.width,
          height: rect.height,
        }));
      }
    };

    measureContainer();
    window.addEventListener("resize", measureContainer);

    return () => window.removeEventListener("resize", measureContainer);
  }, []);

  // Function to measure element dimensions
  const measureElement = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(boxRef.current);

      console.log("Box measurements:", {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        backgroundColor: computedStyle.backgroundColor,
        borderRadius: computedStyle.borderRadius,
      });
    }
  };

  // Function to scroll to element
  const scrollToElement = () => {
    if (boxRef.current) {
      boxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  // Function to change box style
  const changeBoxStyle = () => {
    setBoxStyle((prev) => ({
      ...prev,
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      borderRadius: Math.random() * 50,
    }));
  };

  // Function to manipulate text content
  const manipulateText = () => {
    if (textRef.current) {
      const currentText = textRef.current.textContent || "";
      const words = currentText.split(" ");
      const reversedWords = words.reverse();
      textRef.current.textContent = reversedWords.join(" ");
    }
  };

  // Function to draw on canvas
  const drawOnCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, 200, 200);

        // Draw random shapes
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
          ctx.beginPath();
          ctx.arc(
            Math.random() * 200,
            Math.random() * 200,
            Math.random() * 20 + 10,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
      }
    }
  };

  // Function to control video
  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Function to get scroll position
  const getScrollPosition = () => {
    if (containerRef.current) {
      setMeasurements((prev) => ({
        ...prev,
        scrollTop: containerRef.current?.scrollTop || 0,
        scrollLeft: containerRef.current?.scrollLeft || 0,
      }));
    }
  };

  // Function to scroll to specific position
  const scrollToPosition = (top: number, left: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top,
        left,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="dom-manipulation">
      <h2>DOM Manipulation with useRef</h2>

      <div className="section">
        <h3>Why useRef for DOM Manipulation?</h3>
        <p className="note">
          useRef provides direct access to DOM elements, allowing you to:
        </p>
        <ul>
          <li>Measure element dimensions and positions</li>
          <li>Manipulate element properties directly</li>
          <li>Control media elements (video, audio)</li>
          <li>Draw on canvas elements</li>
          <li>Scroll to specific positions</li>
          <li>Access computed styles and properties</li>
        </ul>
      </div>

      <div className="section">
        <h3>Container Measurements</h3>
        <div className="measurements">
          <p>
            <strong>Container Width:</strong> {measurements.width.toFixed(2)}px
          </p>
          <p>
            <strong>Container Height:</strong> {measurements.height.toFixed(2)}
            px
          </p>
          <p>
            <strong>Scroll Top:</strong> {measurements.scrollTop}px
          </p>
          <p>
            <strong>Scroll Left:</strong> {measurements.scrollLeft}px
          </p>
        </div>

        <div className="scroll-controls">
          <button
            onClick={() => scrollToPosition(0, 0)}
            className="btn btn-small"
          >
            Scroll to Top
          </button>
          <button
            onClick={() => scrollToPosition(500, 0)}
            className="btn btn-small"
          >
            Scroll Down
          </button>
          <button onClick={getScrollPosition} className="btn btn-small">
            Get Scroll Position
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="scrollable-container"
        style={{
          height: "300px",
          overflow: "auto",
          border: "2px solid #ddd",
          padding: "20px",
        }}
      >
        <div className="content-area">
          <h4>Scrollable Content Area</h4>
          <p>
            This container demonstrates scroll position tracking and
            programmatic scrolling.
          </p>

          <div ref={boxRef} className="manipulatable-box" style={boxStyle}>
            <p>Dynamic Box</p>
          </div>

          <p ref={textRef} className="manipulatable-text">
            This text can be manipulated using DOM methods. Click the button
            below to reverse the words.
          </p>

          <canvas
            ref={canvasRef}
            width="200"
            height="200"
            style={{ border: "1px solid #ccc", margin: "10px 0" }}
          >
            Your browser doesn't support canvas
          </canvas>

          <video
            ref={videoRef}
            width="200"
            height="150"
            style={{ margin: "10px 0" }}
          >
            <source
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              type="video/mp4"
            />
            Your browser doesn't support video
          </video>

          <div
            style={{
              height: "200px",
              backgroundColor: "#f0f0f0",
              margin: "20px 0",
            }}
          >
            <p>More content to enable scrolling...</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>DOM Manipulation Controls</h3>
        <div className="controls-grid">
          <div className="control-group">
            <h4>Box Manipulation</h4>
            <button onClick={changeBoxStyle} className="btn btn-primary">
              Change Box Style
            </button>
            <button onClick={measureElement} className="btn btn-secondary">
              Measure Box
            </button>
            <button onClick={scrollToElement} className="btn btn-secondary">
              Scroll to Box
            </button>
          </div>

          <div className="control-group">
            <h4>Text Manipulation</h4>
            <button onClick={manipulateText} className="btn btn-primary">
              Reverse Words
            </button>
          </div>

          <div className="control-group">
            <h4>Canvas Drawing</h4>
            <button onClick={drawOnCanvas} className="btn btn-primary">
              Draw Random Shapes
            </button>
          </div>

          <div className="control-group">
            <h4>Video Control</h4>
            <button onClick={toggleVideo} className="btn btn-primary">
              Play/Pause Video
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Key DOM Methods Demonstrated</h3>
        <div className="dom-methods">
          <div className="method">
            <h4>getBoundingClientRect()</h4>
            <p>Get element dimensions and position relative to viewport</p>
          </div>
          <div className="method">
            <h4>scrollIntoView()</h4>
            <p>Smoothly scroll element into view</p>
          </div>
          <div className="method">
            <h4>scrollTo()</h4>
            <p>Programmatically scroll to specific position</p>
          </div>
          <div className="method">
            <h4>getContext()</h4>
            <p>Get 2D context for canvas drawing</p>
          </div>
          <div className="method">
            <h4>play() / pause()</h4>
            <p>Control media element playback</p>
          </div>
          <div className="method">
            <h4>textContent</h4>
            <p>Manipulate text content directly</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Performance Considerations</h3>
        <div className="performance-tips">
          <div className="tip">
            <h4>1. Avoid Frequent DOM Queries</h4>
            <p>
              Store DOM references in refs to avoid repeated getElementById
              calls
            </p>
          </div>
          <div className="tip">
            <h4>2. Batch DOM Updates</h4>
            <p>Group multiple DOM manipulations together to minimize reflows</p>
          </div>
          <div className="tip">
            <h4>3. Use requestAnimationFrame</h4>
            <p>
              For animations, use requestAnimationFrame for smooth performance
            </p>
          </div>
          <div className="tip">
            <h4>4. Clean Up Event Listeners</h4>
            <p>Always remove event listeners in useEffect cleanup</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Common Pitfalls</h3>
        <div className="pitfalls">
          <div className="pitfall">
            <h4>1. Null Checks</h4>
            <p>Always check if ref.current exists before using it</p>
          </div>
          <div className="pitfall">
            <h4>2. Timing Issues</h4>
            <p>DOM elements might not be available on first render</p>
          </div>
          <div className="pitfall">
            <h4>3. Over-manipulation</h4>
            <p>
              Don't overuse direct DOM manipulation - prefer React state when
              possible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DOMManipulation;
