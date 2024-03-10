import React, { useState, useEffect, memo  } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import styles from "../../styles/Admin.module.css";
import PreviewAdminQuestions from "./PreviewAdminQuestions";
import MathJaxContent from "../page-construction/MathJaxContent";
import { useUserContext } from "../../contexts/UserContext";
function PublishQuestions() {

  const { user, isLoading } = useUserContext();

    // Form state
    const [date, setDate] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [subject, setSubject] = useState("math");
    const [answerType, setAnswerType] = useState("mcq")
    const [newQuestion, setNewQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrongAnswer1, setWrongAnswer1] = useState("");
    const [wrongAnswer2, setWrongAnswer2] = useState("");
    const [wrongAnswer3, setWrongAnswer3] = useState("");
    const [requiresMedia, setRequiresMedia] = useState(false);
    const [mediaType, setMediaType] = useState("equation");
    const [equation, setEquation] = useState("");
    const [graphEquation, setGraphEquation] = useState("");
    const [trigSides, setTrigSides] = useState({
      sideA: 4,
      sideB: 5,
      sideC: 6,
    });
    const [showTrigValues, setShowTrigValues] = useState({
      sideA: false,
      sideB: false,
      sideC: false,
      angleA: false,
      angleB: false,
      angleC: false
    });
    const [hideTrigValues, setHideTrigValues] = useState({
      hideA: false,
      hideB: false,
      hideC: false,
      hidea: false,
      hideb: false,
      hidec: false,
    })
    const [vector, setVector] = useState({
      mag: 5,
      dir: 0.8
    })
    const [isAnswersEquation, setIsAnswersEquation] = useState(false);
  

    if(!user) return <></>

    if (!user?.app_metadata?.is_admin) return <></>;



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      date,
      difficulty,
      subject,
      newQuestion,
      correctAnswer,
      wrongAnswer1,
      wrongAnswer2,
      wrongAnswer3,
      requiresMedia,
      mediaType,
      equation,
      isAnswersEquation,
      graphEquation,
      trigSides,
      showTrigValues,
      hideTrigValues,
      vector,
      answerType
    };
    try {
      const response = await fetch("/api/db/postQuestionData", {
        // Replace 'your-api-route' with the correct route.
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Question processed successfully!");
      } else {
        alert(result.message || "An error occurred.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles["form-container"]}>
      <h1>Publish Questions</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Publish Date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Subject:
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="math">Math</option>
            <option value="physics">Physics</option>
            <option value="comp">Programming</option>
          </select>
        </label>

        <label>
          New Question:
          <textarea
            type="text"
            placeholder="New Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            spellCheck="true"
            style={{fontFamily: "inherit"}}
          />
        </label>
        <label>
          Toggle equation based answers
          <input
            id="media"
            type="checkbox"
            checked={isAnswersEquation}
            onChange={(e) => setIsAnswersEquation(e.target.checked)}
          />
        </label>
        <label>
          Answer Type:
          <select
            value={answerType}
            onChange={(e) => setAnswerType(e.target.value)}
          >
            <option value="mcq">Multiple Choice</option>
            <option value="text">Text</option>
          </select>
        </label>
        <label>
          Correct Answer:
          <input
            type="text"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </label>
        {/* {isAnswersEquation && (
          <MathJaxContent content={`$$ ${correctAnswer} $$`} />
        )} */}

        <label>
          Wrong Answer 1:
          <input
            type="text"
            placeholder="Wrong Answer 1"
            value={wrongAnswer1}
            onChange={(e) => setWrongAnswer1(e.target.value)}
          />
        </label>
        {/* {isAnswersEquation && (
          <MathJaxContent content={`$$ ${wrongAnswer1} $$`} />
        )} */}

        <label>
          Wrong Answer 2:
          <input
            type="text"
            placeholder="Wrong Answer 2"
            value={wrongAnswer2}
            onChange={(e) => setWrongAnswer2(e.target.value)}
          />
        </label>
        {/* {isAnswersEquation && (
          <MathJaxContent content={`$$ ${wrongAnswer2} $$`} />
        )} */}
        <label>
          Wrong Answer 3:
          <input
            type="text"
            placeholder="Wrong Answer 3"
            value={wrongAnswer3}
            onChange={(e) => setWrongAnswer3(e.target.value)}
          />
        </label>
        {/* {isAnswersEquation && (
          <MathJaxContent content={`$$ ${wrongAnswer3} $$`} />
        )} */}
        <label>
          Media required:
          <input
            id="media"
            type="checkbox"
            checked={requiresMedia}
            onChange={(e) => setRequiresMedia(e.target.checked)}
          />
        </label>

        {
          // if media input checked show another input text box
          requiresMedia && (
            <>
              <label>
                Meida Type:
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                >
                  <option value="equation">Equation</option>
                  <option value="graph">Graph</option>
                  <option value="trig">Trigonometry</option>
                  <option value="vector">Vector</option>
                </select>
              </label>
              {mediaType === "equation" && (
                <>
                  <label>
                    Equation:
                    <input
                      type="text"
                      placeholder="Equation"
                      value={equation}
                      onChange={(e) => setEquation(e.target.value)}
                    />
                  </label>
                  <MathJaxContent content={`$$ ${equation} $$`} />
                </>
              )}
              {mediaType === "graph" && (
                <>
                  <label>
                    <strong>y = </strong>
                    <input
                      type="text"
                      placeholder="e.g. 2x^2 + 3x + 4"
                      value={graphEquation}
                      onChange={(e) => setGraphEquation(e.target.value)}
                    />
                  </label>

                </>
              )}
              {mediaType === "trig" && (
                <>
                <label>
                    Triangle Side A:
                    <input
                      type="number"
                      placeholder="side a"
                      value={trigSides.sideA || ''}
                      onChange={(e) => setTrigSides({...trigSides, sideA: parseFloat(e.target.value)})}
                      max={20}
                      min={0}
                      step="0.01"
                    />
                </label>
                <label>
                    Triangle Side B:
                    <input
                      type="number"
                      placeholder="side b"
                      value={trigSides.sideB || ''}
                      onChange={(e) => setTrigSides({...trigSides, sideB: parseFloat(e.target.value)})}
                      max={20}
                      min={0}
                      step="0.01"
                    />
                </label>
                <label>
                    Triangle Side C:
                    <input
                      type="number"
                      placeholder="side c"
                      value={trigSides.sideC || ''}
                      onChange={(e) => setTrigSides({...trigSides, sideC: parseFloat(e.target.value)})}
                      max={20}
                      min={0}
                      step="0.01"
                    />
                </label>

                  <div>
                  Values to show:

                  </div>
                  <label>
                    Side A:
                    <input
                      id="side-a"
                      type="checkbox"
                      checked={showTrigValues.sideA}
                      onChange={(e) => setShowTrigValues({...showTrigValues, sideA: e.target.checked})}
                    />
                  </label>
                  <label>
                    Side B:
                    <input
                      id="side-b"
                      type="checkbox"
                      checked={showTrigValues.sideB}
                      onChange={(e) => setShowTrigValues({...showTrigValues, sideB: e.target.checked})}
                    />
                  </label>
                  <label>
                    Side C:
                    <input
                      id="side-c"
                      type="checkbox"
                      checked={showTrigValues.sideC}
                      onChange={(e) => setShowTrigValues({...showTrigValues, sideC: e.target.checked})}
                    />
                  </label>
                  <label>
                    Angle A:
                    <input
                      id="angle-a"
                      type="checkbox"
                      checked={showTrigValues.angleA}
                      onChange={(e) => setShowTrigValues({...showTrigValues, angleA: e.target.checked})}
                    />
                  </label>
                  <label>
                    Angle B:
                    <input
                      id="angle-b"
                      type="checkbox"
                      checked={showTrigValues.angleB}
                      onChange={(e) => setShowTrigValues({...showTrigValues, angleB: e.target.checked})}
                    />
                  </label>
                  <label>
                  Angle C:

                    <input
                      id="angle-c"
                      type="checkbox"
                      checked={showTrigValues.angleC}
                      onChange={(e) => setShowTrigValues({...showTrigValues, angleC: e.target.checked})}
                    />
                  </label>
                  <label>
                    Hide Side A:
                    <input
                      id="hide-side-a"
                      type="checkbox"
                      checked={hideTrigValues.hidea}
                      onChange={(e) => setHideTrigValues({...hideTrigValues, hidea: e.target.checked})}
                    />
                  </label>
                  <label>
                    Hide Side B:
                    <input
                      id="hide-side-b"
                      type="checkbox"
                      checked={hideTrigValues.hideb}
                      onChange={(e) => setHideTrigValues({...hideTrigValues, hideb: e.target.checked})}
                    />
                  </label>
                  <label>
                    Hide Side C:
                    <input
                      id="hide-side-c"
                      type="checkbox"
                      checked={hideTrigValues.hidec}
                      onChange={(e) => setHideTrigValues({...hideTrigValues, hidec: e.target.checked})}
                    />
                  </label>
                  <label>
                    Hide Angle A:
                    <input
                      id="hide-angle-a"
                      type="checkbox"
                      checked={hideTrigValues.hideA}
                      onChange={(e) => setHideTrigValues({...hideTrigValues, hideA: e.target.checked})}
                    />
                  </label>
                  <label>
                    Hide Angle B:
                    <input
                      id="hide-angle-b"
                      type="checkbox"
                      checked={hideTrigValues.hideB}
                      onChange={(e) => setHideTrigValues({...hideTrigValues, hideB: e.target.checked})}
                    />
                  </label>
                  <label>
                  Hide Angle C:
                  <input
                    id="hide-angle-c"
                    type="checkbox"
                    checked={hideTrigValues.hideC}
                    onChange={(e) => setHideTrigValues({...hideTrigValues, hideC: e.target.checked})}
                  />
                  
                  </label>

                </>
              )}
              {
                mediaType === "vector" && (
                  <>
                    <label>
                      Magnitude:
                      <input
                        type="number"
                        placeholder="Magnitude"
                        value={vector.mag}
                        onChange={(e) => setVector({...vector, mag: parseFloat(e.target.value)})}
                        max={20}
                        min={0}
                        step="0.01"
                      />
                    </label>
                    <label>
                      Direction:
                      <input
                        type="number"
                        placeholder="Direction"
                        value={vector.dir}
                        onChange={(e) => setVector({...vector, dir: parseFloat(e.target.value)})}
                        max={360}
                        min={0}
                        step="0.01"
                      />
                    </label>
                  </>
                )
              }

            </>
          )
        }
          <div className={styles["preview-container"]}>
          <h3>Preview</h3>
          <PreviewAdminQuestions {...{date,
            difficulty,
            subject,
            newQuestion,
            correctAnswer,
            wrongAnswer1,
            wrongAnswer2,
            wrongAnswer3,
            requiresMedia,
            mediaType,
            equation,
            isAnswersEquation,
            graphEquation,
            trigSides,
            showTrigValues,
            hideTrigValues,
            vector}} />
          </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default withPageAuthRequired(PublishQuestions);
