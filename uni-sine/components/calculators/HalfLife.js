import React, { useState, useEffect } from "react";
import styles from '../../styles/Calculators.module.css';
import LoadingIcon from "../page-construction/LoadingIcon";
import startCheckout from "../page-construction/StartCheckout";
const HalfLife = (props) => {
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
          setIsLoading(false);
         return;

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
  const [powerOfTen, setPowerOfTen] = useState("1");


  const [initialCount, setInitialCount] = useState(0)
  const [decayTime, setDecayTime] = useState(0)

  const [halfLifeValue, setHalfLifeValue] = useState(null);
  const [lambdaValue, setLambdaValue] = useState(null)
  const [particleCount, setParticleCount] = useState(null)

  const [showLambda, setUseLambda] = useState(true)
  const [showCount, setUseCount] = useState(false)
  const [showHalfLife, setUseHalfLife] = useState(false)
  const [selectedValue, setSelectedValue] = useState('Lambda');
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    setUseLambda(selectedValue === 'Lambda');
    setUseCount(selectedValue === 'Particle Count');
    setUseHalfLife(selectedValue === 'Half Life');
  }, [selectedValue]);

  const calculateHalfLife = () => {

    setHalfLifeValue((Math.LN2/(lambdaValue*Math.pow(10, powerOfTen))));
  };
  const calculateLambda = () => {

    setLambdaValue((Math.LN2/halfLifeValue));
  };

  const calculateParticleCount = () => {

    setParticleCount((initialCount*Math.pow((Math.E), -((lambdaValue*Math.pow(10, powerOfTen))*decayTime))));
  };
  return (
    <>{
      isLoading ? <LoadingIcon /> : 
      <div onClick={userData?.app_metadata?.is_premium ? null : checkPremium} className={styles['container']}>
         {noPremium ? (
    <div className={styles["no-premium-overlay"]}>
      <h1>You need premium to use this feature</h1>
      <button onClick={startCheckout}>Buy Premium</button>
    </div>
  ) : (
    <></>
  )}
        <h1>Half-Life Calculator</h1>
        <div className={styles["calculator-content-container"]}>
          <div className={styles["user-inputs-container"]}>
          <div className={styles['option-container']}>
          <div className={showLambda ? styles['checked-option'] : ''}>
            <input
              type='radio'
              id='lambda'
              name="selection"
              value='Lambda'
              onChange={handleRadioChange}
              defaultChecked
            />
            <label htmlFor="lambda">Decay Constant</label>
      </div>
      <div className={showHalfLife ? styles['checked-option'] : ''}>
            <input
              type='radio'
              id='halflife'
              name="selection"
              value='Half Life'
              onChange={handleRadioChange}
            />
            <label htmlFor="halflife">Half-Life</label></div>
            <div className={showCount ? styles['checked-option'] : ''}>
            <input
              type='radio'
              id='count'
              name="selection"
              value='Particle Count'
              onChange={handleRadioChange}
            />
            <label htmlFor="count">Particle Count</label></div>
            </div>
  
            
            {showLambda ? <div  className={styles['calculator-content']}>
              <div>
              <strong> Half-Life (yrs):</strong>
              <input
                className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                type="number"
                onChange={(e) => setHalfLifeValue(parseFloat(e.target.value))}
              />
  
              </div>
            <button className={styles['user-input-btn']} onClick={userData?.app_metadata?.is_premium ? calculateLambda : null}>Calculate Decay Constant</button>
  
            </div> : <></>}
            {showHalfLife ? <div  className={styles['calculator-content']}>
              <div>
              <strong> Decay Constant (&lambda;):</strong>
              <input
                className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                type="number"
                onChange={(e) => setLambdaValue(parseFloat(e.target.value))}
                
              />
              X 10<sup><input
              className={`${styles['user-input']} ${styles['user-input-exp']}`}
              type="number"
  
              onChange={(e) => setPowerOfTen(parseFloat(e.target.value))}
              /></sup>
              </div>
            <button className={styles['user-input-btn']} onClick={userData?.app_metadata?.is_premium ? calculateHalfLife : null}>Calculate Half-life</button>
  
            </div>  : <></>}
            {showCount ? <div className={styles['calculator-content']}>
              <div>
              <strong> Initial Particles (N<sub>0</sub>) (g):</strong>
              <input
                className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                type="number"
                onChange={(e) => setInitialCount(parseFloat(e.target.value))}
              /></div>
              <div>
              <strong> Decay Constant (&lambda;):</strong>
              <input
                className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                type="number"
                onChange={(e) => setLambdaValue(parseFloat(e.target.value))}
              />
              X 10<sup><input
              className={`${styles['user-input']} ${styles['user-input-exp']}`}
              type="number"
  
              onChange={(e) => setPowerOfTen(parseFloat(e.target.value))}
              /></sup>
              </div>
              <div>
              <strong> Time (yrs):</strong>
              <input
                className={`${styles['user-input']} ${styles['user-input-coefficient']}`}
                type="number"
                onChange={(e) => setDecayTime(parseFloat(e.target.value))}
              /></div>
            <button className={styles['user-input-btn']} onClick={userData?.app_metadata?.is_premium ? calculateParticleCount : null}>Calculate Particle Count</button>
  
            </div>: <></>}
  
          </div>
          <div className={styles["result-container"]}>
            {(halfLifeValue !== null && showHalfLife) && (
              <>
                <p>Half-Life: <strong>{halfLifeValue.toFixed(2)} yrs</strong></p>
              </>
            )}
            {(lambdaValue !== null && showLambda) && (
              <>
                <p>Decay Constant: <strong>{lambdaValue.toFixed(10)} yrs<sup>-1</sup></strong></p>
              </>
            )}
             {(particleCount !== null && showCount) && (
              <>
                <p>Number of particles remaining (N):<br></br> <strong>{particleCount.toFixed(2)} grams</strong></p>
              </>
            )}
          </div>
        </div>
      </div>
  
    
    }</>
  );
};

export default HalfLife;