import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import MathJaxContent from '../page-construction/MathJaxContent';

const HalfLife = (props) => {
  const [powerOfTen, setPowerOfTen] = useState(1);
  const [initialCount, setInitialCount] = useState(0);
  const [decayTime, setDecayTime] = useState(0);
  const [halfLifeValue, setHalfLifeValue] = useState(null);
  const [lambdaValue, setLambdaValue] = useState(null);
  const [particleCount, setParticleCount] = useState(null);
  const [selectedValue, setSelectedValue] = useState('Lambda');
  const [equation, setEquation] = useState('');

  useEffect(() => {
    let eq = '';

    if (selectedValue === 'Lambda') {
      eq = `\\lambda = \\frac{\\ln(2)}{${halfLifeValue ? (Number(halfLifeValue.toFixed(4)).toString()) : 't_{1/2}'}}`;
    } 
    else if (selectedValue === 'Half Life') {
      eq = `t_{1/2} = \\frac{\\ln(2)}{${lambdaValue ? (Number(lambdaValue?.toFixed(4)).toString()) : '\\lambda'} \\times 10^{${powerOfTen}}}`;
    } 
    else if (selectedValue === 'Particle Count') {
      eq = `N = ${initialCount || 'N_0'} e^{- (${lambdaValue ? (Number(lambdaValue?.toFixed(4)).toString()) : '\\lambda'} \\times 10^{${powerOfTen}} \\times ${decayTime || 'time'})}`;
    }

    setEquation(eq);
  }, [selectedValue, powerOfTen, initialCount, decayTime, halfLifeValue, lambdaValue]);

  const calculate = () => {
    if (selectedValue === 'Lambda' && halfLifeValue) {
      setLambdaValue(Math.LN2 / (halfLifeValue));
    } else if (selectedValue === 'Half Life' && lambdaValue) {
      setHalfLifeValue(Math.LN2 / (lambdaValue * Math.pow(10, powerOfTen)));
    } else if (selectedValue === 'Particle Count' && initialCount && lambdaValue && decayTime) {
      setParticleCount(initialCount * Math.exp(-((lambdaValue * Math.pow(10, powerOfTen)) * decayTime)));
    }
  };

  function selectOption(e) {
    setPowerOfTen(1)
    setInitialCount(0)
    setDecayTime(0)
    setHalfLifeValue(null)
    setLambdaValue(null)
    setParticleCount(null)
    setSelectedValue(e.target.value)
  }

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
        <h1>Half-Life Calculator</h1>
        <button className={styles['close-btn']} onClick={props.onClose}>X</button>
      </div>
      <div className={styles["calculator-content-container"]}>
        <div className={styles["user-inputs-container"]}>
          <div className={styles['option-container']}>
            {["Lambda", "Half Life", "Particle Count"].map(option => (
              <React.Fragment key={option}>
                <input
                  type='radio'
                  id={option.toLowerCase()}
                  name="selection"
                  value={option}
                  onChange={(e) => selectOption(e)}
                  checked={selectedValue === option}
                />
                <label 
                  className={selectedValue === option ? styles['checked-option'] : ''}
                  htmlFor={option.toLowerCase()}
                >
                  {option.replace("Half Life", "Half-Life")}
                </label>
              </React.Fragment>
            ))}
          </div>

          {/* Input Fields Based on Selection */}
          {selectedValue === 'Lambda' && (
            <div className={styles['calculator-content']}>
              <div>
                <strong> Half-Life (yrs):</strong>
                <input
                  className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                  type="number"
                  onChange={(e) => setHalfLifeValue(parseFloat(e.target.value) || 0)}
                  placeholder="years"

                />
              </div>
            </div>
          )}

          {selectedValue === 'Half Life' && (
            <div className={styles['calculator-content']}>
              <div>
                <div><strong> Decay Constant (&lambda;):</strong></div>
                <input
                  className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                  type="number"
                  onChange={(e) => setLambdaValue(parseFloat(e.target.value) || 0)}
                  placeholder="&lambda;"
                />
                <code>x10</code><sup>
                  <input
                    className={`${styles['user-input']} ${styles['user-input-exp']}`}
                    type="number"
                    onChange={(e) => setPowerOfTen(parseFloat(e.target.value) || 1)}
                    placeholder="exponent"
                  />
                </sup>
              </div>
            </div>
          )}

          {selectedValue === 'Particle Count' && (
            <div className={styles['calculator-content']}>
              <div className={styles['input-container']}>
                <div>
                  <div><strong>Initial Particles (N<sub>0</sub>) (g)</strong></div>
                  <input
                    className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                    type="number"
                    onChange={(e) => setInitialCount(parseFloat(e.target.value) || 0)}
                    placeholder={"N\u2080"}
                  />
                </div>

                <div>
                  <div><strong>Decay Constant (&lambda;)</strong></div>
                  <input
                    className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                    type="number"
                    onChange={(e) => setLambdaValue(parseFloat(e.target.value) || 0)}
                    placeholder="&lambda;"
                  />
                  <code>x10</code><sup>
                    <input
                      className={`${styles['user-input']} ${styles['user-input-exp']}`}
                      type="number"
                      onChange={(e) => setPowerOfTen(parseFloat(e.target.value) || 1)}
                      placeholder="exponent"
                    />
                  </sup>
                </div>

                <div>
                  <div><strong>Time (yrs)</strong></div>
                  <input
                    className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                    type="number"
                    onChange={(e) => setDecayTime(parseFloat(e.target.value) || 0)}
                    placeholder="years"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Equation Preview */}
          <div className={styles['equation-preview']}>
            <MathJaxContent content={`$$ ${equation} $$`} />
          </div>

          {/* Single Calculate Button */}
          <button className={styles['user-input-btn']} onClick={()=> calculate()}>
            Calculate
          </button>
        </div>

        {/* Results Section */}
        <div className={styles["result-container"]}>
          {(halfLifeValue !== null && selectedValue === 'Half Life') && (
            <>
            <div>Half-Life:</div>
            <p><strong>{halfLifeValue} yrs</strong></p>
            </>
          )}
          {(lambdaValue !== null && selectedValue === 'Lambda') && (
            <>
            <div>Decay Constant: </div>
            <p><strong>{lambdaValue} yrs<sup>-1</sup></strong></p>
            </>
          )}
          {(particleCount !== null && selectedValue === 'Particle Count') && (
            <>
            <div>Number of Particles Remaining (N): </div>
            <p><strong>{particleCount}</strong></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalfLife;
