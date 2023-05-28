import React, { useState, useEffect } from "react"
import styles from '../styles/Calculators.module.css'
// js calculators
import BindingEnergy from '../components/calculators/BindingEnergy'
import ElectricFields from '../components/calculators/ElectricFields'
import EscapeVelocity from '../components/calculators/EscapeVelocity'
import GravitationalForce from '../components/calculators/GravitationalForce'
import GravitationalPotential from '../components/calculators/GravitationalPotential'
import HalfLife from '../components/calculators/HalfLife'
import KeplersThirdLaw from '../components/calculators/KeplersThirdLaw'
// p5 calculators
import P5CubicGraph from '../components/p5-interactions/P5CubicGraph'
import P5LinearGraph from '../components/p5-interactions/P5LinearGraph'
import P5LogsGraph from '../components/p5-interactions/P5LogsGraph'
import P5NormalDistribution from '../components/p5-interactions/P5NormalDistribution'
import P5QuadraticGraph from '../components/p5-interactions/P5QuadraticGraph'
import P5TrigTriangle from '../components/p5-interactions/P5TrigTriangle'
import P5Vectors from '../components/p5-interactions/P5Vectors'

import LoadingIcon from "../components/page-construction/LoadingIcon"
import startCheckout from "../components/page-construction/StartCheckout"
import { useUser, withPageAuthRequired  } from '@auth0/nextjs-auth0/client';

const Backdrop = ({ onClick }) => (
  <div className={styles.backdrop} onClick={onClick}></div>
);
export default withPageAuthRequired( function Calculators(){ 
  const [userData, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  //console.log(userData)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/auth0/auth0-user`);
        const data = await response.json();
        if (!data) {
          throw new Error('Error loading user data');
        }
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []);
    
  const [openCalculator, setOpenCalculator] = useState(null);

  const calculatorsMap = {
    'Binding Energy Calculator': <BindingEnergy />,
    'Electric Force Calculator': <ElectricFields />,
    'Escape Velocity Calculator': <EscapeVelocity />,
    'Gravitational Force Calculator': <GravitationalForce />,
    'Gravitational Potential Calculator': <GravitationalPotential />,
    'Keplers Third Law Calculator': <KeplersThirdLaw />,
    'Half Life Calculator': <HalfLife />,
    'Cubic Graph': <P5CubicGraph {...{showControls: true, showFunction: true, showIntercepts: true, custom: true}}/>,
    'Linear Graph': <P5LinearGraph {...{showControls: true, showFunction: true, showIntercepts: false, a: 0, b: 5, c: -3, custom: true}}/>,
    'Logarithmic Graph': <P5LogsGraph {...{ ln: false, showControls: true, showFunction: true, custom: true}} />,
    'Quadratic Graph': <P5QuadraticGraph  {...{showControls: true, showFunction: true, showIntercepts: true, custom: true}}/>,
    'Normal Distribution Calculator': <P5NormalDistribution  {...{showControls: true, showFunction: true}} />,
    'Trigonometry Calculator': <P5TrigTriangle {...{custom: true}}/>,
    'Vectors Calculator': <P5Vectors />
  };

  const handleOpenCalculator = (calculatorName) => {
    setOpenCalculator(calculatorName);
  };

  const handleCloseCalculator = () => {
    setOpenCalculator(null);
  };

  return ( 
      <>
      {isLoading ? <>
        <LoadingIcon />
      </> : <>
      { userData?.app_metadata?.is_premium ? 
            <div className={styles['content-container']}>
            <h1>Calculators, graphs and interactions</h1>
            <div className={styles['btn-wrapper']}>
              {Object.keys(calculatorsMap).map((calculatorName, i) => (
                <button key={i}
                  className={styles['open-calculator-btn']}
                  onClick={() => handleOpenCalculator(calculatorName)}
                >
                  {calculatorName}
                </button>
              ))}
            </div>
            {openCalculator && (
              <div className={`${styles['calculator-modal']} ${openCalculator ? styles.open : ''}`}>
                {calculatorsMap[openCalculator]}
              </div>
            )}
      
            {openCalculator && <Backdrop onClick={handleCloseCalculator} />}
          </div>
      :               <div className={styles["no-premium-overlay"]}>
      <h1>You need premium to use this feature</h1>
      <button onClick={startCheckout}>Buy Premium</button>
    </div>}
      </>}

      
      </>
  );
})
