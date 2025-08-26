import { useRef, useState, useEffect, useCallback } from "react";

const ScrollPosition = () => {
  // State for scroll tracking
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Refs for scroll containers
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const infiniteScrollRef = useRef<HTMLDivElement>(null);

  // Refs for scroll tracking
  const scrollDirectionRef = useRef<"up" | "down">("down");
  const lastScrollYRef = useRef(0);
  const scrollThresholdRef = useRef(100);

  // Refs for performance optimization
  const rafIdRef = useRef<number | null>(null);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effect for window scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous RAF for performance
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use RAF for smooth scroll tracking
      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;

        // Determine scroll direction
        scrollDirectionRef.current =
          currentScrollY > lastScrollYRef.current ? "down" : "up";
        lastScrollYRef.current = currentScrollY;

        // Update state
        setScrollY(currentScrollY);
        setScrollX(currentScrollX);
        setIsAtTop(currentScrollY === 0);
        setIsAtBottom(
          currentScrollY + window.innerHeight >=
            document.documentElement.scrollHeight
        );
      });
    };

    // Throttled scroll handler for performance
    const throttledScroll = () => {
      if (throttleTimeoutRef.current) return;

      throttleTimeoutRef.current = setTimeout(() => {
        handleScroll();
        throttleTimeoutRef.current = null;
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, []);

  // Effect for container scroll tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleContainerScroll = () => {
      const { scrollTop, scrollLeft, scrollHeight, clientHeight } = container;

      // Check if at bottom of container
      const isAtContainerBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isAtContainerBottom) {
        console.log("Reached bottom of container!");
      }
    };

    container.addEventListener("scroll", handleContainerScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleContainerScroll);
    };
  }, []);

  // Function to scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Function to scroll to bottom
  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  // Function to scroll to specific position
  const scrollToPosition = useCallback((y: number) => {
    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, []);

  // Function to scroll container to specific position
  const scrollContainerTo = useCallback((top: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }, []);

  // Function to generate infinite scroll content
  const generateContent = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="content-item"
        style={{
          height: "100px",
          backgroundColor: `hsl(${(i * 30) % 360}, 70%, 80%)`,
          margin: "10px 0",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Content Item {i + 1}
      </div>
    ));
  };

  // Function to handle infinite scroll
  const handleInfiniteScroll = useCallback(() => {
    const container = infiniteScrollRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = scrollThresholdRef.current;

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      // Load more content
      console.log("Loading more content...");
      // In a real app, you would fetch more data here
    }
  }, []);

  return (
    <div className="scroll-position">
      <h2>Scroll Position Tracking with useRef</h2>

      <div className="section">
        <h3>Why useRef for Scroll Tracking?</h3>
        <p className="note">useRef is essential for scroll tracking because:</p>
        <ul>
          <li>Scroll positions change frequently without needing re-renders</li>
          <li>Performance optimization through throttling and RAF</li>
          <li>Stable references for scroll containers and thresholds</li>
          <li>Prevents unnecessary re-renders during scroll events</li>
          <li>Essential for infinite scroll and scroll-based animations</li>
        </ul>
      </div>

      <div className="section">
        <h3>Window Scroll Position</h3>
        <div className="scroll-info">
          <div className="scroll-metric">
            <strong>Scroll Y:</strong> {scrollY}px
          </div>
          <div className="scroll-metric">
            <strong>Scroll X:</strong> {scrollX}px
          </div>
          <div className="scroll-metric">
            <strong>Direction:</strong>
            <span className={`direction ${scrollDirectionRef.current}`}>
              {scrollDirectionRef.current}
            </span>
          </div>
          <div className="scroll-metric">
            <strong>At Top:</strong> {isAtTop ? "Yes" : "No"}
          </div>
          <div className="scroll-metric">
            <strong>At Bottom:</strong> {isAtBottom ? "Yes" : "No"}
          </div>
        </div>

        <div className="scroll-controls">
          <button onClick={scrollToTop} className="btn btn-primary">
            Scroll to Top
          </button>
          <button onClick={scrollToBottom} className="btn btn-primary">
            Scroll to Bottom
          </button>
          <button
            onClick={() => scrollToPosition(500)}
            className="btn btn-secondary"
          >
            Scroll to 500px
          </button>
          <button
            onClick={() => scrollToPosition(1000)}
            className="btn btn-secondary"
          >
            Scroll to 1000px
          </button>
        </div>
      </div>

      <div className="section">
        <h3>Container Scroll Tracking</h3>
        <div
          ref={scrollContainerRef}
          className="scrollable-container"
          style={{
            height: "300px",
            overflow: "auto",
            border: "2px solid #ddd",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h4>Scrollable Container</h4>
          <p>This container tracks its own scroll position independently.</p>
          {generateContent(8)}

          <div className="container-controls">
            <button
              onClick={() => scrollContainerTo(0)}
              className="btn btn-small"
            >
              Top
            </button>
            <button
              onClick={() => scrollContainerTo(500)}
              className="btn btn-small"
            >
              Middle
            </button>
            <button
              onClick={() => scrollContainerTo(1000)}
              className="btn btn-small"
            >
              Bottom
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Infinite Scroll Demo</h3>
        <div
          ref={infiniteScrollRef}
          className="infinite-scroll-container"
          onScroll={handleInfiniteScroll}
          style={{
            height: "400px",
            overflow: "auto",
            border: "2px solid #e74c3c",
            padding: "20px",
            backgroundColor: "#fdf2f2",
          }}
        >
          <h4>Infinite Scroll Container</h4>
          <p>Scroll to the bottom to trigger "load more" logic.</p>
          <p className="note">Check console for load more messages</p>
          {generateContent(15)}
        </div>
      </div>

      <div className="section">
        <h3>Scroll-Based Animations</h3>
        <div className="scroll-animations">
          <div
            className="animated-element"
            style={{
              transform: `translateX(${Math.min(scrollY / 10, 100)}px)`,
              opacity: Math.max(0.3, 1 - scrollY / 1000),
              transition: "transform 0.1s ease-out",
            }}
          >
            <h4>Scroll-Responsive Element</h4>
            <p>This element moves and fades based on scroll position</p>
          </div>

          <div
            className="parallax-element"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <h4>Parallax Effect</h4>
            <p>This element moves at half the scroll speed</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Performance Optimizations</h3>
        <div className="performance-tips">
          <div className="tip">
            <h4>1. RequestAnimationFrame</h4>
            <p>
              Use RAF for smooth scroll tracking without blocking the main
              thread
            </p>
          </div>
          <div className="tip">
            <h4>2. Throttling</h4>
            <p>
              Limit scroll event frequency to ~60fps for optimal performance
            </p>
          </div>
          <div className="tip">
            <h4>3. Passive Listeners</h4>
            <p>
              Use passive scroll listeners when possible for better performance
            </p>
          </div>
          <div className="tip">
            <h4>4. Debouncing</h4>
            <p>Delay expensive operations until scrolling stops</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Key Patterns Demonstrated</h3>
        <div className="patterns">
          <div className="pattern">
            <h4>1. Scroll Position Tracking</h4>
            <pre>{`const [scrollY, setScrollY] = useState(0);
const lastScrollYRef = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
    lastScrollYRef.current = currentScrollY;
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);`}</pre>
          </div>

          <div className="pattern">
            <h4>2. Performance Optimization</h4>
            <pre>{`const rafIdRef = useRef<number | null>(null);

const handleScroll = () => {
  if (rafIdRef.current) {
    cancelAnimationFrame(rafIdRef.current);
  }
  
  rafIdRef.current = requestAnimationFrame(() => {
    // Update scroll position
    setScrollY(window.scrollY);
  });
};`}</pre>
          </div>

          <div className="pattern">
            <h4>3. Infinite Scroll Detection</h4>
            <pre>{`const thresholdRef = useRef(100);

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = container;
  const threshold = thresholdRef.current;
  
  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    // Load more content
  }
};`}</pre>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Common Scroll Use Cases</h3>
        <div className="use-cases">
          <div className="use-case">
            <h4>1. Infinite Scroll</h4>
            <p>Social media feeds, product listings, news articles</p>
          </div>
          <div className="use-case">
            <h4>2. Scroll-Based Animations</h4>
            <p>Parallax effects, fade-in animations, progress indicators</p>
          </div>
          <div className="use-case">
            <h4>3. Scroll Position Tracking</h4>
            <p>Progress bars, navigation highlighting, scroll-to-top buttons</p>
          </div>
          <div className="use-case">
            <h4>4. Virtual Scrolling</h4>
            <p>Large lists, data tables, chat applications</p>
          </div>
          <div className="use-case">
            <h4>5. Scroll Performance</h4>
            <p>Lazy loading, debounced search, optimized rendering</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Best Practices</h3>
        <div className="best-practices">
          <div className="practice">
            <h4>1. Use RAF for Smooth Updates</h4>
            <p>RequestAnimationFrame ensures smooth scroll tracking</p>
          </div>
          <div className="practice">
            <h4>2. Throttle Scroll Events</h4>
            <p>Limit frequency to prevent performance issues</p>
          </div>
          <div className="practice">
            <h4>3. Clean Up Event Listeners</h4>
            <p>Always remove listeners in useEffect cleanup</p>
          </div>
          <div className="practice">
            <h4>4. Use Passive Listeners</h4>
            <p>Improve performance with passive scroll listeners</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPosition;
