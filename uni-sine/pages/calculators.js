import React, { useState, useEffect, useRef } from "react"
import styles from '../styles/PremiumPage.module.css'
import contentStyles from '../styles/Content.module.css'
import BuyPremiumModal from "../components/page-construction/PremiumModal";
import Head from "next/head";

// js calculators
import BindingEnergy from '../components/calculators/BindingEnergy'
import ElectricFields from '../components/calculators/ElectricFields'
import EscapeVelocity from '../components/calculators/EscapeVelocity'
import GravitationalForce from '../components/calculators/GravitationalForce'
import GravitationalPotential from '../components/calculators/GravitationalPotential'
import HalfLife from '../components/calculators/HalfLife'
import KeplersThirdLaw from '../components/calculators/KeplersThirdLaw'
import CodeEditor from '../components/calculators/CodeEditor'
import EquationNotepad from "../components/calculators/EquationNotepad";
// p5 calculators
import P5NormalDistribution from '../components/p5-interactions/P5NormalDistribution'
import P5TrigTriangle from '../components/p5-interactions/P5TrigTriangle'
import P5Vectors from '../components/p5-interactions/P5Vectors'
import P5CustomGraph from '../components/p5-interactions/P5CustomGraph'

import LoadingIcon from "../components/page-construction/LoadingIcon"
import SecondaryBanner from '../components/page-construction/SecondaryBanner'
import { useUserContext } from "../contexts/UserContext";

const Backdrop = ({ onClick }) => (
  <div className={contentStyles.backdrop} onClick={onClick}></div>
);
export default function Calculators(){ 

  const { user } = useUserContext();
  
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



  const compCalcs = {
    'Code Editor': <CodeEditor />
  }

  const mathCalcs = {
    'Cubic Graph': <P5CustomGraph {...{onClose: handleCloseCalculator, preset: 'cubic'}} />,
    'Linear Graph': <P5CustomGraph {...{onClose: handleCloseCalculator, preset: 'linear'}} />,
    'Logarithmic Graph': <P5CustomGraph {...{onClose: handleCloseCalculator, preset: 'log'}} />,
    'Quadratic Graph': <P5CustomGraph {...{onClose: handleCloseCalculator, preset: 'quadratic'}} />,
    'Normal Distribution Calculator': <P5NormalDistribution  {...{onClose: handleCloseCalculator, showControls: true, showFunction: true}} />,
    'Trigonometry Calculator': <P5TrigTriangle {...{onClose: handleCloseCalculator, custom: true}}/>,
    'Vectors Calculator': <P5Vectors {...{onClose: handleCloseCalculator}}/>,
    'Custom Graph': <P5CustomGraph {...{onClose: handleCloseCalculator}}/>,
    'Equation Notepad': <EquationNotepad />
  }

  const physicsCalcs = {
    'Binding Energy Calculator': <BindingEnergy {...{onClose: handleCloseCalculator}}/>,
    'Electric Force Calculator': <ElectricFields {...{onClose: handleCloseCalculator}}/>,
    'Escape Velocity Calculator': <EscapeVelocity {...{onClose: handleCloseCalculator}}/>,
    'Gravitational Force Calculator': <GravitationalForce {...{onClose: handleCloseCalculator}}/>,
    'Gravitational Potential Calculator': <GravitationalPotential {...{onClose: handleCloseCalculator}}/>,
    'Keplers Third Law Calculator': <KeplersThirdLaw />,
    'Half Life Calculator': <HalfLife {...{onClose: handleCloseCalculator}}/>,
  }

  const calculatorsMap = {
    ...compCalcs,
    ...mathCalcs,
    ...physicsCalcs
  };

function popularCheck (calculator) {
  return calculator === 'Custom Graph' || calculator === 'Trigonometry Calculator' || calculator === 'Code Editor';
}

function freeCheck(calculator) {
  return calculator === 'Quadratic Graph' || calculator === 'Half Life Calculator';
}
  return (
    <>
    <Head>
    <meta
        name="description"
        content="Graphing Calculators such as quadratic graph calculators, cubic calculators. Physics calculators such as half life calculator and gravitational force calculator. Math calculators such as trigonometry calculator. Also code editor."
      />
    </Head>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          {noPremium && (
            <BuyPremiumModal user={user} showOverlay={true} ref={buyPremiumModalRef} />
          )}
          <div className={styles["content-container"]}>
            <SecondaryBanner
              title="Calculators, graphs and interactions"
              search={true ? searchComponent : <div>Loading</div>}
              subheader={`Variety of tools, calculators and graphs. Premium members only`}
            />
            <div className={styles["content-wrapper"]}>
            <div className={styles["example-info"]}>
              <div>
                <h2>A tool for any problem...</h2>
                <p>
                  Take advantage of our powerful math and graphing tools for generating
                  graphs, equations and general problem solving. 
                </p>
                <p>
                You can also use the <strong>AI chat</strong> at the bottom right for programming help or other difficult problems.
                </p>
              </div>
              <video className={styles['video-preview']} autoPlay loop muted controls={false} preload="auto">
                <source src='/static/home/calculators-preview.webm' type="video/webm" />
              </video>
            </div>
            <div className={styles['calculator-category-container']}>
            <div className={styles['calculator-category']}>
              <h3>Math Calculators</h3>
              <div className={styles["btn-wrapper"]}>
              {Object.keys(mathCalcs)
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
            </div>
            <div className={styles['calculator-category']}>
              <h3>Physics Calculators</h3>
              <div className={styles["btn-wrapper"]}>
              {Object.keys(physicsCalcs)
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
            </div>
            <div className={styles['calculator-category']}>
              <h3>Computer Science Tools</h3>
              <div className={styles["btn-wrapper"]}>
              {Object.keys(compCalcs)
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
            </div>
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
