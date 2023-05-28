import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import LoadingIcon from "../page-construction/LoadingIcon";
import startCheckout from "../page-construction/StartCheckout";
const EscapeVelocity = (props) => {

  const [userData, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [noPremium, setNoPremium] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/auth0/auth0-user`);
        const data = await response.json();
        if (!data) {
          throw new Error("Error loading user data");
        }
        setUser(data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  
  const checkPremium = () => {
    setNoPremium(true);
  };

    const [coefficient, setCoefficient] = useState("5.9722");
    const [powerOfTen, setPowerOfTen] = useState("24");
    const [radius, setRadius] = useState("6371000");
    const [gravitationalConstant, setGravitationalConstant] = useState("6.67430e-11");
    const [escapeVelocity, setEscapeVelocity] = useState(null);
    const [useKm, setUseKm] = useState(false);
  
    const calculateEscapeVelocity = () => {
      const mass = coefficient * Math.pow(10, powerOfTen);
      const velocity = Math.sqrt((2 * parseFloat(gravitationalConstant) * mass) / radius);
      setEscapeVelocity(velocity);
    };
  
    const displayedEscapeVelocity = useKm ? escapeVelocity / 1000 : escapeVelocity;
  
    return (<>{
      isLoading ? <LoadingIcon /> : <>
      
      <div onClick={userData?.app_metadata?.is_premium ? null : checkPremium} className={styles['container']}>
      {noPremium ? (
            <div className={styles["no-premium-overlay"]}>
              <h1>You need premium to use this feature</h1>
              <button onClick={startCheckout}>Buy Premium</button>
            </div>
          ) : (
            <></>
          )}
        <h1>Escape Velocity Calculator</h1>
      <div className={styles["calculator-content-container"]}>
        <div className={`${styles['calculator-content']} ${styles["user-inputs-container"]}`}>
          <div>
            Mass (kg):
            <input
            className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
              type="number"
              value={coefficient}
              onChange={(e) => setCoefficient(parseFloat(e.target.value))}
            />
          X 10<sup><input
            className={`${styles['user-input']} ${styles['user-input-exp']}`}
            type="number"
            value={powerOfTen}
            onChange={(e) => setPowerOfTen(parseFloat(e.target.value))}
            /></sup>
          </div>

          <div>
            Radius (m):
            <input
                className={`${styles['user-input']} ${styles['user-input-radius']}`}
              type="number"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
            />
          </div>

          <button className={styles['user-input-btn']} onClick={                
              userData?.app_metadata?.is_premium
                            ? calculateEscapeVelocity
                            : null
                        }>Calculate Escape Velocity</button>
        </div>
        <div className={styles["result-container"]}>
          {escapeVelocity !== null && (
            <>
              <p>Escape Velocity: <strong>{displayedEscapeVelocity.toFixed(2)} {useKm ? "km/s" : "m/s"}</strong></p>

              <div className={styles['checkbox-container']}>
                <input className={styles['input-switch']} type="checkbox" id="useKm" onChange={(e) => setUseKm(e.target.checked)} checked={useKm} />
                <label className={styles['input-switch-label']} htmlFor="useKm"></label>
                <div>Display in km/s</div>
              </div>
            </>
          )}
        </div>
      </div>
      </div>

    
      </>
    }</>);
  };
  
  export default EscapeVelocity;