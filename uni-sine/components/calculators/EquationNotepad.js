import React, { useState, useEffect } from "react";
import styles from "../../styles/Calculators.module.css";
import MathJaxContent from "../page-construction/MathJaxContent";
import * as math from "mathjs";
const EquationNotepad = (props) => {
  const [equation, setEquation] = useState(""); 
  const [equationList, setEquationList] = useState([])
  const convertToLatex = (equation) => {
    try {
      return math
        .parse(equation)
        .toTex({ parenthesis: "keep", implicit: "hide" });
    } catch (err) {
      return "";
    }
  };

  const addEquation = () => {
    if(!equation) return
    setEquationList([...equationList, equation])
    setEquation("")
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addEquation();
    }
  }
  const removeEquation = (index) => {
    const newEquations = equationList.filter((_, i) => i !== index);
    setEquationList(newEquations);
  };
  return (
    <>
      <div className={styles["equation-notepad"]}>
        <div className={styles["equation-inputs"]}>
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Enter equation here, e.g: x^2"
            onKeyDown={handleKeyDown}
            maxLength={100}
          />
          <button onClick={addEquation}>+</button>
        </div>

        {
          equationList.map((v, i) => (
          <div key={i} className={styles['equation-list']}>
            <MathJaxContent key={i} content={`$$ ${v} $$`} />
            <button onClick={() => removeEquation(i)}>x</button>
          </div>

          ))
        }
        <MathJaxContent content={`$$ ${equation} $$`} />

      </div>
    </>
  );
};

export default EquationNotepad;
