import React, { useState, useEffect } from "react";
import styles from "../../styles/Calculators.module.css";
const BindingEnergy = (props) => {


  const [powerOfTen, setPowerOfTen] = useState(null);
  const [speedOfLight, setSpeedOfLight] = useState("299792458");
  const [massDefect, setMassDefect] = useState(null);
  const [mass, setMass] = useState(null);
  const [mev, setMev] = useState(null);
  const [joules, setJoules] = useState(null);
  const [showMev, setShowMev] = useState(true);
  const [showJoules, setShowJoules] = useState(false);
  const [selectedValue, setSelectedValue] = useState("MeV");
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const calculateBindingEnergyMev = () => {
    setMev(massDefect * 931.5);
  };

  const calculateBindingEnergyJoules = () => {
    setJoules(mass * Math.pow(10, powerOfTen) * Math.pow(speedOfLight, 2));
  };

  useEffect(() => {
    setShowJoules(selectedValue == "Joules");
    setShowMev(selectedValue == "MeV");
  }, [selectedValue]);

  return (
    <>

          <div
            className={styles["container"]}
          >
            <h1>Binding Energy Calculator</h1>
            <div
              className={`${styles["calculator-content-container"]}`}
            >
              <div className={styles["user-inputs-container"]}>
                <div className={styles["option-container"]}>
                  <div className={showMev ? styles["checked-option"] : ""}>
                    <input
                      type="radio"
                      id="mev"
                      name="selection"
                      value="MeV"
                      onChange={handleRadioChange}
                      defaultChecked
                    />
                    <label htmlFor="mev">Mass defect</label>
                  </div>
                  <div className={showJoules ? styles["checked-option"] : ""}>
                    <input
                      type="radio"
                      id="joules"
                      name="selection"
                      value="Joules"
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="joules">Mass</label>
                  </div>
                </div>
                {showMev ? (
                  <div className={styles["calculator-content"]}>
                    <div>
                      <strong>Mass Defect (amu):</strong>
                      <input
                        className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                        type="number"
                        onChange={(e) =>
                          setMassDefect(parseFloat(e.target.value))
                        }
                      />
                    </div>
                    <button
                      className={styles["user-input-btn"]}
                      onClick={calculateBindingEnergyMev}
                    >
                      Calculate Binding Energy
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {showJoules ? (
                  <div className={styles["calculator-content"]}>
                    <div>
                      <strong> Mass (kg):</strong>
                      <input
                        className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                        type="number"
                        onChange={(e) => setMass(parseFloat(e.target.value))}
                      />
                      X 10
                      <sup>
                        <input
                          className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                          type="number"
                          onChange={(e) =>
                            setPowerOfTen(parseFloat(e.target.value))
                          }
                        />
                      </sup>
                    </div>
                    <button
                      className={styles["user-input-btn"]}
                      onClick={
                        calculateBindingEnergyJoules
                      }
                    >
                      Calculate Binding Energy
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles["result-container"]}>
                {mev !== null && showMev && (
                  <>
                    <p>
                      Binding Energy (MeV): <strong>{mev} MeV</strong>
                    </p>
                    <p>
                      Binding Energy (Joules):{" "}
                      <strong>{mev / 6.242e12} J</strong>
                    </p>
                  </>
                )}
                {joules !== null && showJoules && (
                  <>
                    <p>
                      Binding Energy (MeV):{" "}
                      <strong>{joules * 6.242e12} MeV</strong>
                    </p>
                    <p>
                      Binding Energy (Joules): <strong>{joules} J</strong>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
  );
};

export default BindingEnergy;
