import React, { useState, useEffect } from "react";
import styles from "../../styles/Calculators.module.css";
import MathJaxContent from "../page-construction/MathJaxContent";

const BindingEnergy = (props) => {
  const [selectedValue, setSelectedValue] = useState("MeV");
  const [massDefect, setMassDefect] = useState(null);
  const [mass, setMass] = useState(null);
  const [massPowerOfTen, setMassPowerOfTen] = useState(null);
  const [bindingEnergyMeV, setBindingEnergyMeV] = useState(null);
  const [bindingEnergyJoules, setBindingEnergyJoules] = useState(null);
  const [equation, setEquation] = useState("");

  const speedOfLight = 299792458; // Speed of light in m/s

  // 🔹 Dynamically update equation preview
  useEffect(() => {
    let eq = "";

    if (selectedValue === "MeV") {
      eq = `E = (${massDefect || 'm_d'}) \\times 931.5`;
    } else if (selectedValue === "Joules") {
      eq = `E = (${mass || 'm'} \\times 10^{${massPowerOfTen || 'n'}}) \\times c^2`;
    }

    setEquation(eq);
  }, [selectedValue, massDefect, mass, massPowerOfTen]);

  // 🔹 Calculation logic
  const calculate = () => {
    if (selectedValue === "MeV" && massDefect) {
      setBindingEnergyMeV(massDefect * 931.5);
      setBindingEnergyJoules((massDefect * 931.5) / 6.242e12);
    } else if (selectedValue === "Joules" && mass && massPowerOfTen) {
      const m = mass * Math.pow(10, massPowerOfTen);
      const energyJ = m * Math.pow(speedOfLight, 2);
      setBindingEnergyJoules(energyJ);
      setBindingEnergyMeV(energyJ * 6.242e12);
    }
  };

  // 🔹 Reset values when changing radio options
  const selectOption = (e) => {
    setSelectedValue(e.target.value);
    setMassDefect(null);
    setMass(null);
    setMassPowerOfTen(null);
    setBindingEnergyMeV(null);
    setBindingEnergyJoules(null);
    setEquation("");
  };

  // 🔹 Handle Enter key to trigger calculation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        calculate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [calculate]);

  return (
    <div className={styles["container"]}>
      <div className={styles["calculator-header"]}>
        <h1>Binding Energy Calculator</h1>
        <button className={styles["close-btn"]} onClick={props.onClose}>X</button>
      </div>
      <div className={styles["calculator-content-container"]}>
        <div className={styles["user-inputs-container"]}>
          <div className={styles["option-container"]}>
            {["MeV", "Joules"].map(option => (
              <React.Fragment key={option}>
                <input
                  type="radio"
                  id={option.toLowerCase()}
                  name="selection"
                  value={option}
                  onChange={selectOption}
                  checked={selectedValue === option}
                />
                <label className={selectedValue === option ? styles["checked-option"] : ""} htmlFor={option.toLowerCase()}>
                  {option}
                </label>
              </React.Fragment>
            ))}
          </div>

          {/* Input Fields Based on Selection */}
          <div className={styles["calculator-content"]}>
            <div className={styles["input-container"]}>
              {selectedValue === "MeV" && (
                <div>
                  <div><strong>Mass Defect (amu):</strong></div>
                  <input className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`} type="number"
                    onChange={(e) => setMassDefect(parseFloat(e.target.value) || null)} placeholder="Mass Defect" />
                </div>
              )}

              {selectedValue === "Joules" && (
                <div>
                  <div><strong>Mass (kg):</strong></div>
                  <input className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`} type="number"
                    onChange={(e) => setMass(parseFloat(e.target.value) || null)} placeholder="Mass" />
                  <code>x10</code><sup>
                    <input className={`${styles["user-input"]} ${styles["user-input-exp"]}`} type="number"
                      onChange={(e) => setMassPowerOfTen(parseFloat(e.target.value) || null)} placeholder="Exponent" />
                  </sup>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Equation Preview */}
          <div className={styles["equation-preview"]}>
            <MathJaxContent content={`$$ ${equation} $$`} />
          </div>

          {/* Single Calculate Button */}
          <button className={styles["user-input-btn"]} onClick={calculate}>
            Calculate Binding Energy
          </button>
        </div>

        {/* Results Section */}
        <div className={styles["result-container"]}>
          {bindingEnergyMeV !== null && (
            <>
              <div>Binding Energy:</div>
              <p><strong>{bindingEnergyMeV.toExponential(5)} MeV</strong></p>
              <p><strong>{bindingEnergyJoules.toExponential(5)} J</strong></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BindingEnergy;
