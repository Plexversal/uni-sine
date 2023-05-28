import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import LoadingIcon from "../page-construction/LoadingIcon";
import startCheckout from "../page-construction/StartCheckout";
const GravitationalPotential = (props) => {
    
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

    const [option, setOption] = useState('potential');
    const [mass, setMass] = useState(null);
    const [massPowerOfTen, setMassPowerOfTen] = useState(null);
    const [mass2, setMass2] = useState(null);
    const [massPowerOfTen2, setMassPowerOfTen2] = useState(null);
    const [radius, setRadius] = useState(null);
    const [radiusPowerOfTen, setRadiusPowerOfTen] = useState(null);

    const [result, setResult] = useState(null);

    const G = 6.67430e-11; // Gravitational constant

    const handleOptionChange = (e) => {
        setOption(e.target.value);
    };

    const calculatePotential = () => {
        const m = mass * Math.pow(10, massPowerOfTen);
        const r = radius * Math.pow(10, radiusPowerOfTen);
        const V = (-G * m) / r;
        setResult(V);
    };

    const calculatePotentialEnergy = () => {
        const m1 = mass * Math.pow(10, massPowerOfTen);
        const m2 = mass2 * Math.pow(10, massPowerOfTen2);
        const r = radius * Math.pow(10, radiusPowerOfTen);
        const U = (-G * m1 * m2) / r;
        setResult(U);
    };

    return (
            <>{
                isLoading ? <LoadingIcon /> : 
                <div onClick={userData?.app_metadata?.is_premium ? null : checkPremium} className={styles['container']}>
                {noPremium ? (
  <div className={styles["no-premium-overlay"]}>
    <h1>You need premium to use this feature</h1>
    <button onClick={startCheckout}>Buy Premium</button>
  </div>
) : (
  <></>
)}
  <h1>Gravitational Potential Calculator</h1>
  <div className={styles["calculator-content-container"]}>
      <div className={styles["user-inputs-container"]}>
          <div className={styles['option-container']}>
              <div className={option === 'potential' ? styles['checked-option'] : ''}>
                  <input
                      type='radio'
                      id='potential'
                      name="selection"
                      value='potential'
                      onChange={handleOptionChange}
                      defaultChecked
                  />
                  <label htmlFor="potential">Potential (V)</label>
              </div>
              <div className={option === 'potentialEnergy' ? styles['checked-option'] : ''}>
                  <input
                      type='radio'
                      id='potentialEnergy'
                      name="selection"
                      value='potentialEnergy'
                      onChange={handleOptionChange}
                  />
                  <label htmlFor="potentialEnergy">Potential Energy (U)</label>
              </div>
          </div>
          <div className={styles['calculator-content']}>
              <div>
                  <strong>Mass <sub>1</sub> (kg):</strong>
                  <input
                      className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                      type="number"
                      onChange={(e) => setMass(parseFloat(e.target.value))}
                  />
                  X 10<sup><input
                      className={`${styles['user-input']} ${styles['user-input-exp']}`}
                      type="number"
                      onChange={(e) => setMassPowerOfTen(parseFloat(e.target.value))}
                  /></sup>
              </div>
              {option === 'potentialEnergy' && (
                  <div>
                      <strong>Mass <sub>2</sub> (kg):</strong>
                      <input
                          className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                          type="number"
                          onChange={(e) => setMass2(parseFloat(e.target.value))}
                          />
                          X 10<sup><input
                              className={`${styles['user-input']} ${styles['user-input-exp']}`}
                              type="number"
                              onChange={(e) => setMassPowerOfTen2(parseFloat(e.target.value))}
                          /></sup>
                      </div>
                  )}
                  <div>
                      <strong>Radius (m):</strong>
                      <input
                          className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                          type="number"
                          onChange={(e) => setRadius(parseFloat(e.target.value))}
                      />
                      X 10<sup><input
                          className={`${styles['user-input']} ${styles['user-input-exp']}`}
                          type="number"
                          onChange={(e) => setRadiusPowerOfTen(parseFloat(e.target.value))}
                      /></sup>
                  </div>
                  {option === 'potential' ? (
                      <button className={styles['user-input-btn']} onClick={userData?.app_metadata?.is_premium ? calculatePotential : null}>Calculate Potential</button>
                  ) : (
                      <button className={styles['user-input-btn']} onClick={userData?.app_metadata?.is_premium ? calculatePotentialEnergy : null }>Calculate Potential Energy</button>
                  )}
              </div>
          </div>
          <div className={styles["result-container"]}>
              {result !== null && (
                  <>
                      {option === 'potential' ? (
                          <p>Gravitational Potential: <strong>{result} J/kg</strong></p>
                      ) : (
                          <p>Gravitational Potential Energy: <strong>{result} J</strong></p>
                      )}
                  </>
              )}
          </div>
      </div>
  </div>
            }</>
        );
    };
    
    export default GravitationalPotential;
    