import React, { useState, useEffect } from "react";
import styles from "../../styles/Calculators.module.css";
import LoadingIcon from "../page-construction/LoadingIcon";
import startCheckout from "../page-construction/StartCheckout";
const ElectricField = (props) => {
  const [userData, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [noPremium, setNoPremium] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/auth0/auth0-user`);
        const data = await response.json();
        if (!data) {
          throw new Error("Error loading user data");
        }
        setUser(data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const checkPremium = () => {
    setNoPremium(true);
  };
  const [option, setOption] = useState("force");
  const [charge, setCharge] = useState(null);
  const [chargePowerOfTen, setChargePowerOfTen] = useState(null);
  const [chargePowerOfTen2, setChargePowerOfTen2] = useState(null);

  const [distance, setDistance] = useState(null);
  const [distancePowerOfTen, setDistancePowerOfTen] = useState(null);
  const [charge2, setCharge2] = useState(null);
  const [result, setResult] = useState(null);
  const [voltage, setVoltage] = useState(null);

  const k = 8.9875517923e9; // Coulomb's constant

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const calculateForce = () => {
    const q1 = charge * Math.pow(10, chargePowerOfTen);
    const q2 = charge2 * Math.pow(10, chargePowerOfTen2);
    const r = distance * Math.pow(10, distancePowerOfTen);
    const F = (k * q1 * q2) / Math.pow(r, 2);
    setResult(F);
  };

  const calculateRadialField = () => {
    const q = charge * Math.pow(10, chargePowerOfTen);
    const r = distance * Math.pow(10, distancePowerOfTen);
    const E = (k * q) / Math.pow(r, 2);
    setResult(E);
  };

  const calculateUniformField = () => {
    const fieldStrength =
      voltage / (distance * Math.pow(10, distancePowerOfTen));
    setResult(fieldStrength);
  };

  return (
    <>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <div
          onClick={userData?.app_metadata?.is_premium ? null : checkPremium}
          className={styles["container"]}
        >
          {noPremium ? (
            <div className={styles["no-premium-overlay"]}>
              <h1>You need premium to use this feature</h1>
              <button onClick={startCheckout}>Buy Premium</button>
            </div>
          ) : (
            <></>
          )}
          <h1>Electric Field Calculator</h1>
          <div className={styles["calculator-content-container"]}>
            <div className={styles["user-inputs-container"]}>
              <div className={styles["option-container"]}>
                <div
                  className={option === "force" ? styles["checked-option"] : ""}
                >
                  <input
                    type="radio"
                    id="force"
                    name="selection"
                    value="force"
                    onChange={handleOptionChange}
                    defaultChecked
                  />
                  <label htmlFor="force">Force</label>
                </div>
                <div
                  className={
                    option === "radial" ? styles["checked-option"] : ""
                  }
                >
                  <input
                    type="radio"
                    id="radial"
                    name="selection"
                    value="radial"
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="radial">Radial Field</label>
                </div>
                <div
                  className={
                    option === "uniform" ? styles["checked-option"] : ""
                  }
                >
                  <input
                    type="radio"
                    id="uniform"
                    name="selection"
                    value="uniform"
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="uniform">Uniform Field</label>
                </div>
              </div>
              <div className={styles["calculator-content"]}>
                {option === "force" ? (
                  <>
                    <div>
                      <strong>
                        Charge <sub>1</sub> (C):
                      </strong>
                      <input
                        className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                        type="number"
                        onChange={(e) => setCharge(parseFloat(e.target.value))}
                      />
                      X 10
                      <sup>
                        <input
                          className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                          type="number"
                          onChange={(e) =>
                            setChargePowerOfTen(parseFloat(e.target.value))
                          }
                        />
                      </sup>
                    </div>
                    <div>
                      <strong>
                        Charge <sub>2</sub> (C):
                      </strong>
                      <input
                        className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                        type="number"
                        onChange={(e) => setCharge2(parseFloat(e.target.value))}
                      />
                      X 10
                      <sup>
                        <input
                          className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                          type="number"
                          onChange={(e) =>
                            setChargePowerOfTen2(parseFloat(e.target.value))
                          }
                        />
                      </sup>
                    </div>

                    <div>
                      <strong>Distance (m):</strong>
                      <input
                        className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                        type="number"
                        onChange={(e) =>
                          setDistance(parseFloat(e.target.value))
                        }
                      />
                      X 10
                      <sup>
                        <input
                          className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                          type="number"
                          onChange={(e) =>
                            setDistancePowerOfTen(parseFloat(e.target.value))
                          }
                        />
                      </sup>
                    </div>
                    <button
                      className={styles["user-input-btn"]}
                      onClick={
                        userData?.app_metadata?.is_premium
                          ? calculateForce
                          : null
                      }
                    >
                      Calculate Force
                    </button>
                  </>
                ) : (
                  <>
                    {option === "uniform" ? (
                      <>
                        <div>
                          <strong>Voltage (V):</strong>
                          <input
                            className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                            type="number"
                            onChange={(e) =>
                              setVoltage(parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <strong>Distance (m):</strong>
                          <input
                            className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                            type="number"
                            onChange={(e) =>
                              setDistance(parseFloat(e.target.value))
                            }
                          />
                          X 10
                          <sup>
                            <input
                              className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                              type="number"
                              onChange={(e) =>
                                setDistancePowerOfTen(
                                  parseFloat(e.target.value)
                                )
                              }
                            />
                          </sup>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <strong>Distance (m):</strong>
                          <input
                            className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                            type="number"
                            onChange={(e) =>
                              setDistance(parseFloat(e.target.value))
                            }
                          />
                          X 10
                          <sup>
                            <input
                              className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                              type="number"
                              onChange={(e) =>
                                setDistancePowerOfTen(
                                  parseFloat(e.target.value)
                                )
                              }
                            />
                          </sup>
                        </div>
                        <div>
                          <strong>Charge (C):</strong>
                          <input
                            className={`${styles["user-input"]} ${styles["user-input-coefficient"]}`}
                            type="number"
                            onChange={(e) =>
                              setCharge(parseFloat(e.target.value))
                            }
                          />
                          X 10
                          <sup>
                            <input
                              className={`${styles["user-input"]} ${styles["user-input-exp"]}`}
                              type="number"
                              onChange={(e) =>
                                setChargePowerOfTen(parseFloat(e.target.value))
                              }
                            />
                          </sup>
                        </div>
                      </>
                    )}
                    {option === "radial" ? (
                      <button
                        className={styles["user-input-btn"]}
                        onClick={
                          userData?.app_metadata?.is_premium
                            ? calculateRadialField
                            : null
                        }
                      >
                        Calculate Radial Field
                      </button>
                    ) : (
                      <button
                        className={styles["user-input-btn"]}
                        onClick={
                          userData?.app_metadata?.is_premium
                            ? calculateUniformField
                            : null
                        }
                      >
                        Calculate Uniform Field
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className={styles["result-container"]}>
              {result !== null && (
                <>
                  {option === "force" ? (
                    <p>
                      Electric Force: <strong>{result} N</strong>
                    </p>
                  ) : (
                    <p>
                      Electric Field Strength: <strong>{result} N/C</strong>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ElectricField;
