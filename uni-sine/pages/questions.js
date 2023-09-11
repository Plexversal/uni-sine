import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/PremiumPage.module.css";
import questionsStyles from "../styles/Questions.module.css";

import contentStyles from "../styles/Content.module.css";
import SecondaryBanner from "../components/page-construction/SecondaryBanner";
import QuestionsModal from "../components/questions/QuestionsModal";
import BuyPremiumModal from "../components/page-construction/PremiumModal";
import LoadingIcon from "../components/page-construction/LoadingIcon";

const Backdrop = ({ onClick }) => (
  <div className={contentStyles.backdrop} onClick={onClick}></div>
);
export default function Questions({ user }) {
  const [noPremium, setNoPremium] = useState(false);
  const buyPremiumModalRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [openCalculator, setOpenCalculator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [percent, setPercent] = useState(0);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - percent) / 100) * circumference;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [userQuestionStats] = await Promise.allSettled([
          fetch(`/api/db/getUserQuestionStats`),
        ]);

        const response = userQuestionStats.value;

        if (
          userQuestionStats.status === "rejected" ||
          response.status !== 200
        ) {
          setIsLoading(false);
          throw new Error("No user question data found");
        }

        const questionData = await response.json();

        if (!questionData) {
          setIsLoading(false);
          throw new Error("No user question data found");
        } else {
          setQuestionData(questionData);
          const percent = Math.round(
            (questionData.correctAnswers / questionData.totalQuestions) * 100
          );

          setPercent(percent || 0);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
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
  });

  useEffect(() => {
    if (noPremium && !isLoading) {
      buyPremiumModalRef.current.openModal();
    }
  }, [noPremium]);

  const handleOpenCalculator = (calculatorName) => {
    if (noPremium) {
      buyPremiumModalRef.current.openModal();
    } else {
      setOpenCalculator(calculatorName);
    }
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
    "Daily Physics Questions": (
      <QuestionsModal
        {...{ onClose: handleCloseCalculator, topic: "physics" }}
      />
    ),
    "Daily Math Questions": (
      <QuestionsModal {...{ onClose: handleCloseCalculator, topic: "math" }} />
    ),
    "Daily Programming questions": (
      <QuestionsModal
        {...{ onClose: handleCloseCalculator, topic: "comp", user: user }}
      />
    ),
  };
  return (
    <>
      {!isLoading ? (
        <>
          {noPremium && (
            <BuyPremiumModal showOverlay={false} ref={buyPremiumModalRef} />
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
                    Scrap revising old exam papers. Learn with generative AI
                    exam grade questions that refresh <strong>daily!</strong>
                  </p>
                  <p>
                    Question difficulty ranges from GCSE to A-level to
                    univeristy, you will see your results at the end of the
                    questions.
                  </p>
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
              {isLoading ? (
                <LoadingIcon />
              ) : (
                <>
                  {questionData ? (
                    <div className={questionsStyles["end-screen-content"]}>
                      <div className={questionsStyles.circleContainer}>
                        <svg
                          viewBox={`0 0 ${2 * radius + radius * (3.8 / 18)} ${
                            2 * radius + radius * (3.8 / 18)
                          }`}
                          className={questionsStyles.circularChart}
                        >
                          <path
                            className={questionsStyles.circleBg}
                            d={`
                          M${radius + (radius * (3.8 / 18)) / 2} ${
                              radius + (radius * (3.8 / 18)) / 2 - radius
                            }
                          a ${radius} ${radius} 0 0 1 0 ${2 * radius}
                          a ${radius} ${radius} 0 0 1 0 ${-2 * radius}
                      `}
                          />
                          <path
                            className={questionsStyles.circle}
                            d={`
                          M${radius + (radius * (3.8 / 18)) / 2} ${
                              radius + (radius * (3.8 / 18)) / 2 - radius
                            }
                          a ${radius} ${radius} 0 0 1 0 ${2 * radius}
                          a ${radius} ${radius} 0 0 1 0 ${-2 * radius}
                      `}
                            style={{
                              strokeDasharray: circumference,
                              strokeDashoffset: offset,
                              stroke:
                                percent > 50
                                  ? "#73c3c6"
                                  : percent > 25
                                  ? "orange"
                                  : "red",
                            }}
                          />
                          <text
                            x={radius + (radius * (3.8 / 18)) / 2}
                            y={radius + (radius * (3.8 / 18)) / 2 - 5}
                            style={{ fontSize: `${0.5 * (radius / 26)}em` }}
                            className={questionsStyles.percentage}
                            transform={`rotate(180, ${
                              radius + (radius * (3.8 / 18)) / 2
                            }, ${radius + (radius * (3.8 / 18)) / 2})`}
                          >
                            {percent}%
                          </text>
                          <text
                            x={radius + (radius * (3.8 / 18)) / 2}
                            y={radius + (radius * (3.8 / 18)) / 2 + 5}
                            style={{ fontSize: `${0.3 * (radius / 30)}em` }}
                            className={questionsStyles.percentage}
                            transform={`rotate(180, ${
                              radius + (radius * (3.8 / 18)) / 2
                            }, ${radius + (radius * (3.8 / 18)) / 2})`}
                          >
                            Overall score
                          </text>
                        </svg>
                      </div>
                      <div>
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
                              ? "A-Level"
                              : "GCSE"}
                          </strong>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      Your previous question stats will show here when you start
                      answering questions from the topics above.
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
