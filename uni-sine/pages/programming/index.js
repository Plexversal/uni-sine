import React, { useState, useEffect, useRef } from "react"
import Link from "next/link";
import styles from '../../styles/PremiumPage.module.css'
import contentStyles from '../../styles/Content.module.css'
import BuyPremiumModal from "../../components/page-construction/PremiumModal";
import Head from "next/head";
import LoadingIcon from "../../components/page-construction/LoadingIcon"
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import { useUserContext } from "../../contexts/UserContext";
import { PiPaperPlaneRightBold } from "react-icons/pi";

export default function Programming(){ 

  const { user } = useUserContext();
  
  const [isLoading, setIsLoading] = useState(true);
  const [noPremium, setNoPremium] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
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


function searchComponent() {
  return (<div className={contentStyles['search-content-wrapper']}>
      <input placeholder='Search for all programming problems' className={contentStyles['user-topic-search']} id='user-search-topic' onChange={e => setSearchTerm(e.target.value)} type='text'></input>
  </div>)
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
            <BuyPremiumModal
              user={user}
              showOverlay={true}
              ref={buyPremiumModalRef}
            />
          )}
          <div className={styles["content-container"]}>
            <SecondaryBanner
              title="100 programming problems"
              search={true ? searchComponent : <div>Loading</div>}
              subheader={`Programming problems with difficulty ranging from easy to hard. Premium members only`}
            />
            <div className={styles["content-wrapper"]}>
              <div className={styles["example-info"]}>
                <div>
                  <h2>Programming for any level...</h2>
                  <p>
                    100 programming problems ranging from easy to hard, allowing
                    you to test your knowledge whatever level you are at.
                  </p>
                  <p>
                    You can also use the <strong>AI chat</strong> at the bottom
                    right for programming help or other difficult problems.
                  </p>
                </div>
                <video
                  className={styles["video-preview"]}
                  playsInline
                  autoPlay
                  loop
                  muted
                  controls={false}
                  preload="auto"
                >
                  <source
                    src="/static/home/calculators-preview.webm"
                    type="video/webm"
                  />
                  <source
                    src="/static/home/calculators-preview.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div >
                <div className={styles["calculator-category"]}>
                  <h3>Functions</h3>
                  <div className={`${styles["btn-wrapper"]} ${styles["programming-wrapper"]}`}>
                    <Link
                      href={"/programming/1"}
                      className={`${styles["open-programming-link"]}`}
                    >
                      <span>Beginner &#xb7; Problem 1 &#xb7; Fundamentals</span>
                      <br></br>
                      Console log date
                    </Link>
                    <Link
                      href={"/test"}
                      className={`${styles["open-programming-link"]}`}
                    >
                      <span>Easy &#xb7; Problem 2 &#xb7; Algebra</span>
                      <br></br>
                      Math using parameters
                    </Link>

                    <Link
                      href={"/test"}
                      className={`${styles["open-programming-link"]}`}
                    >
                      <span>Intermediate &#xb7; Problem 3 &#xb7; Fundamentals</span>
                      <br></br>
                      
                      String manipulation
                    </Link>

                    <Link
                      href={"/test"}
                      className={`${styles["open-programming-link"]}`}
                    >
                      <span>Hard &#xb7; Problem 4 &#xb7; Fundamentals</span>
                      <br></br>
                      RegEx string manipulation
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
