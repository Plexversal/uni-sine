import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import styles from "../styles/Subscribed.module.css";
import { useState, useEffect, useRef } from "react";
import CanvasConfetti from "react-canvas-confetti";
import { FaExternalLinkAlt } from "react-icons/fa";
function Subscribed(props) {
  const confettiRef = useRef(null);
  const confettiStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    pointerEvents: "none",
  };

  useEffect(() => {
    // Ensure user is subscribed before triggering confetti
    if (
      props.user &&
      props.user.app_metadata &&
      props.user.app_metadata.is_premium
    ) {
      if (confettiRef.current) {
        const screenWidth = window.innerWidth;
        const confettiSettings =
          screenWidth <= 800
            ? {
                particleCount: 200,
                spread: 80,
                startVelocity: 35,
                gravity: 1.3,
                origin: { x: 0.5, y: 0.5 },
              }
            : {
                particleCount: 250,
                spread: 150,
                startVelocity: 45,
                gravity: 1.3,
                origin: { x: 0.5, y: 0.5 },
              };

        const instance = confettiRef.current;
        instance.confetti(confettiSettings);
      }
    }
  }, [props.user]); // Depend on props.user to trigger effect when user state changes

  // Redirect logic for non-premium or non-logged-in users
  if (!props.user) return <></>;
  if (!props.user?.app_metadata?.is_premium) return <></>;

  return (
    <div className={styles["subscribed-container"]}>
      <h1>You are now subscribed to</h1>
      <h1 className={styles["premium-color"]}>Uni-Sine Premium</h1>
      <CanvasConfetti ref={confettiRef} style={confettiStyles} />
      <p>Explore all that we have to offer</p>

      <div className={styles["premium-links"]}>
        <div
          className={`${styles["link-container"]} ${styles["link-questions"]}`}
        >
          <Link href="/questions">Questions <FaExternalLinkAlt /></Link>
        </div>
        <div
          className={`${styles["link-container"]} ${styles["link-calculators"]}`}
        >
          <Link href="/calculators">Calculators <FaExternalLinkAlt /></Link>
        </div>
        <div
          className={`${styles["link-container"]} ${styles["link-courses"]}`}
        >
          <Link href="/courses">Courses <FaExternalLinkAlt /></Link>
        </div>
      </div>
    </div>
  );
}

export default withPageAuthRequired(Subscribed);
