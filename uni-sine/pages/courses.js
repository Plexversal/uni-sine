import React, { useState, useEffect, useRef } from "react"
import styles from '../styles/PremiumPage.module.css'
import contentStyles from '../styles/Content.module.css'
import BuyPremiumModal from "../components/page-construction/PremiumModal";
import BindingEnergy from '../components/calculators/BindingEnergy'

import LoadingIcon from "../components/page-construction/LoadingIcon"
import SecondaryBanner from '../components/page-construction/SecondaryBanner'

const Backdrop = ({ onClick }) => (
  <div className={contentStyles.backdrop} onClick={onClick}></div>
);
export default function Courses({ user }){ 

  const [isLoading, setIsLoading] = useState(true);
  const [noPremium, setNoPremium] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [openModal, setOpenModal] = useState(null);
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

const handleOpenModal = (modalType) => {
  if (noPremium) {
    buyPremiumModalRef.current.openModal();
  } else {
    setOpenModal(modalType);
  }
};

const handleCloseModal = () => {
  setOpenModal(null);
};

function searchComponent() {
  return (<div className={contentStyles['search-content-wrapper']}>
      <input placeholder='Search for all courses' className={contentStyles['user-topic-search']} id='user-search-topic' onChange={e => setSearchTerm(e.target.value)} type='text'></input>
  </div>)
}


const modalMap = {
  'Binding Energy Calculator': {
    component: <BindingEnergy {...{ onClose: handleCloseModal }} />,
    description: 'This is the Binding Energy Calculator',
    isFree: true,
    isPopular: false
  }
  // ... other modal entries
};


function popularCheck (modal) {
  return modal === 'Custom Graph' || modal === 'Trigonometry Calculator';
}

function freeCheck(modal) {
  return modal === 'Quadratic Graph' || modal === 'Half Life Calculator';
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
              title="Interactive Courses"
              search={true ? searchComponent : <div>Loading</div>}
              subheader={`Premium members only`}
            />
            <div className={styles['content-wrapper']}>
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
              {Object.keys(modalMap)
                .filter((modalName) =>
                  modalName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => Number(modalMap[b].isFree) - Number(modalMap[a].isFree))
                .sort((a, b) => Number(modalMap[b].isPopular) - Number(modalMap[a].isPopular))
                .map((modalName, i) => (
                    <div 
                    key={i}
                    >
                                        <button
                    className={`${styles["open-calculator-btn"]} 
                                ${modalMap[modalName].isPopular ? styles["popular-btn"] : ""} 
                                ${modalMap[modalName].isFree ? styles["free-btn"] : ""}`}
                    onClick={() => handleOpenModal(modalName)}
                  >
                    {modalName} {/* You can also display modalMap[modalName].description if you want */}
                  </button>
                  <p>{modalMap[modalName].description}</p>
                    </div>
                ))}
                </div>

            {openModal && (
              <div
                className={`${styles["calculator-modal"]} ${
                  openModal ? styles.open : ""
                }`}
              >
                <button
                  className={styles["close-calculator-btn"]}
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                {modalMap[openModal].component}
              </div>
            )}
            
            {openModal && <Backdrop onClick={handleCloseModal} />}
            </div>
          </div>
        </>
      )}
    </>
  );
}
