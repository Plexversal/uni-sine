import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/PremiumPage.module.css";
import questionsStyles from "../styles/Questions.module.css";

import contentStyles from "../styles/Content.module.css";
import SecondaryBanner from "../components/page-construction/SecondaryBanner";
import QuestionsModal from "../components/questions/QuestionsModal";
import BuyPremiumModal from "../components/page-construction/PremiumModal";
import LoadingIcon from "../components/page-construction/LoadingIcon";
import PercentIcon from "../components/page-construction/PercentageIcon";
import Head from "next/head";
import { useUserContext } from "../contexts/UserContext";

const Backdrop = ({ onClick }) => (
  <div className={contentStyles.backdrop} onClick={onClick}></div>
);
export default function Questions() {
  const { user, isLoading } = useUserContext();

  const [noPremium, setNoPremium] = useState(false);
  const buyPremiumModalRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [openCalculator, setOpenCalculator] = useState(null);
  const [isStatsLoading, setIsStatsLoading] = useState(false);

  const [questionData, setQuestionData] = useState(null);
  const [percent, setPercent] = useState(0);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - percent) / 100) * circumference;
  useEffect(() => {
    const fetchData = async () => {

      if(openCalculator) return; // stop reloading stats on modal open
      setIsStatsLoading(true);

      try {
        const [userQuestionStats] = await Promise.allSettled([
          fetch(`/api/db/getUserQuestionStats`),
        ]);

        const response = userQuestionStats.value;

        if (
          userQuestionStats.status === "rejected" ||
          response.status !== 200
        ) {
          throw new Error("No user question data found");
        }

        const questionData = await response.json();

        if (!questionData) {
          throw new Error("No user question data found");
        } else {
          setQuestionData(questionData);
          const percent = Math.round(
            (questionData.correctAnswers / questionData.totalQuestions) * 100
          );

          setPercent(percent || 0);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setIsStatsLoading(false);
      }
    };

    fetchData();
  }, [openCalculator]);

  useEffect(() => {
    if ((user && !user.app_metadata?.is_premium) || !user) {
      setNoPremium(true);
    } else {
      setNoPremium(false);
    }
  }, [user]);

  // useEffect(() => {
  //   if (noPremium && !isLoading) {
  //     buyPremiumModalRef.current.openModal();
  //   }
  // }, [noPremium]);

  const handleOpenCalculator = (calculatorName) => {

      setOpenCalculator(calculatorName);
    
  };

  const handleCloseCalculator = () => {
    setOpenCalculator(null);
  };

  function searchComponent() {
    return (
      <div className={contentStyles["search-content-wrapper"]}>
        <input
          placeholder="Search practice question topics"
          className={contentStyles["user-topic-search"]}
          id="user-search-topic"
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
        ></input>
      </div>
    );
  }

  const calculatorsMap = {
    "Physics": (
      <QuestionsModal
        {...{ onClose: handleCloseCalculator, topic: "physics" }}
      />
    ),
    "Math": (
      <QuestionsModal {...{ onClose: handleCloseCalculator, topic: "math" }} />
    ),
    "Computer Science": (
      <QuestionsModal
        {...{ onClose: handleCloseCalculator, topic: "comp" }}
      />
    ),
    "Biology": (
      <QuestionsModal
        {...{ onClose: handleCloseCalculator, topic: "biology"}}
      />
    ),
    "Chemistry": (
      <QuestionsModal
        {...{ onClose: handleCloseCalculator, topic: "chemistry"}}
      />
    ),
    "Calculus": (
      <QuestionsModal
        {...{ onClose: handleCloseCalculator, topic: "calculus" }}
      />
    ),
  };
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Daily practice and revision questions for maths, physics and computer science. Generates daily."
        />
      </Head>
      {!isLoading ? (
        <>
          {noPremium && (
            <BuyPremiumModal user={user} showOverlay={true}  ref={buyPremiumModalRef} />
          )}
          <div className={styles["content-container"]}>
            <SecondaryBanner
              title="Daily practice questions"
              search={true ? searchComponent : <div>Loading</div>}
              subheader={`Refreshes daily! Practice any topic below. Premium members only.`}
            />
            <div className={styles["content-wrapper"]}>
              <div className={styles["example-info"]}>
                <div>
                  <h2>A new way to revise...</h2>
                  <p>
                    Scrap revising old exam papers. Learn with <strong>exam style</strong> questions that refresh <strong>daily!</strong>
                  </p>
                  <p>
                    Question difficulty ranges from <strong>GCSE/SAT</strong> to <strong>A-level/AP</strong> then to
                    undergraduate university level. You will see your results at the end of the
                    questions.
                  </p>
                </div>
                <video className={styles['video-preview']} playsInline autoPlay loop muted controls={false} preload="auto">
                  <source src='/static/home/questions-preview.webm' type="video/webm" />
                  <source src='/static/home/questions-preview.mp4' type="video/mp4" />

                </video>
              </div>
              <div className={`${styles["btn-wrapper"]} ${styles["questions-btn-wrapper"]}`}>
                {Object.keys(calculatorsMap)
                  .filter((calculatorName) =>
                    calculatorName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((calculatorName, i) => (
                    <button
                      key={i}
                      className={styles["open-questions-btn"]}
                      onClick={() => handleOpenCalculator(calculatorName)}
                    >
                      {calculatorName}
                    </button>
                  ))}
              </div>
              <h1>Stats</h1>

              {isStatsLoading ? (
                <LoadingIcon />
              ) : (
                <>
                  {questionData ? (
                    <div className={questionsStyles["end-screen-content"]}>
                      <PercentIcon {...{ percent, text: "Overall score" }} />

                      <div>
                        <p style={{ color: "grey" }}>
                          <i>Stats are based on your first question attempt</i>
                        </p>

                        <p>
                          <span>Total questions answered:</span>{" "}
                          <strong>{questionData.totalQuestions}</strong>
                        </p>
                        <p>
                          <span>Correct Answers:</span>{" "}
                          <strong>{questionData.correctAnswers}</strong>
                        </p>
                        <p>
                          <span>Accuracy:</span>{" "}
                          <strong>
                            {Math.round(
                              (questionData.correctAnswers /
                                questionData.totalQuestions) *
                                100
                            )}
                            %
                          </strong>
                        </p>
                        <p>
                          <span>Predicted level:</span>{" "}
                          <strong>
                            {percent > 75
                              ? "University"
                              : percent > 50
                              ? "A-Level/AP"
                              : "GCSE/SAT"}
                          </strong>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={questionsStyles["end-screen-content"]}>
                      <PercentIcon {...{ percent, text: "Overall score" }} />

                      <div>
                        <p style={{ color: "grey" }}>
                          <i>Stats are based on your first question attempt</i>
                        </p>

                        <p>
                          <span>Total questions answered:</span>{" "}
                          <strong>0</strong>
                        </p>
                        <p>
                          <span>Correct Answers:</span>{" "}
                          <strong>0</strong>
                        </p>
                        <p>
                          <span>Accuracy:</span>{" "}
                          <strong>
                           0%
                          </strong>
                        </p>
                        <p>
                          <span>Predicted level:</span>{" "}
                          <strong>
                            GCSE/SAT
                          </strong>
                        </p>
                      </div>
                    </div>
                    
                  )}
                </>
              )}
            </div>

            {openCalculator && (
              <div
                id="questions-modal"
                className={`${styles["questions-modal"]} ${
                  openCalculator ? styles.open : ""
                }`}
              >
                {calculatorsMap[openCalculator]}
              </div>
            )}

            {openCalculator && <Backdrop onClick={handleCloseCalculator} />}
          </div>
        </>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}
