import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from '../../../styles/courses/CourseTree.module.css';
import CourseTreeStats from "../CourseTreeStats";
import Link from 'next/link';

export default function CourseTree({ courseList: initialCourseList, lastCompletedIndex = 2 }) {
  const courseList = Array.isArray(initialCourseList) ? initialCourseList : [];

  const progressLineRef = useRef(null);
  const scrollContainerRef = useRef(null);
  // No listRef needed usually
  const itemRefs = useRef([]);
  itemRefs.current = courseList.map(
    (_, i) => itemRefs.current[i] ?? React.createRef()
  );

  // --- State to store target PIXEL widths ---
  const [dotPixelPositions, setDotPixelPositions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // --- Calculate Positions Function (memoized) ---
  const calculatePositions = useCallback(() => {
    const container = scrollContainerRef.current;

    // Need items refs to be ready
    if (!container || itemRefs.current.some(ref => !ref.current)) {
      setDotPixelPositions([]);
      return;
    }

    requestAnimationFrame(() => {
        // No need for scrollWidth here, just item positions

        const pixelPositions = itemRefs.current.map((itemRef, index) => {
          const item = itemRef.current;
          if (!item) return 0;

          // Center position IN PIXELS relative to the scroll container's start edge
          const itemCenterPx = item.offsetLeft + item.offsetWidth / 2;

          return itemCenterPx; // Store the raw pixel value
        });

        setDotPixelPositions(pixelPositions);
    }); // End of requestAnimationFrame

  }, [courseList.length]); // Re-calculate only if list length changes

  // Effect 1: Calculate positions ONCE on mount / courseList length change
  useEffect(() => {
    // Slight delay might help ensure layout is fully stable after initial render
    const timer = setTimeout(calculatePositions, 50); // e.g., 50ms delay

    // --- NO RESIZE LISTENER ---

    return () => clearTimeout(timer); // Cleanup timer

  }, [calculatePositions]); // Dependency: the memoized function


  // Effect 2: Update the progress line width in PIXELS
  useEffect(() => {
    // Make sure both refs are available when needed
    if (!progressLineRef.current || !scrollContainerRef.current) {
        console.log("CourseTree Width Update: Refs missing.");
        // Set to 0px if refs aren't ready to prevent errors
        if (progressLineRef.current) progressLineRef.current.style.width = '0px';
        return;
    }

    
    let targetWidthPx = 0; // Default width 0px
    let reason = "No courses completed (index < 0)";

    if (dotPixelPositions.length > 0) {
        if (lastCompletedIndex >= 0 && lastCompletedIndex < dotPixelPositions.length) {
          // Target the center of the specific dot
          targetWidthPx = dotPixelPositions[lastCompletedIndex];
          reason = `Using calculated px ${targetWidthPx.toFixed(2)} for index ${lastCompletedIndex}`;
        }
        // --- MODIFIED FINAL STEP ---
        else if (lastCompletedIndex >= dotPixelPositions.length) {
          // Target the FULL scrollable width when last item (or beyond) is completed
          targetWidthPx = scrollContainerRef.current.scrollWidth;
          reason = `Index ${lastCompletedIndex} >= count ${dotPixelPositions.length}, using scrollWidth (${targetWidthPx.toFixed(2)}px)`;
        }
        // --- END MODIFICATION ---
    } else if (lastCompletedIndex >= 0) {
        reason = `Pixel positions not ready, but index is ${lastCompletedIndex}. Setting width to 0px temporarily.`;
        targetWidthPx = 0;
         console.warn(reason);
    }

    // Ensure width is not negative
    targetWidthPx = Math.max(0, targetWidthPx);
    progressLineRef.current.style.width = `${targetWidthPx}px`; // Set width in pixels


  }, [lastCompletedIndex, dotPixelPositions]); // Dependencies remain the same

// Add this useEffect inside your CourseTree component function

useEffect(() => {
  const container = scrollContainerRef.current; // Get the DOM element

  if (!container) {
    // Exit if the ref is not attached yet
    return;
  }

  const handleWheelScroll = (event) => {
    // Check if the element can actually scroll horizontally
    const canScrollHorizontally = container.scrollWidth > container.clientWidth;
    if (canScrollHorizontally) {
      event.preventDefault();

      container.scrollLeft += event.deltaY * 1;
      container.scrollLeft += event.deltaX * 1;
    }

  };
  container.addEventListener('wheel', handleWheelScroll, { passive: false });

  return () => {
    if (container) {
      container.removeEventListener('wheel', handleWheelScroll, { passive: false });
    }
  };
}, []); 

  // --- Render ---
  return (
    <div className={styles['course-tree-page-container']}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CourseTreeStats />
      </div>

      <div className={styles['timeline-wrapper']}>
        {/* Optional: Static base line container (stays outside) */}
        <div className={styles['timeline-line-container']}>
            <div className={styles['timeline-line-base']}></div>
        </div>

        {/* Scroll container - POSITION RELATIVE */}
        <div
          ref={scrollContainerRef}
          className={styles['timeline-scroll-container']}
        >
          {/* Progress line - MOVED INSIDE, POSITION ABSOLUTE */}
          <div
            ref={progressLineRef}
            className={styles['timeline-line-progress']}
          ></div>

          {/* Hover progress line */}
          <div
            className={styles['timeline-line-hover']}
            style={{
              width: hoveredIndex !== null && hoveredIndex > lastCompletedIndex && dotPixelPositions[hoveredIndex]
                ? `${dotPixelPositions[hoveredIndex]}px`
                : '0px'
            }}
          ></div>

          {/* Course list - POSITION RELATIVE, higher z-index */}
          <ul className={styles['course-list']}>
            {courseList.map((course, index) => {
              let itemClass = styles['timeline-item'];
              if (index < lastCompletedIndex) {
                itemClass += ` ${styles['completed-item']}`;
              } else if (index === lastCompletedIndex) {
                itemClass += ` ${styles['current-item']}`;
              } else {
                itemClass += ` ${styles['future-item']}`;
              }

              return (
              <li
                key={index}
                ref={itemRefs.current[index]}
                className={itemClass}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={'/coursesv2/webdevcoding/htmlsyntax'}>
                  <span className={styles['course-name']}>{course}</span>
                  <div className={styles['timeline-dot']}>
                    {index === lastCompletedIndex && (
                      <div className={styles['rotating-circle']}></div>
                    )}
                  </div>
                  <span className={styles['course-description']}>hello hello hello hello hello hello hello hello hello</span>
                </Link>

              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}