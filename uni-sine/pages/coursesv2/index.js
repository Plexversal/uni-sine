import React, { useState, useEffect, useRef } from "react";
import stylesMain from "../../styles/PremiumPage.module.css";
import styles from "../../styles/CoursesMain.module.css";
import contentStyles from "../../styles/Content.module.css";
import BuyPremiumModal from "../../components/page-construction/PremiumModal";
import Link from "next/link";
import BindingEnergy from "../../components/calculators/BindingEnergy";
import Head from "next/head";
import {
  BsFillCaretDownFill,
  BsFillCaretRightFill,
  BsCodeSlash,
  BsTriangleHalf,
} from "react-icons/bs";
import {
  GiBlackHoleBolas,
  GiNuclearPlant,
  GiCircuitry,
  GiSoundWaves,
} from "react-icons/gi";
import { LuTriangleRight, LuNetwork } from "react-icons/lu";
import { TbCone2, TbMathIntegrals, TbMathFunction } from "react-icons/tb";
import CoursesModal from "../../components/courses/CoursesModal";
import LoadingIcon from "../../components/page-construction/LoadingIcon";
import SecondaryBanner from "../../components/page-construction/SecondaryBanner";
import { useUserContext } from "../../contexts/UserContext";
const Backdrop = ({ onClick }) => (
  <div className={contentStyles.backdrop} onClick={onClick}></div>
);
export default function Courses() {
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState(true);
  const [noPremium, setNoPremium] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState({});
  const buyPremiumModalRef = useRef();

  useEffect(() => {
    if ((user && !user.app_metadata?.is_premium) || !user) {
      setNoPremium(true);
      setIsLoading(false);
    } else {
      setNoPremium(false);
      setIsLoading(false);
    }
  });

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
    return (
      <div className={contentStyles["search-content-wrapper"]}>
        <input
          placeholder="Search for all courses"
          className={contentStyles["user-topic-search"]}
          id="user-search-topic"
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
        ></input>
      </div>
    );
  }


  return (
    <>
      <Head>
        <meta
          name="description"
          content="Web development course, trigonometry course, nuclear energy course, local networks course and a lot more."
        />
      </Head>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          {noPremium && (
            <BuyPremiumModal user={user} showOverlay={true}  ref={buyPremiumModalRef} />
          )}
          <div className={stylesMain["content-container"]}>
            <SecondaryBanner
              title="Interactive Courses"
              search={true ? searchComponent : <div>Loading</div>}
              subheader={`Interactive Guided Courses for specialised learning. Premium members only.`}
            />
            <div className={stylesMain["content-wrapper"]}>
              <div className={stylesMain["example-info"]}>
                <div>
                  <h2>Guaranteed to learn something new...</h2>
                  <p>
                    Our selection of specialised guided courses below will give
                    you knowledge in a fun, interactive and unique way.
                  </p>
                  <p>
                    Don&apos;t understand the content? Ask our{" "}
                    <strong>AI integration</strong> to explain it better!
                    (bottom right)
                  </p>
                </div>
                <video className={stylesMain['video-preview']} playsInline autoPlay loop muted controls={false} preload="auto">
                  <source src='/static/home/courses-preview.webm' type="video/webm" />
                  <source src='/static/home/courses-preview.mp4' type="video/mp4" />
                  
                </video>
              </div>
              <div className={styles['course-container']}>
                <div className={styles['course-wrapper']}>
                    <div className={styles['courses-title-wrapper']}>
                        <GiCircuitry size={110}/>
                        <div>
                          <h3>Fundamental Math</h3>
                          <p>The core principles of mathematics</p>
                          <p className={styles['courses-title-stats-wrapper']}>0% complete &#183; 0 lessons complete</p>
                        </div>
                    </div>
                    <div className={styles['courses-links-wrapper']}>
                        <div>
                          <Link href={'/coursesv2/algebra'}>
                              <GiNuclearPlant color="purple" size={80}/>
                              {/* <span>Algebra</span> */}
                          </Link>
                          <button>Algebra</button>
                        </div>

                        <Link href={'/coursesv2'}>
                            <GiNuclearPlant size={80}/>
                            {/* <span>Trigonometry</span> */}
                            <button>Trigonometry</button>

                        </Link>
                        <Link href={'/coursesv2'}>
                            <GiNuclearPlant size={80}/>
                            {/* <span>Graphing Functions</span> */}
                            <button>Graphing Functions</button>

                        </Link>
                    </div>
                </div>
                <div className={styles['course-wrapper']}>
                    <div className={styles['courses-title-wrapper']}>
                        <GiCircuitry size={110}/>
                        <div>
                          <h3>Web Development</h3>
                          <p>Real insight into website development, frameworks and code</p>
                          <p className={styles['courses-title-stats-wrapper']}>0% complete &#183; 0 lessons complete</p>
                        </div>
                    </div>
                    <div className={styles['courses-links-wrapper']}>
                        <Link href={'/coursesv2/webdevcoding'}>
                            <GiNuclearPlant color="purple" size={80}/>
                            <span>HTML, CSS and JavaScript</span>
                            <button>HTML, CSS and JavaScript</button>
                        </Link>
                        <Link href={'/coursesv2'}>
                            <GiNuclearPlant size={80}/>
                            <span>Web frameworks and stacks</span>
                        </Link>
                        <Link href={'/coursesv2'}>
                            <GiNuclearPlant size={80}/>
                            <span>API&apos;s</span>
                        </Link>
                        <Link href={'/coursesv2'}>
                            <GiNuclearPlant size={80}/>
                            <span>Hosting and deployment</span>
                        </Link>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
