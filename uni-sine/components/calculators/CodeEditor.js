import React, { useState, useEffect } from "react";
import styles from "../../styles/Calculators.module.css";
import startCheckout from "../page-construction/StartCheckout";
import LoadingIcon from "../page-construction/LoadingIcon";
import CodeEditor from "../page-construction/CodeEditor";
const BindingEnergy = (props) => {


  return (
    <>

          <div
            className={styles["container"]}
          >
            <h1>Code Editor</h1>
            <CodeEditor />

          </div>
        </>
  );
};

export default BindingEnergy;
