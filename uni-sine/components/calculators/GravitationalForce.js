import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import MathJaxContent from '../page-construction/MathJaxContent';

const GravitationalForce = (props) => {
  const [mass, setMass] = useState(null);
  const [massPowerOfTen, setMassPowerOfTen] = useState(null);
  const [mass2, setMass2] = useState(null);
  const [massPowerOfTen2, setMassPowerOfTen2] = useState(null);
  const [radius, setRadius] = useState(null);
  const [radiusPowerOfTen, setRadiusPowerOfTen] = useState(null);
  const [gravitationalForce, setGravitationalForce] = useState(null);
  const [equation, setEquation] = useState('');

  const G = 6.67430e-11; // Gravitational constant

  // 🔹 Dynamically update equation preview
  useEffect(() => {
    let eq = `F = \\frac{G \\times (${mass || 'M_1'} \\times 10^{${massPowerOfTen || 'm'}}) \\times (${mass2 || 'M_2'} \\times 10^{${massPowerOfTen2 || 'p'}})}{(${radius || 'r'} \\times 10^{${radiusPowerOfTen || 'n'}})^2}`;

    setEquation(eq);
  }, [mass, massPowerOfTen, mass2, massPowerOfTen2, radius, radiusPowerOfTen]);

  // 🔹 Calculation logic
  const calculate = () => {
    if (mass && massPowerOfTen && mass2 && massPowerOfTen2 && radius && radiusPowerOfTen) {
      const m1 = mass * Math.pow(10, massPowerOfTen);
      const m2 = mass2 * Math.pow(10, massPowerOfTen2);
      const r = radius * Math.pow(10, radiusPowerOfTen);
      setGravitationalForce((G * m1 * m2) / Math.pow(r, 2));
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

  return (
    <div className={styles['container']}>
      <div className={styles['calculator-header']}>
        <h1>Gravitational Force Calculator</h1>
        <button className={styles['close-btn']} onClick={props.onClose}>X</button>
      </div>
      <div className={styles["calculator-content-container"]}>
        <div className={styles["user-inputs-container"]}>
          <div className={styles['calculator-content']}>
            <div className={styles['input-container']}>
              <div>
                <div><strong>Mass <sub>1</sub> (kg):</strong></div>
                <input
                  className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                  type="number"
                  value={mass ?? ''}
                  onChange={(e) => setMass(parseFloat(e.target.value) || null)}
                  placeholder="Mass 1"
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
                <div><strong>Mass <sub>2</sub> (kg):</strong></div>
                <input
                  className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                  type="number"
                  value={mass2 ?? ''}
                  onChange={(e) => setMass2(parseFloat(e.target.value) || null)}
                  placeholder="Mass 2"
                />
                <code>x10</code><sup>
                  <input
                    className={`${styles['user-input']} ${styles['user-input-exp']}`}
                    type="number"
                    value={massPowerOfTen2 ?? ''}
                    onChange={(e) => setMassPowerOfTen2(parseFloat(e.target.value) || null)}
                    placeholder="Exponent"
                  />
                </sup>
              </div>

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
            </div>
          </div>

          {/* Dynamic Equation Preview */}
          <div className={styles['equation-preview']}>
            <MathJaxContent content={`$$ ${equation} $$`} />
          </div>

          {/* Single Calculate Button */}
          <button className={styles['user-input-btn']} onClick={calculate}>
            Calculate Gravitational Force
          </button>
        </div>

        {/* Results Section */}
        <div className={styles["result-container"]}>
          {gravitationalForce !== null && (
            <>
              <div>Gravitational Force:</div>
              <p><strong>{gravitationalForce.toExponential(5)} Newtons</strong></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GravitationalForce;
