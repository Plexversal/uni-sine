import { useEffect, useState, useCallback, useRef  } from "react";
import LoadingIcon from "../page-construction/LoadingIcon";
import styles from "../../styles/Courses.module.css";
import {BsFillXCircleFill, BsFillCheckCircleFill} from 'react-icons/bs'
import PercentIcon from "../page-construction/PercentageIcon";
import QuestionElement from "./questionElement";
import Trig from '../dynamic-media/Trig'
export default function TrigCourse (props) {
  const [isLoading, setIsLoading] = useState(false);
  const [userCourseData, setUserCourseData] = useState([])
  const [correctAnswerValue, setCorrectAnswerValue] = useState(null)
  const [selected, setSelected] = useState("");
  const [correctQuestions, setCorrectQuestions] = useState([])
  const [isDataReady, setIsDataReady] = useState(false);
  const prevSectionRef = useRef(props.currentSection); 

  const list = ['Basic Trigonometric Functions','Basic Trigonometric Functions Practice','Further Trigonometric Functions','Further Trigonometric Functions Practice','Unit Circle','Trigonometric Identities','Trigonometric Identities Practice','Advanced: Trigonometric Equations','Advanced: Inverse Trigonometric Functions','Practice Questions','Course Review']

  const questions = [
    {
      question: "A point P lies on the circle and makes an angle of theta with the positive x-axis. Find the coordinates of point P if theta is 45 degrees",
      answersArray: [`\\((\\frac{1}{3},\\frac{1}{3}) \\)`, `\\((\\frac{\\pi}{2},\\frac{\\pi}{2}) \\)`, {correctAnswer: `\\((\\frac{\\sqrt{2}}{2},\\frac{\\sqrt{2}}{2}) \\)`}, `\\((\\pi, \\pi)\\)`]
    },
    {
      question: "Which reciprocal represents the cosecant function?",
      answersArray: [`\\(\\frac{1}{\\cos\\theta}\\)`, `\\(\\frac{1}{\\tan\\theta}\\)`, {correctAnswer: `\\(\\frac{1}{\\sin\\theta}\\)`}, `\\(\\frac{1}{\\sec\\theta}\\)`]
    },
    {
      question: "Which trigonometric function uses both the opposite and adjacent side?",
      answersArray: [`\\(\\cos\\theta\\)`, `\\(\\sin\\theta\\)`, {correctAnswer: `\\(\\tan\\theta\\)`}, `\\(\\csc\\theta\\)`]
    }
  ];

  const handleQuestionCallback = (childData) => {
    setCorrectQuestions(prevState => {
      const existingQuestionIndex = prevState.findIndex(
        item => item.question === childData.question
      );
  
      if (existingQuestionIndex > -1) {
        const updatedState = [...prevState];
        updatedState[existingQuestionIndex] = childData;
        return updatedState;
      }
  
      return [...prevState, childData];
    });
  

      setIsDataReady(true);
  
    };

    function checkSections (section) {
      if(!userCourseData || userCourseData.length <= 0) return section
      let completedSection = userCourseData.completedSections;
      const isDone = completedSection.some((e) => e === section);
      
      return isDone ? '\u2713' : section;
      
    }
    

  function setCorrectAnswer(e, answer) {

    if(e.target.value == answer) {
      setCorrectAnswerValue(true)
    } else {
      setCorrectAnswerValue(false)
    }
  }



  const handleClick = (value, correct) => {
    if(selected) return
    if(correct) {
      setCorrectAnswerValue(true)
    } else {
      setCorrectAnswerValue(false)
    }
    setSelected(value);
  };

  useEffect(() => {

    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
    setCorrectAnswerValue(null)

    setSelected('')

  }, [props.currentSection]);

    // save course data on page move
    useEffect(() => {
      let data;
  
      if(prevSectionRef.current == 10) {
        if(!isDataReady) return
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
          questionsCompleted: correctQuestions
        }
  
      } 
      else if(correctAnswerValue !== null) {
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
          standardQuestions: [{section: prevSectionRef.current, isCorrect: correctAnswerValue}] // array
  
        }
      }
      else {
  
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
  
        }
      }
  
      async function saveToUser() {
        if(prevSectionRef.current == 0) return
        try {
          setIsLoading(true)
          const saveToUserResponse = await fetch(`/api/db/postUserCourseData`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseData: data,
            }),
          });
          if (saveToUserResponse.status === 200) {
            return true;
          } else {
            const errorData = await saveToUserResponse.json();
            const errorMessage = errorData.message || saveToUserResponse.statusText;
            return console.error(
              `Error saving to user ${saveToUserResponse.status}: ${errorMessage}`
            );
          }
        } catch (error) {
          console.error("Unexpected error:", error);
        } finally {
          setIsLoading(false)
  
  
        }
      }
  
      saveToUser()
      setIsDataReady(false); // Reset the flag
      prevSectionRef.current = props.currentSection;
  
    }, [props.currentSection, isDataReady])
  
  // get user course data
  useEffect(() => {
    console.log(props.currentSection)
    if((props.currentSection !== 0  && props.currentSection !== 11)) return
    setIsLoading(true)
    const fetchData = async () => {
      try {
        let response = await fetch(`/api/db/getUserCourseStats?courseName=${encodeURIComponent(props.courseName)}`)
        if(response.status === 404) {
          return setUserCourseData(null)
        } else {
          let data = await response.json()
          setUserCourseData(data)
         
        }
      } catch (error) {
        setUserCourseData(null)
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.currentSection, isDataReady])

  return (
    <>
      {props.currentSection == 0 ? (
        <div>
          <div>
            <h2>Introduction to Trigonometry</h2>
            <p>
              Trigonometry is a branch of mathematics that studies the
              relationships between the sides and angles of triangles,
              particularly right-angled triangles. The word &quot;trigonometry&quot;
              itself originates from the Greek words &quot;trigonon,&quot; meaning
              triangle, and &quot;metron,&quot; meaning measure. It provides the
              foundation for understanding ratios of angles and is essential in
              exploring periodic functions. Trigonometry has ancient roots,
              tracing back to early civilizations including the Babylonians and
              Egyptians, who used it for astronomical calculations and solving
              problems related to architecture, respectively.
            </p>
            <p>
              Although it may seem like an abstract concept, trigonometry has a
              wide range of practical applications in various fields today. From
              physics to engineering, and from astronomy to computer graphics,
              the principles of trigonometry are employed everywhere. It&quot;s
              indispensable in disciplines that require spatial awareness and
              measurement of angles, like robotics, architecture, and even game
              development. The versatility of trigonometry makes it not only
              fascinating but also incredibly useful in solving real-world
              problems.
            </p>
          </div>
          <div>
            <div className={styles["course-content"]}>
              <h2>Course content</h2>
              <p>
                <i>Click below to jump to a section</i>
              </p>
              {
                isLoading ? <LoadingIcon /> : <ol className={styles['course-item-list']} type="number">
                {list.map((l, i) => (
                  <li
                    onClick={() => props.setCurrentSection(i + 1)}
                    data-content={checkSections(i+1)}
                    data-done={checkSections(i+1) === '\u2713' ? 'true' : 'false'}
                    key={i}
                  >
                    {l}
                  </li>
                ))}
              </ol>
              }
            </div>
          </div>
        </div>
      ) : props.currentSection == 1 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>The Basics of Trigonometry</h2>
            <p>
              Trigonometry is built on the foundation of three primary ratios:
              Sine (sin), Cosine (cos), and Tangent (tan). These ratios are
              defined in the context of a right-angled triangle, where one of
              the angles is 90 degrees. The three main sides of this triangle
              are the opposite, adjacent, and hypotenuse. The opposite side is
              the one opposite to the angle in question, the adjacent side is
              the one next to the angle, and the hypotenuse is the side opposite
              the 90-degree angle.
            </p>
            <ul>
              <li>
                Sine (sin): The sine of an angle in a right triangle is the
                length of the opposite side divided by the length of the
                hypotenuse.{" "}
                {"\\(\\sin{\\theta} = \\frac{Opposite}{Hypotenuse}\\)"}
              </li>
              <li>
                Cosine (cos): The cosine of an angle is the length of the
                adjacent side divided by the hypotenuse.{" "}
                {"\\(\\cos{\\theta} = \\frac{Adjacent}{Hypotenuse}\\)"}
              </li>
              <li>
                Tangent (tan): The tangent of an angle is the length of the
                opposite side divided by the length of the adjacent side.{" "}
                {"\\(\\tan{\\theta} = \\frac{Opposite}{Adjacent}\\)"}
              </li>
            </ul>
            <p>
              A common acronym to remember these functions and how to use them
              is SOH CAH TOA
            </p>
            <p>
              These basic trigonometric functions are extensively used in
              various applications. For example, engineers use these functions
              to analyze forces and mechanical systems. In computer graphics,
              trigonometric functions help rotate and transform objects. In
              astronomy, they allow us to calculate distances to celestial
              objects based on angular separation. Understanding these functions
              is key to grasping the complexity and breadth of problems that
              trigonometry can help solve.
            </p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          >
            <img src="/static/courses/trig/triangle.png" />
            <table
              className={styles["media-table"]}
              border="1"
              cellSpacing="0"
              cellPadding="0"
            >
              <tbody>
                <tr>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      <strong>{"\\(\\sin \\theta\\)"}</strong>
                    </p>
                  </td>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      <strong>{"\\(\\cos \\theta\\)"}</strong>
                    </p>
                  </td>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      <strong>{"\\(\\tan \\theta\\)"}</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      {"\\(\\frac{Opposite}{Hypotenuse}\\)"}
                    </p>
                  </td>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      {"\\(\\frac{Adjacent}{Hypotenuse}\\)"}
                    </p>
                  </td>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      {"\\(\\frac{Opposite}{Adjacent}\\)"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : props.currentSection == 2 ? (
        <div>
          <div>
            <h2>Practice</h2>
            <p>
              Given the triangle, calculate the missing side to 2 decimal
              places:
            </p>
            <p>
              <i>
                Tip: You should think about rearranging the trigonometric
                equation to calculate for side
              </i>
            </p>

            <input
              onChange={(e) => setCorrectAnswer(e, 13.45)}
              placeholder="Type Answer"
              id="number-input"
              className={styles["answer-input"]}
              type="number"
              step={"0.01"}
            />
            {correctAnswerValue == true ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}
          </div>

          <Trig
            {...{
              sideA: 10,
              sideB: 9,
              sideC: 13.45,
              showSidea: true,
              showSideb: false,
              showSidec: true,
              showAngleA: true,
              showAngleB: false,
              showAngleC: false,
              hideSideA: false,
              hideSideB: false,
              hideSideC: false,
              hideAngleA: false,
              hideAngleB: false,
              hideAngleC: false,
            }}
          />
        </div>
      ) : props.currentSection == 3 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Further Trigonometric Functions</h2>

            <p>
              Beyond the foundational trigonometric functions of Sine, Cosine,
              and Tangent, there are additional trigonometric functions that are
              equally important but less commonly encountered in introductory
              courses. These include the Cosecant (csc), Secant (sec), and
              Cotangent (cot), which are essentially the reciprocals of the
              basic functions.
            </p>
            <ul>
              <li>
                Cosecant (csc): The cosecant is the reciprocal of the sine
                function. {"\\(\\csc{\\theta} = \\frac{1}{\\sin{\\theta}}\\)"}
              </li>
              <li>
                Secant (sec): The secant is the reciprocal of the cosine
                function {"\\(\\sec{\\theta} = \\frac{1}{\\cos{\\theta}}\\)"}
              </li>
              <li>
                Cotangent (cot): The cotangent is the reciprocal of the tangent
                function. {"\\(\\cot{\\theta} = \\frac{1}{\\tan{\\theta}}\\)"}
              </li>
            </ul>
            <p>
              Additionally, there are inverse trigonometric functions like
              arcsine, arccosine and arctangent, which allow you to find an
              angle when given its trigonometric ratio. These inverse functions
              play a critical role in solving trigonometric equations and are
              commonly used in calculus.
            </p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          >
            <table
              className={styles["media-table"]}
              border="1"
              cellSpacing="0"
              cellPadding="0"
            >
              <tbody>
                <tr>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      <strong>{"\\(\\csc \\theta\\)"}</strong>
                    </p>
                  </td>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      <strong>{"\\(\\sec \\theta\\)"}</strong>
                    </p>
                  </td>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      <strong>{"\\(\\cot \\theta\\)"}</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      {"\\(\\frac{Hypotenuse}{Opposite}\\)"}
                    </p>
                  </td>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      {"\\(\\frac{Hypotenuse}{Adjacent}\\)"}
                    </p>
                  </td>
                  <td width="200" valign="top">
                    <p className={styles["MsoNormal"]}>
                      {"\\(\\frac{Adjacent}{Opposite}\\)"}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : props.currentSection == 4 ? (
        <div>
          <div>
            <h2>Practice</h2>
            <p>
              Select which function would be the reciprocal of the{" "}
              <strong>cosine</strong> function:
            </p>
            <div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 1 ? styles.selected : ""
                }`}
                onClick={() => handleClick(1, false)}
              >
                \( \csc \theta \)
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 2 ? styles.selected : ""
                }`}
                onClick={() => handleClick(2, true)}
              >
                \( \sec \theta \)
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 3 ? styles.selected : ""
                }`}
                onClick={() => handleClick(3, false)}
              >
                \( \cot \theta \)
              </div>
            </div>
            {correctAnswerValue ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}
          </div>
        </div>
      ) : props.currentSection == 5 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Unit Circle</h2>
            <p>
              The Unit Circle is a circle with a radius of one unit, centered at
              the origin of a Cartesian coordinate system. The circle provides a
              geometric representation of trigonometric functions and serves as
              a bridge between right-angled triangles and trigonometry in a
              broader context. In the Unit Circle, the coordinates (x, y) of any
              point on the circle can be represented as{" "}
              {"\\((\\cos{\\theta}, \\sin{\\theta})\\)"} where &#952; is the
              angle formed by the point, the origin, and the positive x-axis.
            </p>
            <p>
              When you rotate a point around the origin to form an angle &#952;,
              the x-coordinate of the point gives the cosine of that angle, and
              the y-coordinate gives the sine. The tangent of the angle can be
              found as the ratio between the sine and the cosine:{" "}
              {"\\(\\tan{\\theta} = \\frac{\\sin{\\theta}}{\\cos{\\theta}}\\)"}
            </p>
            <p>
              The Unit Circle is particularly useful when dealing with periodic
              phenomena like sound waves, alternating currents, or any other
              scenarios where the trigonometric functions repeat their values in
              a cycle. It is also essential for understanding complex numbers
              and their powers, as well as for simplifying trigonometric
              identities.
            </p>
          </div>
          <div>
            <img src="/static/courses/trig/unit_circle.svg" />
          </div>
        </div>
      ) : props.currentSection == 6 ? (
        <div>
          <div className={styles["text-content"]}>
            <div>
              <h2>Basic Trigonometric Identities</h2>
              <p>
                Trigonometric identities equate different Pythagorean equations
                where they are true for any value, which make it an identity.
                They help break down different trigonometric functions into
                known functions. Below are the fundamental identities:
              </p>
              <div
                className={styles["no-style-list-container"]}
                style={{ display: "flex", gap: "20px", textAlign: "center" }}
              >
                <div>
                  <p>
                    <strong>reciprocals</strong>
                  </p>
                  <ul>
                    <li>
                      {"\\(\\frac{1}{\\cos{\\theta}}\\equiv\\sin\\theta\\)"}
                    </li>
                    <li>
                      {"\\(\\frac{1}{\\sin{\\theta}}\\equiv\\csc\\theta\\)"}
                    </li>
                    <li>
                      {"\\(\\frac{1}{\\tan{\\theta}}\\equiv\\cot\\theta\\)"}
                    </li>
                  </ul>
                </div>
                <div>
                  <p>
                    <strong>ratios</strong>
                  </p>
                  <ul>
                    <li>
                      {
                        "\\(\\frac{\\sin\\theta}{\\cos{\\theta}}\\equiv\\tan\\theta\\)"
                      }
                    </li>
                    <li>
                      {
                        "\\(\\frac{\\cos\\theta}{\\sin{\\theta}}\\equiv\\cot\\theta\\)"
                      }
                    </li>
                  </ul>
                </div>

                <div>
                  <p>
                    <strong>compliments</strong>
                  </p>
                  <ul>
                    <li>
                      {"\\(\\sin(90^\\circ-\\theta)\\equiv\\cos\\theta\\)"}
                    </li>
                    <li>
                      {"\\(\\cos(90^\\circ-\\theta)\\equiv\\sin\\theta\\)"}
                    </li>
                    <li>
                      {"\\(\\tan(90^\\circ-\\theta)\\equiv\\cot\\theta\\)"}
                    </li>
                    <li>
                      {"\\(\\csc(90^\\circ-\\theta)\\equiv\\sec\\theta\\)"}
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Identities are used to simplify equations. Suppose you have an
                equation involving {"\\(\\sin\\theta\\)"} and{" "}
                {"\\(\\cos\\theta\\)"} that you want to simplify:
              </p>

              <p>
                {
                  "\\(\\frac{\\sin\\theta}{\\cos\\theta}+\\frac{1}{\\sin\\theta}\\)"
                }
              </p>
              <p>
                Step 1: Use the reciprocal identities to rewrite the equation.
              </p>
              <p>{"\\(\\tan\\theta+\\csc\\theta\\)"}</p>
              <p>
                Step 2: Let&apos;s say, for the sake of the example, that you also
                know {"\\(\\tan \\theta = 2\\)"}
              </p>
              <p>Then,</p>
              <p>{"\\(2+\\csc\\theta\\)"}</p>
              <p>
                Step 3: To further simplify, if you also know that{" "}
                {"\\(\\sin\\theta = \\frac{1}{2}\\)"} you can replace{" "}
                {"\\(\\csc\\theta\\)"} with its reciprocal:
              </p>
              <p>{"\\(2+\\frac{1}{1/2}\\)"}</p>
              <p>{"\\(2+2 = 4\\)"}</p>
              <p>
                In this example, we used the reciprocal identities to simplify
                the original equation into a much simpler form. This is
                particularly useful in trigonometry, calculus, and physics
                problems where simplification can make it easier to solve
                equations or understand relationships.
              </p>
            </div>
          </div>
        </div>
      ) : props.currentSection == 7 ? (
        <div>
          <div>
            <h2>Practice</h2>
            <p>Select which Identity is true from the below options:</p>
            <div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 1 ? styles.selected : ""
                }`}
                onClick={() => handleClick(1, false)}
              >
                {
                  "\\(\\frac{\\sin\\theta}{\\cos{\\theta}}\\equiv\\sin\\theta\\)"
                }
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 2 ? styles.selected : ""
                }`}
                onClick={() => handleClick(2, true)}
              >
                {
                  "\\(\\frac{\\cos\\theta}{\\sin{\\theta}}\\equiv\\tan\\theta\\)"
                }
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 3 ? styles.selected : ""
                }`}
                onClick={() => handleClick(3, false)}
              >
                {
                  "\\(\\frac{\\sin\\theta}{\\cos{\\theta}}\\equiv\\tan\\theta\\)"
                }
              </div>
            </div>
            {correctAnswerValue ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}
          </div>
        </div>
      ) : props.currentSection == 8 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Advanced: Trigonometric Equations</h2>
            <div>
              <p>
                Trigonometric equations are mathematical expressions that
                involve trigonometric functions like sine, cosine, tangent, and
                their reciprocals and inverses. Solving these equations often
                requires finding the angles that make the equation true.
              </p>
              <p>
                Trigonometric equations can often have multiple answers due to
                the fact that they are repetitive waves by nature, so generally
                trigonometric equations will have an answer boundary. Such as{" "}
                {"0 < x < 2pi"}.
              </p>
              <p>An exmaple equation could look like this:</p>
              <p>{"\\(\\sin x = 0.1, 0^\\circ \\leq x \\lt 360^\\circ \\)"}</p>
              <p>
                To work out the above equation you can use the inverse function
                of sin to find x between the boundary.
              </p>
              <p>{"\\(x = \\sin^{-1} 0.1 = 5.74^\\circ \\)"}</p>
              <p>{"\\(x = 180 - 5.74 = 174.26^\\circ\\)"}</p>
              <p>
                You would take the first answer from 180 to get the second
                answer due to the fact that 5.74 away from 180 on the graph.
              </p>
            </div>
          </div>
        </div>
      ) : props.currentSection == 9 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Advanced: Inverse Trigonometric Equations</h2>
            <p>
              Inverse trigonometric equations feature inverse trigonometric
              functions like {"\\(\\sin^{-1} x \\)"}, {"\\(\\cos^{-1} x \\)"}{" "}
              and {"\\(\\tan^{-1} x \\)"}. These functions are designed to find
              the angle associated with a known trigonometric ratio. Unlike
              standard trigonometric equations, which may have multiple
              solutions due to periodicity, inverse trigonometric equations
              usually yield a single or a limited set of solutions because the
              functions are restricted to specific domains and ranges to
              maintain a one-to-one relationship between angles and ratios.
            </p>
            <p>
              For instance, let&apos;s consider a real-world example involving the
              height of a ramp. Imagine you have a ramp that rises 3 meters for
              every 5 meters of horizontal distance. If you want to find the
              angle of inclination &#952; of the ramp, you would use the tangent
              function, {"\\(\\tan \\theta = \\frac{3}{4} \\)"}. To find &#952;,
              you&apos;ll need to use the inverse tangent function:{" "}
              {"\\(\\theta = \\tan^{-1}(\\frac{3}{5}) \\)"}. By solving this
              equation, you find that &#952; is approximately 0.5404 radians.
              Unlike with standard trigonometric functions, where you might have
              multiple angle solutions that make the equation true, the inverse
              tangent function gives you a unique angle within its defined range
              of {"\\(-\\frac{\\pi}{2}\\)"} to {"\\(\\frac{\\pi}{2}\\)"}.
            </p>
          </div>
        </div>
      ) : props.currentSection == 10 ? (
        <div>          <div className={styles["text-content"]}>
        <h2>Practice Questions</h2>
        <ol>
        {questions.map((q, index) => (
          <QuestionElement
            key={index}
            questionNumber={index}
            currentSection={props.currentSection}
            question={q.question}
            answersArray={q.answersArray}
            questionIndex={index}
            parentCallback={handleQuestionCallback}
          />
        ))}
        </ol>
      </div></div>
      ) : props.currentSection == 11 ? (
        <div style={{display: 'block'}}>
        <div className={styles["text-content"]}>

          {
            isLoading ? <LoadingIcon /> : 
            <div className={styles['review-container']}>
              <div className={styles['review-text']}>
                <div>
                  <h3>Final Questions</h3>
                  <div className={styles['review-questions-completed']}>
                    {
                      userCourseData.questionsCompleted?.length > 0 ? userCourseData.questionsCompleted.map((e, i) => (
                        <div  key={i}> 
                          {e.isCorrect ? <BsFillCheckCircleFill color="#50C878" size={'2em'} /> : <BsFillXCircleFill color="#FF5733" size={'2em'} />}
                        </div>  
                      )) : <div>Not completed</div>
                    }
                    
                  </div>
                </div>
                <div>
                  <h3>Standard sections:</h3>
                  <div className={styles['review-standard-container']}>
                  {
                      userCourseData.standardQuestions?.length > 0 ? userCourseData.standardQuestions.sort((a, b) => a.section - b.section).map((e, i) => (
                        <div style={{margin:'0 10px'}} key={i}> 
                          <p>Section <strong>{e.section}</strong> </p>
                          <div>{e.isCorrect ? <BsFillCheckCircleFill color="#50C878" size={'2em'} /> : <BsFillXCircleFill color="#FF5733" size={'2em'} />}</div>
                        </div>  
                      )) : <div>Not completed</div>
                    }
                    
                  </div>
                </div>
              </div>
              <div>
                <ol className={styles['course-item-list']} type="number">
              {list.map((l, i) => (
                <li
                onClick={() => props.setCurrentSection(i + 1)}
                  data-content={checkSections(i+1)}
                  data-done={checkSections(i+1) === '\u2713' ? 'true' : 'false'}
                  key={i}
                >
                  {l}
                </li>
                
              ))}
              
            </ol>
              </div>
              
            </div>
          }
        </div>
      </div>
      ) : (
        <div>final</div>
      )}
    </>
  );

}