import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import MathJaxContent from '../page-construction/MathJaxContent';

const KeplersThirdLaw = (props) => {
  const [selectedValue, setSelectedValue] = useState('Time');
  const [radius, setRadius] = useState(null);
  const [radiusPowerOfTen, setRadiusPowerOfTen] = useState(null);
  const [time, setTime] = useState(null);
  const [mass, setMass] = useState(null);
  const [massPowerOfTen, setMassPowerOfTen] = useState(null);
  const [result, setResult] = useState(null);
  const [equation, setEquation] = useState('');
  const [useKm, setUseKm] = useState(false);

  const G = 6.67430e-11;
  const displayedRadius = useKm ? result : result * 1000;

  // 🔹 Dynamically update equation preview
  useEffect(() => {
    let eq = '';

    if (selectedValue === 'Time') {
      eq = `T = \\sqrt{ \\frac{4 \\pi^2 \\times (${radius || 'r'} \\times 10^{${radiusPowerOfTen || 'n'}})^3}{G \\times (${mass || 'M'} \\times 10^{${massPowerOfTen || 'm'}})} }`;
    } else if (selectedValue === 'Radius') {
      eq = `r = \\sqrt[3]{ \\frac{G \\times (${mass || 'M'} \\times 10^{${massPowerOfTen || 'm'}}) \\times (${time || 'T'})^2}{4 \\pi^2} }`;
    }

    setEquation(eq);
  }, [selectedValue, radius, radiusPowerOfTen, mass, massPowerOfTen, time]);

  // 🔹 Calculation logic
  const calculate = () => {
    if (selectedValue === 'Time' && radius && radiusPowerOfTen && mass && massPowerOfTen) {
      const radiusMeters = radius * Math.pow(10, radiusPowerOfTen);
      const massKg = mass * Math.pow(10, massPowerOfTen);
      const timeSquaredSeconds = (4 * Math.PI * Math.PI * Math.pow(radiusMeters, 3)) / (G * massKg);
      setResult(Math.sqrt(timeSquaredSeconds) / (60 * 60 * 24 * 365.25)); // Convert to years
    } 
    else if (selectedValue === 'Radius' && time && mass && massPowerOfTen) {
      const massKg = mass * Math.pow(10, massPowerOfTen);
      const timeSeconds = time * 60 * 60 * 24 * 365.25;
      setResult(Math.cbrt((G * massKg * Math.pow(timeSeconds, 2)) / (4 * Math.PI * Math.PI)) / 1000); // Convert to km
    }
  };

  // 🔹 Reset values when changing radio options
  const selectOption = (e) => {
    setSelectedValue(e.target.value);
    setRadius(null);
    setRadiusPowerOfTen(null);
    setTime(null);
    setMass(null);
    setMassPowerOfTen(null);
    setResult(null);
    setEquation('');
  };

  // 🔹 Handle Enter key to trigger calculation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [calculate]);

  return (
    <div className={styles['container']}>
      <div className={styles['calculator-header']}>
        <h1>Kepler&apos;s Third Law Calculator</h1>
        <button className={styles['close-btn']} onClick={props.onClose}>X</button>
      </div>
      <div className={styles["calculator-content-container"]}>
        <div className={styles["user-inputs-container"]}>
          <div className={styles['option-container']}>
            {["Time", "Radius"].map(option => (
              <React.Fragment key={option}>
                <input
                  type='radio'
                  id={option.toLowerCase()}
                  name="selection"
                  value={option}
                  onChange={selectOption}
                  checked={selectedValue === option}
                />
                <label className={selectedValue === option ? styles['checked-option'] : ''} htmlFor={option.toLowerCase()}>
                  Solve for {option}
                </label>
              </React.Fragment>
            ))}
          </div>

          {/* Input Fields Based on Selection */}
          <div className={styles['calculator-content']}>
            <div className={styles['input-container']}>
            <div>
              <div><strong>Mass (kg):</strong></div>
              <input
                className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                type="number"
                value={mass ?? ''}
                onChange={(e) => setMass(parseFloat(e.target.value) || null)}
                placeholder="Mass"
              />
              <code>x10</code><sup>
                <input
                  className={`${styles['user-input']} ${styles['user-input-exp']}`}
                  type="number"
                  value={massPowerOfTen ?? ''}
                  onChange={(e) => setMassPowerOfTen(parseFloat(e.target.value) || null)}
                  placeholder="Exponent"
                />
              </sup>
            </div>

            {selectedValue === 'Time' && (
              <div>
                <div><strong>Radius (m):</strong></div>
                <input
                  className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                  type="number"
                  value={radius ?? ''}
                  onChange={(e) => setRadius(parseFloat(e.target.value) || null)}
                  placeholder="Radius"
                />
                <code>x10</code><sup>
                  <input
                    className={`${styles['user-input']} ${styles['user-input-exp']}`}
                    type="number"
                    value={radiusPowerOfTen ?? ''}
                    onChange={(e) => setRadiusPowerOfTen(parseFloat(e.target.value) || null)}
                    placeholder="Exponent"
                  />
                </sup>
              </div>
            )}

            {selectedValue === 'Radius' && (
              <div>
                <div><strong>Time (yrs):</strong></div>
                <input
                  className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                  type="number"
                  value={time ?? ''}
                  onChange={(e) => setTime(parseFloat(e.target.value) || null)}
                  placeholder="Time"
                />
              </div>
            )}

            </div>
          </div>

          {/* Dynamic Equation Preview */}
          <div className={styles['equation-preview']}>
            <MathJaxContent content={`$$ ${equation} $$`} />
          </div>

          {/* Single Calculate Button */}
          <button className={styles['user-input-btn']} onClick={calculate}>
            Calculate
          </button>
        </div>

        {/* Results Section */}
        <div className={styles["result-container"]}>
          {result !== null && selectedValue === 'Time' && (
            <>
              <div>Orbital Period:</div>
              <p><strong>{result.toFixed(4)} Years</strong></p>
              <p><strong>{(result * 3.154e+7).toFixed(4)} Seconds</strong></p>
            </>
          )}
          {result !== null && selectedValue === 'Radius' && (
            <>
              <div>Orbital Radius:</div>
              <p><strong>{displayedRadius.toFixed(4)} {useKm ? `km` : 'm'}</strong></p>
              <div className={styles['checkbox-container']}>
                <input className={styles['input-switch']} type="checkbox" id="useKm" onChange={(e) => setUseKm(e.target.checked)} checked={useKm} />
                <label className={styles['input-switch-label']} htmlFor="useKm"></label>
                <div>Display in km</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeplersThirdLaw;
