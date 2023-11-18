import styles from "../../styles/Questions.module.css";
import Trig from "../dynamic-media/Trig";
import Graph from "../dynamic-media/Graph";
import Vector from "../dynamic-media/Vector";
import React, { useState, useEffect, useRef } from "react";
import MathJaxContent from "../page-construction/MathJaxContent";
import CanvasConfetti from "react-canvas-confetti";
import CodeBlock from "../page-construction/CodeBlock";
export default function PreviewAiQuestions(props) {
  const confettiRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionSize, setQuestionSize] = useState(0);
  const [questionData, setQuestionData] = useState(props.questions);
  const [showEndScreen, setShowEndScreen] = useState(false); // [TODO] - implement end screen
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(null);
  const [activeNavigation, setActiveNavigation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [questionsAnswered, setQuestionsAnswered] = useState([]);
  const [percent, setPercent] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [timeValue, setTimeValue] = useState(null);
  const [showReportScreen, setShowReportScreen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [textAnswer, setTextAnswer] = useState("");

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - percent) / 100) * circumference;

  useEffect(() => {
    if (!questionData) throw new Error("No question data found");

    // randomize the order of the answers
    function shuffleAnswers(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffleAnswersForDifficulty = (difficulty) => {
      questionData[difficulty] = questionData[difficulty].map((question) => ({
        ...question,
        answers: shuffleAnswers([...question.answers]),
      }));
    };
    Object.keys(questionData).forEach(shuffleAnswersForDifficulty);
    setQuestionData(questionData);
    const easyLength = questionData?.easy?.length || 0;
    const mediumLength = questionData?.medium?.length || 0;
    const hardLength = questionData?.hard?.length || 0;
    setQuestionSize(easyLength + mediumLength + hardLength);
  }, []);

  const confettiStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    pointerEvents: "none",
  };
  useEffect(() => {
    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
  });
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.overflow = "";

    // When opening the modal

    return () => {};
  });
  useEffect(() => {
    const percent =
      (questionsAnswered.filter(
        (question) => question.correct && question.attempts === 1
      ).length /
        questionSize) *
      100;

    setPercent(percent || 0);
  }, [questionsAnswered]);

  const determineCurrentDifficultyAndIndex = () => {
    if (!questionData) return { difficulty: null, index: null };
    const easyLength = questionData?.easy?.length || null;
    const mediumLength = questionData?.medium?.length || null;

    if (currentQuestion < easyLength) {
      return { difficulty: "easy", index: currentQuestion };
    } else if (currentQuestion < easyLength + mediumLength) {
      return { difficulty: "medium", index: currentQuestion - easyLength };
    } else {
      return {
        difficulty: "hard",
        index: currentQuestion - easyLength - mediumLength,
      };
    }
  };
  const { difficulty, index } = determineCurrentDifficultyAndIndex();

  const handleNextButton = (e) => {
    if (activeNavigation) return;
    const answersDiv = document.getElementById("questions-answer-list");

    if (answersDiv.querySelector('input[type="radio"]:checked')?.checked || textAnswer) {
      const answer =
        answersDiv.querySelector('input[type="radio"]:checked')?.value || textAnswer;
      if (
        !questionsAnswered.some(
          (question) =>
            question.question === questionData[difficulty][index].questionID
        )
      ) {
        setQuestionsAnswered((prevQuestions) => [
          ...prevQuestions,
          {
            question: questionData[difficulty][index].questionID,
            correct: textAnswer
              ? textAnswer == questionData[difficulty][index].answers[0].text
              : questionData[difficulty][index].answers[answer.slice(-1) - 1]
                  .isCorrect,
            attempts: 1,
          },
        ]);
      }
      if (
        questionsAnswered.some(
          (question) =>
            question.question === questionData[difficulty][index].questionID
        )
      ) {
        setQuestionsAnswered((prevQuestions) =>
          prevQuestions.map((question) => {
            if (
              question.question === questionData[difficulty][index].questionID
            ) {
              // If the question was answered correctly before, return it as is.
              if (question.correct) return question;

              return {
                ...question,
                attempts: (question.attempts || 0) + 1, // Note: Ensure attempts exists
                correct: textAnswer
                  ? textAnswer ==
                    questionData[difficulty][index].answers[0].text
                  : questionData[difficulty][index].answers[
                      answer.slice(-1) - 1
                    ].isCorrect,
              };
            }
            return question;
          })
        );
      }

      if (
        textAnswer
          ? textAnswer == questionData[difficulty][index].answers[0].text
          : questionData[difficulty][index].answers[answer.slice(-1) - 1]
              .isCorrect
      ) {
        setShowCorrectAnswer("Correct");
        if (confettiRef.current) {
          const instance = confettiRef.current;
          instance.confetti({
            particleCount: 70,
            spread: 100,
            startVelocity: 30,
            gravity: 1.8,
            origin: { x: 0.5, y: 1 },
          });
        }
      } else {
        setShowCorrectAnswer("Incorrect");
      }
      setActiveNavigation(true);
      setTimeout(() => {
        if (
          answersDiv.querySelector('input[type="radio"]:checked') ||
          textAnswer
        ) {

          if (textAnswer) {

            setTextAnswer("");
          } else {

            answersDiv.querySelector(
              'input[type="radio"]:checked'
            ).checked = false;
          }
        }
        setShowCorrectAnswer(null);

        if (currentQuestion === questionSize - 1) {
          setShowEndScreen(true);
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
        setActiveNavigation(false);
      }, 100);
    } else {
      setShowCorrectAnswer("Skipping question");
      setTimeout(() => {
        setShowCorrectAnswer(null);
        if (currentQuestion === questionSize - 1) {
          setShowEndScreen(true);
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
        setActiveNavigation(false);
      }, 100);
    }
  };

  const handlePreviousButton = (e) => {
    const answersDiv = document.getElementById("questions-answer-list");
    if (currentQuestion === 0) return;

    if (answersDiv.querySelector('input[type="radio"]:checked') || textAnswer) {
      if (textAnswer) {
        setTextAnswer("");
      } else {
        answersDiv.querySelector('input[type="radio"]:checked').checked = false;
      }
    }
    setShowCorrectAnswer(null);

    setCurrentQuestion(currentQuestion - 1);
  };
  const handleListItemClick = (e) => {
    const radioButton = e.currentTarget.querySelector('input[type="radio"]');
    if (radioButton && e.target !== radioButton) {
      radioButton.checked = true;
    }
  };
  return (
    <div className={styles["container"]}>
      <div className={styles["calculator-content-container"]}>
        <div className={styles["questions-top"]}>
          <p>
            <strong>
              {currentQuestion + 1}/{questionSize}
            </strong>
          </p>
          <p>
            {" "}
            <span
              style={
                difficulty == "easy"
                  ? { color: "green" }
                  : difficulty == "medium"
                  ? { color: "orange" }
                  : { color: "red" }
              }
            >
              <strong>{difficulty}</strong>
            </span>
          </p>
          <p>
            <strong>00:00</strong>
          </p>
        </div>
        <div className={`${styles["questions-body-container"]} ${questionData[difficulty][index]?.answerType == 'text' ? styles["text-based-question"] : ``}`}>
          <div>
            <div className={styles["questions-content"]}>
              <p>{questionData[difficulty][index].question}</p>
              {questionData[difficulty][index].requiresMedia &&
              questionData[difficulty][index].mediaType == "equation" ? (
                <div className={styles["mjx-question"]}>
                  <MathJaxContent
                    content={`$$ ${questionData[difficulty][index].media} $$`}
                  />
                </div>
              ) : questionData[difficulty][index].mediaType == "trig" ? (
                <>
                  <Trig
                    {...{
                      sideA: parseFloat(
                        questionData[difficulty][index].media.sides.sideA
                      ),
                      sideB: parseFloat(
                        questionData[difficulty][index].media.sides.sideB
                      ),
                      sideC: parseFloat(
                        questionData[difficulty][index].media.sides.sideC
                      ),
                      showSidea:
                        questionData[difficulty][index].media.showTrigValues
                          .sideA,
                      showSideb:
                        questionData[difficulty][index].media.showTrigValues
                          .sideB,
                      showSidec:
                        questionData[difficulty][index].media.showTrigValues
                          .sideC,
                      showAngleA:
                        questionData[difficulty][index].media.showTrigValues
                          .angleA,
                      showAngleB:
                        questionData[difficulty][index].media.showTrigValues
                          .angleB,
                      showAngleC:
                        questionData[difficulty][index].media.showTrigValues
                          .angleC,
                      hideSideA:
                        questionData[difficulty][index].media?.hideTrigValues
                          ?.hideSideA || false,
                      hideSideB:
                        questionData[difficulty][index].media?.hideTrigValues
                          ?.hideSideB || false,
                      hideSideC:
                        questionData[difficulty][index].media?.hideTrigValues
                          ?.hideSideC || false,
                      hideAngleA:
                        questionData[difficulty][index].media?.hideTrigValues
                          ?.hideAngleA || false,
                      hideAngleB:
                        questionData[difficulty][index].media?.hideTrigValues
                          ?.hideAngleB || false,
                      hideAngleC:
                        questionData[difficulty][index].media?.hideTrigValues
                          ?.hideAngleC || false,
                    }}
                  />
                </>
              ) : questionData[difficulty][index].mediaType == "graph" ? (
                <>
                  <Graph
                    {...{
                      equation: questionData[difficulty][index].media,
                    }}
                  />
                </>
              ) : questionData[difficulty][index].mediaType == "vector" ? (
                <>
                  <Vector
                    {...{
                      mag: questionData[difficulty][index].media.mag,
                      dir: questionData[difficulty][index].media.dir,
                    }}
                  />
                </>
              ) : questionData[difficulty][index].mediaType ==
              "codeblock" ? (CodeBlock({code: questionData[difficulty][index].media, language: 'js', showCopy: false})) 
              : null}
            </div>
            {!questionData[difficulty][index].answerType ? (
              <ul
                id="questions-answer-list"
                className={styles["questions-answer-list"]}
              >
                <li onClick={handleListItemClick}>
                  <input
                    type="radio"
                    id="answer1"
                    name="answer"
                    value="answer1"
                  />

                  <label className={styles["mjx-styling"]} htmlFor="answer1">
                    {questionData[difficulty][index].answers[0].text}
                  </label>
                </li>
                <li onClick={handleListItemClick}>
                  <input
                    type="radio"
                    id="answer2"
                    name="answer"
                    value="answer2"
                  />
                  <label className={styles["mjx-styling"]} htmlFor="answer2">
                    {questionData[difficulty][index].answers[1].text}
                  </label>
                </li>
                <li onClick={handleListItemClick}>
                  <input
                    type="radio"
                    id="answer3"
                    name="answer"
                    value="answer3"
                  />
                  <label className={styles["mjx-styling"]} htmlFor="answer3">
                    {questionData[difficulty][index].answers[2].text}
                  </label>
                </li>
                <li onClick={handleListItemClick}>
                  <input
                    type="radio"
                    id="answer4"
                    name="answer"
                    value="answer4"
                  />
                  <label className={styles["mjx-styling"]} htmlFor="answer4">
                    {questionData[difficulty][index].answers[3].text}
                  </label>
                </li>
              </ul>
            ) : (
              questionData[difficulty][index].answerType == "text" && (
                <textarea
                  placeholder="Type your answer..."
                  onChange={(e) => setTextAnswer(e.target.value)}
                  id="questions-answer-list"
                  value={textAnswer}
                ></textarea>
              )
            )}
          </div>
          {showCorrectAnswer && (
            <span
              className={
                showCorrectAnswer == "Correct"
                  ? styles["correct-answer-span"]
                  : styles["incorrect-answer-span"]
              }
            >
              {showCorrectAnswer}
            </span>
          )}
        </div>

        <div className={styles["questions-bottom"]}>
          <CanvasConfetti ref={confettiRef} style={confettiStyles} />

          <div>
            <button>Close</button>
            <button>Report a problem</button>
          </div>
          <div>
            <button onClick={handlePreviousButton}>Previous</button>
            <button onClick={handleNextButton}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
