import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';

const GravitationalForce = (props) => {




    const [massCoefficient, setMassCoefficient] = useState("5.9722");
    const [powerOfTen, setPowerOfTen] = useState("24");

    const [massCoefficient1, setMassCoefficient1] = useState("5.9722");
    const [powerOfTen1, setPowerOfTen1] = useState("24");
    const [powerOfTen2, setPowerOfTen2] = useState("24");

    const [radius, setRadius] = useState("6371000");
    const [gravitationalConstant, setGravitationalConstant] = useState("6.67430e-11");
    const [gravitationalForce, setGravitationalForce] = useState(null);
  
    const calculateGravitationalForce = () => {
      const mass = massCoefficient * Math.pow(10, powerOfTen);
      const mass1 = massCoefficient1 * Math.pow(10, powerOfTen1);

      const force = (gravitationalConstant * mass * mass1)/(Math.pow(radius * Math.pow(10, powerOfTen2), 2))

      setGravitationalForce(force);
    };
  
    return (
      <>
      <div className={styles['container']}>
             
      <h1>Gravitational Force Calculator</h1>
    <div className={styles["calculator-content-container"]}>
      <div className={styles["user-inputs-container"]}>
      <div className={styles['calculator-content']}>
        <div>
          Mass (kg):
          <input
          className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
            type="number"

            onChange={(e) => setMassCoefficient(parseFloat(e.target.value))}
          />
        X 10<sup><input
          className={`${styles['user-input']} ${styles['user-input-exp']}`}
          type="number"

          onChange={(e) => setPowerOfTen(parseFloat(e.target.value))}
          /></sup>
        </div>
        <div>
          Mass (kg):
          <input
          className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
            type="number"

            onChange={(e) => setMassCoefficient1(parseFloat(e.target.value))}
          />
        X 10<sup><input
          className={`${styles['user-input']} ${styles['user-input-exp']}`}
          type="number"

          onChange={(e) => setPowerOfTen1(parseFloat(e.target.value))}
          /></sup>
        </div>
        <div>
          Radius (m):
          <input
          className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
            type="number"

            onChange={(e) => setRadius(parseFloat(e.target.value))}
          />
        X 10<sup><input
          className={`${styles['user-input']} ${styles['user-input-exp']}`}
          type="number"

          onChange={(e) => setPowerOfTen2(parseFloat(e.target.value))}
          /></sup>
        </div>
        <button className={styles['user-input-btn']} onClick={calculateGravitationalForce}>Calculate Gravitational Force</button>

      </div>
      </div>
      <div className={styles["result-container"]}>
        {gravitationalForce !== null && (
          <>
            <p>Gravitational Force: <strong>{gravitationalForce.toFixed(5)} Newtons</strong></p>
          </>
        )}
      </div>
    </div>
    </div>
</>
    );
  };
  
  export default GravitationalForce;