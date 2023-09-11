import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import LoadingIcon from "../page-construction/LoadingIcon";
import startCheckout from "../page-construction/StartCheckout";
const KeplersThirdLaw = (props) => {

  const [option, setOption] = useState('time');
  const [radius, setRadius] = useState(null);
  const [radiusPowerOfTen, setRadiusPowerOfTen] = useState(null);
  const [time, setTime] = useState(null);
  const [mass, setMass] = useState(null);
  const [massPowerOfTen, setMassPowerOfTen] = useState(null);
  const [result, setResult] = useState(null);
  const [useKm, setUseKm] = useState(false);

  const G = 6.67430e-11;
  const displayedRadius = useKm ? result : result * 1000;

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const calculateTime = () => {
    const radiusMeters = radius * Math.pow(10, radiusPowerOfTen);
    const massKg = mass * Math.pow(10, massPowerOfTen);
    const timeSquaredSeconds = (4 * Math.PI * Math.PI * Math.pow(radiusMeters, 3)) / (G * massKg);
    const timeSeconds = Math.sqrt(timeSquaredSeconds);
    const timeYears = timeSeconds / (60 * 60 * 24 * 365.25);
    setResult(timeYears);
  };
  
  const calculateRadius = () => {
    const massKg = mass * Math.pow(10, massPowerOfTen);
    const timeSeconds = time * 60 * 60 * 24 * 365.25; // Convert time from years to seconds
    const radiusMeters = Math.cbrt(G * massKg * Math.pow(timeSeconds, 2) / (4 * Math.PI * Math.PI));
    const radiusKilometers = radiusMeters / 1000; // Convert radius from meters to kilometers
    setResult(radiusKilometers);
  };


  return (<>
  
    <div className={styles['container']}>
             
      <h1>Kepler&apos;s Third Law Calculator</h1>
      <div className={styles["calculator-content-container"]}>

        <div className={styles["user-inputs-container"]}>

          <div className={styles['option-container']}>
            <div className={option === 'time' ? styles['checked-option'] : ''}>
              <input
                type='radio'
                id='time'
                name="selection"
                value='time'
                onChange={handleOptionChange}
                defaultChecked
              />
              <label htmlFor="time">Solve for Time</label>
            </div>
            <div className={option === 'radius' ? styles['checked-option'] : ''}>
              <input
                type='radio'
                id='radius'
                name="selection"
                value='radius'
                onChange={handleOptionChange}
              />
              <label htmlFor="radius">Solve for Radius</label>
            </div>
          </div>


          <div className={styles['calculator-content']}>
            <div>
            <strong>Mass (kg):</strong>
            <input
              className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
              type="number"
              onChange={(e) => setMass(parseFloat(e.target.value))}
            />
            X 10<sup><input
              className={`${styles['user-input']} ${styles['user-input-exp']}`}
              type="number"
              onChange={(e) => setMassPowerOfTen(parseFloat(e.target.value))}
            /></sup></div>
          {option === 'time' ? (
            <>
            <div>
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
              /></sup> </div>
              
            </div>
            <button className={styles['user-input-btn']} onClick={calculateTime}>Calculate Time</button>

            </>
          ) : (
            <>
            <div >
                <div>
              <strong>Time (yrs):</strong>
              <input
                className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                type="number"
                onChange={(e) => setTime(parseFloat(e.target.value))}
              /></div>
            </div>
            <button className={styles['user-input-btn']} onClick={calculateRadius}>Calculate Radius</button>

            </>
          )}
            
          </div>

        </div>
        <div className={styles["result-container"]}>
          {result !== null && (
            <>
              {option === 'time' ? (
                <div>
                    <p>Orbital Period (Years): <strong>{result} Years</strong></p>
                    <p>Orbital Period (Seconds): <strong>{result*3.154e+7} seconds</strong></p>
                </div>
              ) : (
                <div>
                <p>Orbital Radius: <strong>{displayedRadius} {useKm ? `km` : 'm'}</strong></p>
                <div className={styles['checkbox-container']}>
                <input className={styles['input-switch']} type="checkbox" id="useKm" onChange={(e) => setUseKm(e.target.checked)} checked={useKm} />
                <label className={styles['input-switch-label']} htmlFor="useKm"></label>
                <div>Display in km</div>
              </div>
                </div>
                
              )}
            </>
          )}
        </div>
      </div>
    </div>
  
  </>);
};

export default KeplersThirdLaw;