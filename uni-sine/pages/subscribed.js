import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import styles from "../styles/Subscribed.module.css";
import { useState, useEffect, useRef } from "react";
import CanvasConfetti from "react-canvas-confetti";
import { FaExternalLinkAlt } from "react-icons/fa";
import { sendGTMEvent } from "@next/third-parties/google";
import { useUserContext } from "../contexts/UserContext";
function Subscribed(props) {
  const { user, isLoading } = useUserContext();

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
      user &&
      user.app_metadata &&
      user.app_metadata.is_premium
    ) {


      const premiumData = JSON.parse(localStorage.getItem('premiumData'))
  
      if(!premiumData.subscribedAfterRedirect) {
        const premiumDataToSet = {
          'isAlreadyPremium': user?.app_metadata.is_premium,
          'subscribedAfterRedirect': true
        };
    
        localStorage.setItem('premiumData', JSON.stringify(premiumDataToSet));

        sendGTMEvent({event: 'subscription_purchase',
        contents: {
          content_type: "subscription",
          content_name: "premium",
          content_id: 1,
          currency: ((user?.app_metadata.region === 'NA' || user?.app_metadata.region === 'SA') ? 'USD' : 'GBP'),
          email: user.email,
          external_id: user.user_id,
          value: ((user?.app_metadata.region === 'NA' || user?.app_metadata.region === 'SA') ? 15 : 10),
          event_id: Math.floor(1e9 + Math.random() * 9e9).toString()
        }
      
      
      })
      
      }
      

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
  }, [user]); // Depend on user to trigger effect when user state changes

  // Redirect logic for non-premium or non-logged-in users
  if (!user) return <></>;
  if (!user?.app_metadata?.is_premium) return <></>;

  return (
    <div className={styles["subscribed-container"]}>
      <h1>You are now subscribed to</h1>
      <h1 className={styles["premium-color"]}>Uni-Sine Premium</h1>
      <CanvasConfetti ref={confettiRef} style={confettiStyles} />
      <p>Explore all that we have to offer</p>
  
      <div className={styles["premium-links"]}>
        <div className={`${styles["link-container"]} ${styles["link-questions"]}`}>
          <Link href="/questions">
          <video className={styles['video-preview']} autoPlay loop muted controls={false} preload="auto">
            <source src='/static/home/questions-preview.webm' type="video/webm" />
          </video>
            <span>Questions <FaExternalLinkAlt /></span>
          </Link>
        </div>
        <div className={`${styles["link-container"]} ${styles["link-courses"]}`}>
          <Link href="/courses">
          <video className={styles['video-preview']} autoPlay loop muted controls={false} preload="auto">
            <source src='/static/home/courses-preview.webm' type="video/webm" />
          </video>
            <span>Courses <FaExternalLinkAlt /></span>
          </Link>
        </div>
        <div className={`${styles["link-container"]} ${styles["link-calculators"]}`}>
          <Link href="/calculators">
          <video className={styles['video-preview']} autoPlay loop muted controls={false} preload="auto">
            <source src='/static/home/calculators-preview.webm' type="video/webm" />
          </video>
            <span>Calculators <FaExternalLinkAlt /></span>
          </Link>
        </div>
      </div>
    </div>
  );
  
}

export default withPageAuthRequired(Subscribed);
