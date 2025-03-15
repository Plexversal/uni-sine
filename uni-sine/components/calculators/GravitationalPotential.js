import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import MathJaxContent from '../page-construction/MathJaxContent';

const GravitationalPotential = (props) => {
  const [selectedValue, setSelectedValue] = useState('Potential');
  const [mass, setMass] = useState(null);
  const [massPowerOfTen, setMassPowerOfTen] = useState(null);
  const [mass2, setMass2] = useState(null);
  const [massPowerOfTen2, setMassPowerOfTen2] = useState(null);
  const [radius, setRadius] = useState(null);
  const [radiusPowerOfTen, setRadiusPowerOfTen] = useState(null);
  const [result, setResult] = useState(null);
  const [equation, setEquation] = useState('');

  const G = 6.67430e-11; // Gravitational constant

  // 🔹 Dynamically update equation preview
  useEffect(() => {
    let eq = '';

    if (selectedValue === 'Potential') {
      eq = `V = \\frac{-G \\times (${mass || 'M'} \\times 10^{${massPowerOfTen || 'm'}})}{(${radius || 'r'} \\times 10^{${radiusPowerOfTen || 'n'}})}`;
    } else if (selectedValue === 'Potential Energy') {
      eq = `U = \\frac{-G \\times (${mass || 'M_1'} \\times 10^{${massPowerOfTen || 'm'}}) \\times (${mass2 || 'M_2'} \\times 10^{${massPowerOfTen2 || 'p'}})}{(${radius || 'r'} \\times 10^{${radiusPowerOfTen || 'n'}})}`;
    }

    setEquation(eq);
  }, [selectedValue, mass, massPowerOfTen, mass2, massPowerOfTen2, radius, radiusPowerOfTen]);

  // 🔹 Calculation logic
  const calculate = () => {
    if (selectedValue === 'Potential' && mass && massPowerOfTen && radius && radiusPowerOfTen) {
      const m = mass * Math.pow(10, massPowerOfTen);
      const r = radius * Math.pow(10, radiusPowerOfTen);
      setResult((-G * m) / r);
    } else if (selectedValue === 'Potential Energy' && mass && massPowerOfTen && mass2 && massPowerOfTen2 && radius && radiusPowerOfTen) {
      const m1 = mass * Math.pow(10, massPowerOfTen);
      const m2 = mass2 * Math.pow(10, massPowerOfTen2);
      const r = radius * Math.pow(10, radiusPowerOfTen);
      setResult((-G * m1 * m2) / r);
    }
  };

  // 🔹 Reset values when changing radio options
  const selectOption = (e) => {
    setSelectedValue(e.target.value);
    setMass(null);
    setMassPowerOfTen(null);
    setMass2(null);
    setMassPowerOfTen2(null);
    setRadius(null);
    setRadiusPowerOfTen(null);
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
        <h1>Gravitational Potential Calculator</h1>
        <button className={styles['close-btn']} onClick={props.onClose}>X</button>
      </div>
      <div className={styles["calculator-content-container"]}>
        <div className={styles["user-inputs-container"]}>
          <div className={styles['option-container']}>
            {["Potential", "Potential Energy"].map(option => (
              <React.Fragment key={option}>
                <input
                  type='radio'
                  id={option.toLowerCase().replace(" ", "")}
                  name="selection"
                  value={option}
                  onChange={selectOption}
                  checked={selectedValue === option}
                />
                <label className={selectedValue === option ? styles['checked-option'] : ''} htmlFor={option.toLowerCase().replace(" ", "")}>
                  {option} ({option === 'Potential' ? 'V' : 'U'})
                </label>
              </React.Fragment>
            ))}
          </div>

          {/* Input Fields Based on Selection */}
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

              {selectedValue === 'Potential Energy' && (
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
              )}

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
            Calculate
          </button>
        </div>

        {/* Results Section */}
        <div className={styles["result-container"]}>
          {result !== null && selectedValue === 'Potential' && (
            <>
              <div>Gravitational Potential:</div>
              <p><strong>{result.toExponential(4)} J/kg</strong></p>
            </>
          )}
          {result !== null && selectedValue === 'Potential Energy' && (
            <>
              <div>Gravitational Potential Energy:</div>
              <p><strong>{result.toExponential(4)} J</strong></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GravitationalPotential;
