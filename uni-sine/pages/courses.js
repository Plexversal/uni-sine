import React, { useState, useEffect, useRef } from "react"
import styles from '../styles/PremiumPage.module.css'
import contentStyles from '../styles/Content.module.css'
import BuyPremiumModal from "../components/page-construction/PremiumModal";
import BindingEnergy from '../components/calculators/BindingEnergy'
import { BsFillCaretDownFill, BsFillCaretRightFill, BsCodeSlash, BsTriangleHalf } from 'react-icons/bs'
import { GiBlackHoleBolas, GiNuclearPlant, GiCircuitry, GiSoundWaves } from 'react-icons/gi'
import { LuTriangleRight, LuNetwork } from 'react-icons/lu'
import { TbCone2, TbMathIntegrals, TbMathFunction } from 'react-icons/tb'
import CoursesModal from "../components/courses/CoursesModal";
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
  const [activeDropdown, setActiveDropdown] = useState({})
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


useEffect(() => {
  if (window.MathJax && window.MathJax.typeset) {
    window.MathJax.typeset();
}

});

function searchComponent() {
  return (<div className={contentStyles['search-content-wrapper']}>
      <input placeholder='Search for all courses' className={contentStyles['user-topic-search']} id='user-search-topic' onChange={e => setSearchTerm(e.target.value)} type='text'></input>
  </div>)
}


const modalMap = {
  'Web development': {
    component: <CoursesModal {...{ onClose: handleCloseModal, courseName: 'Web Development' }}  />,
    description: 'More than just the fundamentals of web development... Learn how to think like a web developer.',
    isFree: false,
    isPopular: true,
    icon: <BsCodeSlash size={50}/>,
    list: ['HTML', 'HTML coding practice', 'Further HTML', 'Further HTML coding practice', 'CSS', 'CSS coding practice', 'Further CSS', 'Further CSS coding practice', 'JavaScript', ' JavaScript coding practice', 'Advanced: website hosting', 'Advanced: Databases', 'Advanced: Web stacks', 'Practice Questions', 'Course review'],
    gif: '/static/home/webdev.gif',
    longDescription: 'Learn the fundamentals of web development and explore how web developers use a variety of tools and applications to make web development easier.'
  },
  'Trigonometry': {
    component: <CoursesModal {...{ onClose: handleCloseModal, courseName: 'Trigonometry' }} />,
    description: 'Get the basics of trigonometry to understand the true math behind everyday geometry',
    isFree: false,
    isPopular: false,
    icon: <LuTriangleRight size={50}/>,
    list: ['Basic Trigonometric Functions','Basic Trigonometric Functions Practice','Further Trigonometric Functions','Further Trigonometric Functions Practice','Unit Circle','Trigonometric Identities','Trigonometric Identities Practice','Advanced: Trigonometric Equations','Advanced: Inverse Trigonometric Functions','Practice Questions','Course Review'],
    gif: '/static/home/trig_course.gif',
    longDescription: 'Understand the main aspects of trigonometry and how its used in everyday scenarios, explore how to use basic and advanced trigonometric functions.'
  },
  'Black Hole Formation': {
    component: <CoursesModal {...{ onClose: handleCloseModal, courseName: 'Black Hole Formation' }} />,
    description: 'The most mysterious objects in the universe... brought closer to earth with science.',
    isFree: false,
    isPopular: false,
    icon: <GiBlackHoleBolas size={50}/>,
    list: ['Stellar Evolution', 'Stellar Evolution Practice', 'High Mass Stars',  'High Mass Stars Practice', 'Supernovae and Stellar Collapse', 'Supernovae and Stellar Collapse Practice', 'Event Horizon and Singularities', 'Event Horizon and Singularities Practice', 'Advanced: Hawking Radiation', 'Advanced: Types of Black Holes', 'Practice Questions', 'Course Review'],
    gif: '/static/home/black_hole_course.gif',
    longDescription: 'Learn cutting edge research with how black holes are created from super massive stars and understand famous Einstein equations.'
  },
  'Nuclear Energy': {
    component: <CoursesModal {...{ onClose: handleCloseModal, courseName: 'Nuclear Energy' }} />,
    description: 'See the future of clean energy and the amazing atomic secrets unlocked with nuclear physics.',
    isFree: false,
    isPopular: false,
    icon: <GiNuclearPlant size={50}/>,
    list: ['Basics of Nuclear Physics', 'Further Concepts in Nuclear Physics', 'Nuclear Fission', 'Nuclear Fission Practice', 'Nuclear Fusion','Nuclear Fusion Practice', 'Reactor Designs', 'Reactor Designs Practice', 'Advanced: Radiation and Safety', 'Practice Questions', 'Course Review'],
    gif: '/static/home/nuclear_course.gif',
    longDescription: 'Learn how we use nuclear energy to produce some of the cleanest energy we use and cutting edge research of nuclear fusion.'
  },
  'Local Networks': {
    component: <CoursesModal {...{ onClose: handleCloseModal, courseName: 'Local Networks' }} />,
    description: 'The intricacies of networking brought to a more realistic and fundamental view.',
    isFree: false,
    isPopular: false,
    icon: <LuNetwork size={50}/>,
    list: ['Basics of Networking Protocols', 'Further Networking Protocols', 'Ethernet Technologies', 'Ethernet Technologies Practice', 'IP Addressing and Subnetting', 'IP Addressing and Subnetting Practice', 'Network Devices', 'Network Devices Practice', 'Advanced: VLANs', 'Advanced: Network Security', 'Practice Questions', 'Course Review'],
    gif: '/static/home/network_course.gif',
    longDescription: 'Form the basic understanding of current networking technologies used in local networks which allow computer systems to communicate in almost every business and institution.'
  }
};
const modalMapSoon = {
  'Special relativity': {
    description: 'Learn to think like Einstein did with his miraculous theory of special relativity.',
    icon: <TbCone2 size={50}/>,
  },
  'Electricity': {
    description: 'The modern development of humans that power everybodies lives.',
    icon: <GiCircuitry size={50}/>,
  },
  'Waves and light': {
    description: 'What exactly is light? These are the type of questions that physicists ask all the time.',
    icon: <GiSoundWaves size={50}/>,

  },
  'Fundamental Calculus': {
    description: 'Mathematical techniques from Newtonian times that advance our understanding of our universe.',
    icon: <TbMathIntegrals size={50}/>,
  },
  'Graphing functions': {
    description: 'Graphing made easier, patterns from numbers and functions used in engineering, computer science and more.',
    icon: <TbMathFunction size={50}/>,
  }
};
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
              subheader={`Interactive Guided Courses for specialised learning. Premium members only.`}
            />
            <div className={styles["content-wrapper"]}>
              <div className={styles["example-info"]}>
                <div>
                  <h2>Guaranteed to learn something new...</h2>
                  <p>
                    Our selection of specialised guided courses below will give you knowledge in a fun, interactive and unique way.
                  </p>
                  {/* <p>
                    Don't understand the content? Ask our <strong>AI integration</strong> to explain it better!
                  </p> */}
                </div>
                <img className={styles['description-gif']} src="/static/home/courses.gif" />
              </div>
              <div className={styles["course-container"]}>
                {Object.keys(modalMap)
                  .filter((modalName) =>
                    modalName.toLowerCase().includes(searchTerm.toLowerCase())
                  )

                  .map((modalName, i) => (
                    <div key={i} className={styles['course-option-wrapper']}>
                      <div className={styles['course-option-wrapper-main']}>
                        <div className={styles['course-btn-icon-wrapper']}>
                          <div>
                            {modalMap[modalName].icon}
                          </div>
                          <button
                          className={`${styles["open-course-btn"]}`}
                          onClick={() => handleOpenModal(modalName)}
                        >
                          {modalName}{" "}
                          </button>
                        </div>

                        <div className={styles['course-mini-description-wrapper']}>
                          <p>{modalMap[modalName].description}</p>
                          <div onClick={() => setActiveDropdown(prevState => ({ ...prevState, [modalName]: !prevState[modalName] }))} className={styles['show-more-btn']}>
                            
                            {activeDropdown[modalName] ? <BsFillCaretDownFill /> : <BsFillCaretRightFill/>}
                            <span className={styles['show-more-text']}>Expand more</span>
                          </div>
                        </div>
                      </div>
                      {activeDropdown[modalName] && (
                        <div className={styles['expanded-description']}>
                        <div className={styles['expanded-description-img-wrapper']}>
                          <img src={modalMap[modalName].gif} alt="course-img"></img>
                          <p>{modalMap[modalName].longDescription}</p>
                        </div>
                        <div className={styles['course-content']}>
                          <h2>Course content</h2>
                          <ol className={styles['course-item-list']} type="number">
                            {modalMap[modalName].list.map((l, i) => (
                              <li key={i}>{l}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                      )}
                    </div>
                  ))}
                <div>
                <h1>Coming soon...</h1>
                <p>If you are signed up for premium, you will be notified via email when new courses are available.</p>
                </div>
               {Object.keys(modalMapSoon)
                  .filter((modalName) =>
                    modalName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .sort(
                    (a, b) =>
                      Number(modalMapSoon[b].isFree) - Number(modalMapSoon[a].isFree)
                  )
                  .sort(
                    (a, b) =>
                      Number(modalMapSoon[b].isPopular) -
                      Number(modalMapSoon[a].isPopular)
                  )
                  .map((modalName, i) => (
                    <div key={i} className={`${styles['course-option-wrapper']} ${styles['course-option-wrapper-coming-soon']}`}>
                      <div className={styles['course-option-wrapper-main']}>
                        <div className={styles['course-btn-icon-wrapper']}>
                          <div>
                            {modalMapSoon[modalName].icon}
                          </div>
                          <button
                          className={`${styles["open-course-btn"]} 
                                  ${
                                    modalMapSoon[modalName].isPopular
                                      ? styles["popular-btn"]
                                      : ""
                                  } 
                                  ${
                                    modalMapSoon[modalName].isFree
                                      ? styles["free-btn"]
                                      : ""
                                  }`}
                        >
                          {modalName}{" "}
                          </button>
                        </div>

                        <div className={styles['course-mini-description-wrapper']}>
                          <p>{modalMapSoon[modalName].description}</p>
                        </div>
                      </div>
                    </div>
                  ))}   
              </div>
            
              {openModal && (
                <div
                  className={`${styles["courses-modal"]} ${
                    openModal ? styles.open : ""
                  }`}
                >

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
