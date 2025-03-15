import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import MathJaxContent from '../page-construction/MathJaxContent';

const EscapeVelocity = (props) => {
  const [mass, setMass] = useState(null);
  const [massPowerOfTen, setMassPowerOfTen] = useState(null);
  const [radius, setRadius] = useState(null);
  const [escapeVelocity, setEscapeVelocity] = useState(null);
  const [equation, setEquation] = useState('');
  const [useKm, setUseKm] = useState(false);

  const G = 6.67430e-11; // Gravitational constant

  // 🔹 Dynamically update equation preview
  useEffect(() => {
    let eq = `v_e = \\sqrt{\\frac{2G \\times (${mass || 'M'} \\times 10^{${massPowerOfTen || 'm'}})}{(${radius || 'r'})}}`;

    setEquation(eq);
  }, [mass, massPowerOfTen, radius]);

  // 🔹 Calculation logic
  const calculate = () => {
    if (mass && massPowerOfTen && radius) {
      const m = mass * Math.pow(10, massPowerOfTen);
      setEscapeVelocity(Math.sqrt((2 * G * m) / radius));
    }
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

  const displayedEscapeVelocity = useKm ? escapeVelocity / 1000 : escapeVelocity;

  return (
    <div className={styles['container']}>
      <div className={styles['calculator-header']}>
        <h1>Escape Velocity Calculator</h1>
        <button className={styles['close-btn']} onClick={props.onClose}>X</button>
      </div>
      <div className={styles["calculator-content-container"]}>
        <div className={styles["user-inputs-container"]}>
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

              <div>
                <div><strong>Radius (m):</strong></div>
                <input
                  className={`${styles['user-input']} ${styles['user-input-radius']}`}
                  type="number"
                  value={radius ?? ''}
                  onChange={(e) => setRadius(parseFloat(e.target.value) || null)}
                  placeholder="Radius"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Equation Preview */}
          <div className={styles['equation-preview']}>
            <MathJaxContent content={`$$ ${equation} $$`} />
          </div>

          {/* Single Calculate Button */}
          <button className={styles['user-input-btn']} onClick={calculate}>
            Calculate Escape Velocity
          </button>
        </div>

        {/* Results Section */}
        <div className={styles["result-container"]}>
          {escapeVelocity !== null && (
            <>
              <div>Escape Velocity:</div>
              <p><strong>{displayedEscapeVelocity.toFixed(2)} {useKm ? "km/s" : "m/s"}</strong></p>

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
  );
};

export default EscapeVelocity;
