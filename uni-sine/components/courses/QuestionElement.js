import { useState, useEffect, useRef } from 'react';
import styles from "../../styles/Courses.module.css";

export default function QuestionElement({ question, answersArray, questionIndex, parentCallback, questionNumber, currentSection }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const uniqueIdPrefix = `q${questionIndex}`;
  function shuffleAnswers(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const isCorrectRef = useRef(isCorrect); 

  useEffect(() => {
    isCorrectRef.current = isCorrect;
  }, [isCorrect]);

  useEffect(() => {

    return () => {
      parentCallback({question: questionNumber, isCorrect: isCorrectRef.current});
    };
  }, [])

  useEffect(() => {
    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
  }, [shuffledAnswers])

  useEffect(() => {
    const newAnswersArray = answersArray.map((answer, index) => {
      if (typeof answer === "object" && answer.correctAnswer) {
        return { text: answer.correctAnswer, isCorrect: true };
      } else {
        return { text: answer, isCorrect: false };
      }
    });

    setShuffledAnswers(shuffleAnswers([...newAnswersArray]));
  }, [answersArray]);

  const handleAnswerClick = (index, e) => {
    const radioButton = e.currentTarget.querySelector(`input[type="radio"]`);
    if (radioButton) {
      radioButton.checked = true;
    }
    setSelectedAnswer(index);
    setIsCorrect(shuffledAnswers[index].isCorrect);
  };

  return (
    <>
    {
      shuffledAnswers.length > 0 ? 
      <li>
      <strong>
        <div>{question}</div>
      </strong>
      <ul className={styles["questions-answer-list"]}>
        {shuffledAnswers.map(({ text, isCorrect }, i) => (
          <li onClick={(e) => handleAnswerClick(i, e)} key={uniqueIdPrefix + i}>
            <input
              type="radio"
              id={`${uniqueIdPrefix}-answer${i}`}
              name={`${uniqueIdPrefix}-answer`}
              value={`${uniqueIdPrefix}-answer${i}`}
            />
            <label
              className={styles["mjx-styling"]}
              htmlFor={`${uniqueIdPrefix}-answer${i}`}
            >
              {text}
            </label>
          </li>
        ))}
      </ul>
      {selectedAnswer !== null && (
        <span
  key={isCorrect ? 'correct' : 'incorrect'}  // or even a random number or the current time
  className={
    isCorrect 
      ? `${styles['correct-answer-span']} ${styles['correct-answer-text']}`
      : `${styles['incorrect-answer-span']} ${styles['correct-answer-text']}`
  }
>
  {isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
</span>
      )}
    </li>
      : <></>
    }
    </>
  );
}
