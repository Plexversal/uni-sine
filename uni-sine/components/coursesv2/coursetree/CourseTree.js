import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from '../../../styles/courses/CourseTree.module.css';
import CourseTreeStats from "../CourseTreeStats";

export default function CourseTree({ courseList: initialCourseList, lastCompletedIndex = 3 }) {
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

  // --- Calculate Positions Function (memoized) ---
  const calculatePositions = useCallback(() => {
    const container = scrollContainerRef.current;

    // Need items refs to be ready
    if (!container || itemRefs.current.some(ref => !ref.current)) {
      console.log("CourseTree: Refs not ready for initial pixel calculation.");
      setDotPixelPositions([]);
      return;
    }

    requestAnimationFrame(() => {
        // No need for scrollWidth here, just item positions
        console.log(`CourseTree: Calculating pixel positions.`);

        const pixelPositions = itemRefs.current.map((itemRef, index) => {
          const item = itemRef.current;
          if (!item) return 0;

          // Center position IN PIXELS relative to the scroll container's start edge
          const itemCenterPx = item.offsetLeft + item.offsetWidth / 2;

          console.log(`CourseTree Item ${index}: offsetLeft=${item.offsetLeft.toFixed(2)}, offsetWidth=${item.offsetWidth.toFixed(2)}, centerPx=${itemCenterPx.toFixed(2)}`);

          return itemCenterPx; // Store the raw pixel value
        });

        console.log("CourseTree: Calculated Dot Pixel Positions:", pixelPositions.map(p => p.toFixed(2)));
        setDotPixelPositions(pixelPositions);
    }); // End of requestAnimationFrame

  }, [courseList.length]); // Re-calculate only if list length changes

  // Effect 1: Calculate positions ONCE on mount / courseList length change
  useEffect(() => {
    console.log("CourseTree: Mount/courseList length effect running.");
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

    console.log(`CourseTree Width Update: Index=${lastCompletedIndex}, Target=${targetWidthPx.toFixed(2)}px. Reason: ${reason}`);

    progressLineRef.current.style.width = `${targetWidthPx}px`; // Set width in pixels

  // Add scrollContainerRef.current indirectly via dotPixelPositions dependency,
  // but primarily depends on index and the calculated positions array
  }, [lastCompletedIndex, dotPixelPositions]); // Dependencies remain the same

  // --- Render ---
  return (
    <div className={styles['course-tree-page-container']}>
      <CourseTreeStats />
      <div className={styles['timeline-section']}>
        <h1>Modules</h1>
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

          {/* Course list - POSITION RELATIVE, higher z-index */}
          <ul className={styles['course-list']}>
            {courseList.map((course, index) => (
              <li
                key={index}
                ref={itemRefs.current[index]}
                className={styles['timeline-item']} // Needs position relative, higher z-index
              >
                <span className={styles['course-name']}>{course}</span>
                <div className={styles['timeline-dot']}></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}