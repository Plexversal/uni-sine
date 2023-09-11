import React, { useState, useEffect, useRef } from "react"
import styles from '../styles/PremiumPage.module.css'
import contentStyles from '../styles/Content.module.css'
import BuyPremiumModal from "../components/page-construction/PremiumModal";

// js calculators
import BindingEnergy from '../components/calculators/BindingEnergy'
import ElectricFields from '../components/calculators/ElectricFields'
import EscapeVelocity from '../components/calculators/EscapeVelocity'
import GravitationalForce from '../components/calculators/GravitationalForce'
import GravitationalPotential from '../components/calculators/GravitationalPotential'
import HalfLife from '../components/calculators/HalfLife'
import KeplersThirdLaw from '../components/calculators/KeplersThirdLaw'
// p5 calculators
import P5NormalDistribution from '../components/p5-interactions/P5NormalDistribution'
import P5TrigTriangle from '../components/p5-interactions/P5TrigTriangle'
import P5Vectors from '../components/p5-interactions/P5Vectors'
import P5CustomGraph from '../components/p5-interactions/P5CustomGraph'

import LoadingIcon from "../components/page-construction/LoadingIcon"
import SecondaryBanner from '../components/page-construction/SecondaryBanner'

const Backdrop = ({ onClick }) => (
  <div className={contentStyles.backdrop} onClick={onClick}></div>
);
export default function Calculators({ user }){ 

  const [isLoading, setIsLoading] = useState(true);
  const [noPremium, setNoPremium] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [openCalculator, setOpenCalculator] = useState(null);
  const buyPremiumModalRef = useRef();


  useEffect(() => {
    if ((user && !user.app_metadata?.is_premium) || !user) {
      setNoPremium(true);
      setIsLoading(false)
    } else {
      setNoPremium(false);
      setIsLoading(false)

    }
  })

  useEffect(() => {
    if (noPremium && !isLoading) {
      buyPremiumModalRef.current.openModal();
    }
  }, [noPremium]);

const handleOpenCalculator = (calculatorName) => {
  if (noPremium && calculatorName !== 'Half Life Calculator' && calculatorName !== 'Quadratic Graph') {
    buyPremiumModalRef.current.openModal();
  } else {
    setOpenCalculator(calculatorName);
  }
};

const handleCloseCalculator = () => {
  setOpenCalculator(null);
};

function searchComponent() {
  return (<div className={contentStyles['search-content-wrapper']}>
      <input placeholder='Search for all calculators, graphs and interactions' className={contentStyles['user-topic-search']} id='user-search-topic' onChange={e => setSearchTerm(e.target.value)} type='text'></input>
  </div>)
}

  const calculatorsMap = {
    'Binding Energy Calculator': <BindingEnergy {...{onClose: handleCloseCalculator}}/>,
    'Electric Force Calculator': <ElectricFields {...{onClose: handleCloseCalculator}}/>,
    'Escape Velocity Calculator': <EscapeVelocity {...{onClose: handleCloseCalculator}}/>,
    'Gravitational Force Calculator': <GravitationalForce {...{onClose: handleCloseCalculator}}/>,
    'Gravitational Potential Calculator': <GravitationalPotential {...{onClose: handleCloseCalculator}}/>,
    'Keplers Third Law Calculator': <KeplersThirdLaw />,
    'Half Life Calculator': <HalfLife {...{onClose: handleCloseCalculator}}/>,
    'Cubic Graph': <P5CustomGraph {...{onClose: handleCloseCalculator, preset: 'cubic'}} />,
    'Linear Graph': <P5CustomGraph {...{onClose: handleCloseCalculator, preset: 'linear'}} />,
    'Logarithmic Graph': <P5CustomGraph {...{onClose: handleCloseCalculator, preset: 'log'}} />,
    'Quadratic Graph': <P5CustomGraph {...{onClose: handleCloseCalculator, preset: 'quadratic'}} />,
    'Normal Distribution Calculator': <P5NormalDistribution  {...{onClose: handleCloseCalculator, showControls: true, showFunction: true}} />,
    'Trigonometry Calculator': <P5TrigTriangle {...{onClose: handleCloseCalculator, custom: true}}/>,
    'Vectors Calculator': <P5Vectors {...{onClose: handleCloseCalculator}}/>,
    'Custom Graph': <P5CustomGraph {...{onClose: handleCloseCalculator}}/>,
  };

function popularCheck (calculator) {
  return calculator === 'Custom Graph' || calculator === 'Trigonometry Calculator';
}

function freeCheck(calculator) {
  return calculator === 'Quadratic Graph' || calculator === 'Half Life Calculator';
}
  return (
    <>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          {noPremium && (
            <BuyPremiumModal showOverlay={false} ref={buyPremiumModalRef} />
          )}
          <div className={styles["content-container"]}>
            <SecondaryBanner
              title="Calculators, graphs and interactions"
              search={true ? searchComponent : <div>Loading</div>}
              subheader={`Premium members only`}
            />
            <div className={styles["content-wrapper"]}>
            <div className={styles["example-info"]}>
              <div>
                <h2>A tool for any problem...</h2>
                <p>
                  Take advantage of our powerful math tools for generating
                  graphs, equations and general problem solving
                </p>
                <p>SORT BY CATEGORY</p>
              </div>
              <img src="/static/home/interactive-comps.gif" />
            </div>
            <div className={styles["btn-wrapper"]}>
              {Object.keys(calculatorsMap)
                .filter((calculatorName) =>
                  calculatorName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => Number(freeCheck(b)) - Number(freeCheck(a)))
                .sort(
                  (a, b) => Number(popularCheck(b)) - Number(popularCheck(a))
                )
                .map((calculatorName, i) => (
                  <button
                    key={i}
                    className={`${styles["open-calculator-btn"]} 
                                    ${
                                      popularCheck(calculatorName)
                                        ? styles["popular-btn"]
                                        : ""
                                    } 
                                    ${
                                      freeCheck(calculatorName)
                                        ? styles["free-btn"]
                                        : ""
                                    }`}
                    onClick={() => handleOpenCalculator(calculatorName)}
                  >
                    {calculatorName}
                  </button>
                ))}
            </div>
            {openCalculator && (
              <div
                className={`${styles["calculator-modal"]} ${
                  openCalculator ? styles.open : ""
                }`}
              >
                <button
                  className={styles["close-calculator-btn"]}
                  onClick={handleCloseCalculator}
                >
                  Close
                </button>
                {calculatorsMap[openCalculator]}
              </div>
            )}

            {openCalculator && <Backdrop onClick={handleCloseCalculator} />}
          </div>
          </div>
        </>
      )}
    </>
  );
}
