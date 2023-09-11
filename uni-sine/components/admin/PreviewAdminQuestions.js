import styles from "../../styles/Questions.module.css";
import Trig from '../dynamic-media/Trig'
import Graph from '../dynamic-media/Graph'
import Vector from '../dynamic-media/Vector'
import React, { useState, useEffect, useRef } from "react";
import MathJaxContent from "../page-construction/MathJaxContent";



export default function PreviewAdminQuestions(props) {

    return (
        <div className={`${styles['calculator-content-container']} ${styles['preview-container']}`}>
            <div className={styles["questions-top"]}>
              <p>
                Math:{" "}
                <strong>
                  1/1
                </strong>
              </p>
              <p>
                Difficulty:{" "}
                <span
                  style={
                    props.difficulty == "easy"
                      ? { color: "green" }
                      : props.difficulty == "medium"
                      ? { color: "orange" }
                      : { color: "red" }
                  }
                >
                  <strong>{props.difficulty}</strong>
                </span>
              </p>
              <p>
                Session Time: <strong>00:00</strong>
              </p>
            </div>
                <div className={styles["questions-body-container"]}>
                      <div>
                        <div className={styles["questions-content"]}>
                          <p>{props.newQuestion}</p>
                          {props.requiresMedia ? (
                            <>
                             {props.requiresMedia &&
                          props.mediaType ==
                            "equation" ? (
                            <>
                              <MathJaxContent
                                content={`$$ ${props.equation} $$`}
                              />
                            </>
                          ) : props.mediaType ==
                            "trig" ? (
                            <>

                              <Trig
                                {...{
                                  sideA: parseFloat(
                                    props.trigSides
                                      .sideA
                                  ),
                                  sideB: parseFloat(
                                    props.trigSides
                                      .sideB
                                  ),
                                  sideC: parseFloat(
                                    props.trigSides
                                      .sideC
                                  ),
                                  showSidea:
                                    props.showTrigValues.sideA,
                                  showSideb:
                                    props.showTrigValues.sideB,
                                  showSidec:
                                    props.showTrigValues.sideC,
                                  showAngleA:
                                    props.showTrigValues.angleA,
                                  showAngleB:
                                    props.showTrigValues.angleB,
                                  showAngleC:
                                    props.showTrigValues.angleC,
                                  hidea:
                                    props.hideTrigValues.hideSideA ,
                                  hideb:
                                    props.hideTrigValues.hideSideB ,
                                  hidec:
                                    props.hideTrigValues.hideSideC ,
                                  hideA:
                                    props.hideTrigValues.hideAnlgeA ,
                                  hideB:
                                    props.hideTrigValues.hideAnlgeB ,
                                  hideC:
                                    props.hideTrigValues.hideAnlgeC ,
                                }}
                              />
                            </>
                          ) : props.mediaType ==
                            "graph" ? (
                            <>
                              <Graph
                                {...{
                                  equation:
                                    props.graphEquation,
                                }}
                              />
                            </>
                          ) : props.mediaType ==
                            "vector" ? (
                            <>
                              <Vector
                                {...{
                                  mag: props.vector.mag,
                                  dir: props.vector.dir,
                                }}
                              />
                            </>
                            ) : null}</>
                          ) : null}
                         
                        </div>
                        <ul
                          id="questions-answer-list"
                          className={styles["questions-answer-list"]}
                        >
                          <li >
                            <input
                              type="radio"
                              id="answer1"
                              name="answer"
                              value="answer1"
                            />

                            <label
                              className={styles["mjx-styling"]}
                              htmlFor="answer1"
                            >
                              {props.isAnswersEquation ? (
                                <MathJaxContent
                                  content={`$$ ${props.correctAnswer} $$`}
                                />
                              ) : (
                                props.correctAnswer
                              )}
                            </label>
                          </li>
                          <li >
                            <input
                              type="radio"
                              id="answer2"
                              name="answer"
                              value="answer2"
                            />
                            <label
                              className={styles["mjx-styling"]}
                              htmlFor="answer2"
                            >
                              {props.isAnswersEquation ? (
                                <MathJaxContent
                                  content={`$$ ${props.wrongAnswer1} $$`}
                                />
                              ) : (
                                props.wrongAnswer1
                              )}
                            </label>
                          </li>
                          <li >
                            <input
                              type="radio"
                              id="answer3"
                              name="answer"
                              value="answer3"
                            />
                            <label
                              className={styles["mjx-styling"]}
                              htmlFor="answer3"
                            >
                              {props.isAnswersEquation ? (
                                <MathJaxContent
                                  content={`$$ ${props.wrongAnswer2} $$`}
                                />
                              ) : (
                                props.wrongAnswer2
                              )}
                            </label>
                          </li>
                          <li >
                            <input
                              type="radio"
                              id="answer4"
                              name="answer"
                              value="answer4"
                            />
                            <label
                              className={styles["mjx-styling"]}
                              htmlFor="answer4"
                            >
                              {props.isAnswersEquation ? (
                                <MathJaxContent
                                  content={`$$ ${props.wrongAnswer3} $$`}
                                />
                              ) : (
                                props.wrongAnswer3
                              )}
                            </label>
                          </li>
                        </ul>
                      </div>

                    </div>

        </div>
    )
}