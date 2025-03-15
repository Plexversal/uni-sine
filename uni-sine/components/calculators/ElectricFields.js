import React, { useState, useEffect } from "react";
import styles from "../../styles/Calculators.module.css";
import MathJaxContent from "../page-construction/MathJaxContent";

const ElectricField = (props) => {
  const [selectedValue, setSelectedValue] = useState("Force");
  const [charge1, setCharge1] = useState(null);
  const [chargePower1, setChargePower1] = useState(null);
  const [charge2, setCharge2] = useState(null);
  const [chargePower2, setChargePower2] = useState(null);
  const [distance, setDistance] = useState(null);
  const [distancePower, setDistancePower] = useState(null);
  const [voltage, setVoltage] = useState(null);
  const [result, setResult] = useState(null);
  const [equation, setEquation] = useState("");

  const k = 8.9875517923e9;

  useEffect(() => {
    let eq = "";

    if (selectedValue === "Force") {
      eq = `F = \\frac{k \\times (${charge1 || 'Q_1'} \\times 10^{${chargePower1 || 'a'}}) \\times (${charge2 || 'Q_2'} \\times 10^{${chargePower2 || 'b'}})}{(${distance || 'r'} \\times 10^{${distancePower || 'c'}})^2}`;
    } else if (selectedValue === "Radial Field") {
      eq = `E = \\frac{k \\times (${charge1 || 'Q'} \\times 10^{${chargePower1 || 'a'}})}{(${distance || 'r'} \\times 10^{${distancePower || 'b'}})^2}`;
    } else if (selectedValue === "Uniform Field") {
      eq = `E = \\frac{${voltage || 'V'}}{(${distance || 'd'} \\times 10^{${distancePower || 'a'}})}`;
    }

    setEquation(eq);
  }, [selectedValue, charge1, chargePower1, charge2, chargePower2, distance, distancePower, voltage]);

  const calculate = () => {
    if (selectedValue === "Force" && charge1 && chargePower1 && charge2 && chargePower2 && distance && distancePower) {
      const q1 = charge1 * Math.pow(10, chargePower1);
      const q2 = charge2 * Math.pow(10, chargePower2);
      const r = distance * Math.pow(10, distancePower);
      setResult((k * q1 * q2) / Math.pow(r, 2));
    } else if (selectedValue === "Radial Field" && charge1 && chargePower1 && distance && distancePower) {
      const q = charge1 * Math.pow(10, chargePower1);
      const r = distance * Math.pow(10, distancePower);
      setResult((k * q) / Math.pow(r, 2));
    } else if (selectedValue === "Uniform Field" && voltage && distance && distancePower) {
      const d = distance * Math.pow(10, distancePower);
      setResult(voltage / d);
    }
  };

  const selectOption = (e) => {
    setSelectedValue(e.target.value);
    setCharge1(null);
    setChargePower1(null);
    setCharge2(null);
    setChargePower2(null);
    setDistance(null);
    setDistancePower(null);
    setVoltage(null);
    setResult(null);
    setEquation("");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        calculate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calculate]);

  return (
    <div className={styles["container"]}>
      <div className={styles["calculator-header"]}>
        <h1>Electric Field Calculator</h1>
        <button className={styles["close-btn"]} onClick={props.onClose}>X</button>
      </div>

      <div className={styles["calculator-content-container"]}>
        <div className={styles["user-inputs-container"]}>
          <div className={styles["option-container"]}>
            {["Force", "Radial Field", "Uniform Field"].map((option) => (
              <React.Fragment key={option}>
                <input
                  type="radio"
                  id={option}
                  name="selection"
                  value={option}
                  onChange={selectOption}
                  checked={selectedValue === option}
                />
                <label
                  className={selectedValue === option ? styles["checked-option"] : ""}
                  htmlFor={option}
                >
                  {option}
                </label>
              </React.Fragment>
            ))}
          </div>

          <div className={styles["calculator-content"]}>
            <div className={styles["input-container"]}>
              {(selectedValue === "Force" || selectedValue === "Radial Field") && (
                <>
                  <div>
                    <div><strong>Charge {selectedValue === "Force" ? <sub>1</sub> : ""} (C):</strong></div>
                    <input
                      className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                      type="number"
                      onChange={(e) => setCharge1(parseFloat(e.target.value) || null)}
                      placeholder="Charge"
                      value={charge1 ?? ''}
                    />
                    <code>x10</code><sup>
                      <input
                        className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                        type="number"
                        onChange={(e) => setChargePower1(parseFloat(e.target.value) || null)}
                        placeholder="Exponent"
                        value={chargePower1 ?? ''}
                      />
                    </sup>
                  </div>
                </>
              )}

              {selectedValue === "Force" && (
                <div>
                  <div><strong>Charge <sub>2</sub> (C):</strong></div>
                  <input
                    className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                    type="number"
                    onChange={(e) => setCharge2(parseFloat(e.target.value) || null)}
                    placeholder="Charge"
                    value={charge2 ?? ''}
                  />
                  <code>x10</code><sup>
                    <input
                      className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                      type="number"
                      onChange={(e) => setChargePower2(parseFloat(e.target.value) || null)}
                      placeholder="Exponent"
                      value={chargePower2 ?? ''}
                    />
                  </sup>
                </div>
              )}

              {selectedValue !== "Uniform Field" && (
                <div>
                  <div><strong>Distance (m):</strong></div>
                  <input
                    className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                    type="number"
                    onChange={(e) => setDistance(parseFloat(e.target.value) || null)}
                    placeholder="Distance"
                    value={distance ?? ''}
                  />
                  <code>x10</code><sup>
                    <input
                      className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                      type="number"
                      onChange={(e) => setDistancePower(parseFloat(e.target.value) || null)}
                      placeholder="Exponent"
                      value={distancePower ?? ''}
                    />
                  </sup>
                </div>
              )}

              {selectedValue === "Uniform Field" && (
                <>
                  <div>
                    <div><strong>Voltage (V):</strong></div>
                    <input
                      className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                      type="number"
                      onChange={(e) => setVoltage(parseFloat(e.target.value) || null)}
                      placeholder="Voltage"
                      value={voltage ?? ''}
                    />
                  </div>
                  <div>
                    <div><strong>Distance (m):</strong></div>
                    <input
                      className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                      type="number"
                      onChange={(e) => setDistance(parseFloat(e.target.value) || null)}
                      placeholder="Distance"
                      value={distance ?? ''}
                    />
                    <code>x10</code><sup>
                      <input
                        className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                        type="number"
                        onChange={(e) => setDistancePower(parseFloat(e.target.value) || null)}
                        placeholder="Exponent"
                        value={distancePower ?? ''}
                      />
                    </sup>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles["equation-preview"]}>
            <MathJaxContent content={`$$ ${equation} $$`} />
          </div>

          <button className={styles["user-input-btn"]} onClick={calculate}>
            Calculate {selectedValue}
          </button>
        </div>

        <div className={styles["result-container"]}>
          {result !== null && (
            <p><strong>{result.toExponential(5)} {selectedValue === "Force" ? "N" : "N/C"}</strong></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectricField;
