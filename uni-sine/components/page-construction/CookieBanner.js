import { useState, useEffect } from 'react';
import styles from '../../styles/CookieBanner.module.css'
import Link from 'next/link';

export default function CookieBanner (){
  // State to manage the display of the banner
  const [showBanner, setShowBanner] = useState(false);
  const [animateBanner, setAnimateBanner] = useState(false); 
  const [consent, setConsent] = useState({
    necessary: true, // This is always true as it's necessary
    analytics: true,
    preferences: true,
    marketing: true,
  });

  // Check if consent has already been set in localStorage on component mount
  useEffect(() => {
    const consentModeString = localStorage.getItem('consentMode');
    const consentMode = consentModeString ? JSON.parse(consentModeString) : {};
    const userHasInteracted = consentMode.userHasInteracted; // This is a new flag
  
    // Show banner if user has not interacted, regardless of whether consentMode is null
    setTimeout(() => {
        setShowBanner(!userHasInteracted);

      }, 1500); 
  }, []);

  useEffect(() => {
    if (showBanner) {
      // Wait for the state to update and browser to render, then add the class to animate
      setTimeout(() => {
        setAnimateBanner(true);
      }, 0); // Small delay to ensure it gets the class after rendering
    }
  }, [showBanner]); // This effect depends on showBanner

  const handleAcceptSelection = () => {
    updateConsent(consent);
  };

  const handleRejectAll = () => {
    const noConsent = {
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
    };
    updateConsent(noConsent);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setConsent((prev) => ({ ...prev, [name]: checked }));
  };

  const updateConsent = (consent) => {
    const consentMode = {
      'functionality_storage': consent.necessary ? 'granted' : 'denied',
      'security_storage': consent.necessary ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_personalization': consent.preferences ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'userHasInteracted': true, // Add this line to indicate interaction
    };
  
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', consentMode);
    }
    localStorage.setItem('consentMode', JSON.stringify(consentMode));
    setShowBanner(false); // Hide banner after setting consent
  };
  

  return (  <>
    {showBanner && (
      <div className={`${styles["cookie-consent-banner"]} ${animateBanner ? styles.show : ''}`}>
        <h2>Cookie settings</h2>
        <p>We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you. More details can be found on our <strong><Link href={'/privacy-policy'}>Privacy Policy</Link></strong></p>
        <div className={styles['btn-container']}>
        <button className={`${styles["cookie-consent-button"]} ${styles["btn-outline"]}`} onClick={handleAcceptSelection}>Accept Selection</button>
        <button className={`${styles["btn-grayscale"]}`} onClick={handleRejectAll}>Reject All</button>
        </div>
        <div className={styles["cookie-consent-options"]}>
          <label><input type="checkbox" name="necessary" value="Necessary" checked={consent.necessary} disabled />Necessary</label>
          <label><input type="checkbox" name="analytics" value="Analytics" checked={consent.analytics} onChange={handleChange} />Analytics</label>
          <label><input type="checkbox" name="preferences" value="Preferences" checked={consent.preferences} onChange={handleChange} />Preferences</label>
          <label><input type="checkbox" name="marketing" value="Marketing" checked={consent.marketing} onChange={handleChange} />Marketing</label>
        </div>
      </div>
    )}
  </>
    
  );
};
