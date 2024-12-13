import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import styles from '../../styles/Programming.module.css'
import CodeBlock from '../../components/page-construction/CodeBlock'
import CodeEditor from "../../components/page-construction/CodeEditor";
import Checkmark from "../../components/icons/Checkmark";
import Cross from "../../components/icons/Cross";
import BuyPremiumModal from "../../components/page-construction/PremiumModal";
import React, { useState, useEffect, useRef } from "react"
import Head from "next/head";
import LoadingIcon from "../../components/page-construction/LoadingIcon"
import { debounce } from 'lodash';
import { useUserContext } from "../../contexts/UserContext";

function Problem(props) {

    const { user, isLoading } = useUserContext();
    const buyPremiumModalRef = useRef();
    const childRef = useRef();

    const [resultsContent, setResultsContent] = useState(null);
    useEffect(() => {
      if (!isLoading && user && !user?.app_metadata?.is_premium && buyPremiumModalRef.current) {
        buyPremiumModalRef.current.openModal();
      }
    }, [isLoading, user]); 
  
    if(isLoading) return <LoadingIcon />;
    if (!user || (!user?.app_metadata?.is_premium)) {
        return (
          <BuyPremiumModal
            user={user}
            showOverlay={true}
            ref={buyPremiumModalRef}
          />
        );
      }


      const validateCode = async () => {
        const code = childRef.current.getCode();
        const output = await childRef.current.getOutput();
        setResultsContent(null);
      
        let checkFunctionName = /printDate/gm.test(code.JS);
        let checkForISOString = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/.test(output[0]);
        let checkForHardCode = !/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(code.JS);
      
        // An array of checks and their respective components to display
        const checks = [
          { 
            result: output.length === 1, 
            message: (<>Only one function can be used with only one expected output.</>)
          },
          { 
            result: checkFunctionName, 
            message: (<>Function name must be: <code>printDate</code>.</>)
          },
          { 
            result: checkForISOString, 
            message: (<>Function should log the date in the following format: <code>yyyy-MM-ddTHH:mm:ss.sssZ</code>.</>)
          },
          { 
            result: checkForHardCode && checkForISOString, 
            message: (<>Function must get the current date using existing pre-built functions and not be hardcoded.</>)
          }
        ];

        for (let i = 0; i < checks.length; i++) {
          const check = checks[i];
          const element = (
            <p 
              key={Math.random()} 
              style={{ animationDelay: `${0.0001 * i}s` }} 
              className={`${styles['fadeIn']} ${check.result ? styles['correct-axiom'] : styles['incorrect-axiom']}`}
            >
              {check.result ? <Checkmark key={Math.random()} /> : <Cross key={i} />} {check.message}
            </p>
          );
      
          setResultsContent(prev => (
            <div>{prev ? [...prev.props.children, element] : [element]}</div>
          ));
      
          
          // Wait before rendering the next element
          await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        }
        if(checks.every(e => e.result)){
          try {
            const saveToUserResponse = await fetch(`/api/db/postUserProgrammingData`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                programmingData: {
                  courseName: "functions-1"
                },
              }),
            });
            if (saveToUserResponse.status === 200) {
              return true;
            } else {
              const errorData = await saveToUserResponse.json();
              const errorMessage =
                errorData.message || saveToUserResponse.statusText;
              return console.error( 
                `Error saving to user ${saveToUserResponse.status}: ${errorMessage}`
              );
            }
          } catch (error) {
            console.error("Unexpected error:", error);
          }
        
      }

      };
      const debouncedValidateCode = debounce(validateCode, 500);

  return (
    <div className={styles['programming-container']}>
      <Head>
      </Head>
      <div className={styles['activity']}>
        <div className={styles['info-panel']}>
          <div className={styles['task-info']}>
              <i><h1>Problem 1</h1></i>
              <h3>Create a function to console log the current date in ISO format.</h3>
              <p>You are tasked to create a function based on the properties below and to log the current date to the browser.</p>
              <ul>
                  <li>Only one function can be used with only one expected output.</li>
                  <li>Function name must be: <code>printDate</code>.</li>
                  <li>Function should log the date in the following format: <code>yyyy-MM-ddTHH:mm:ss.sssZ</code>.</li>
                  <li>Function must get the current date using existing pre-built functions and not be hardcoded.</li>

              </ul>
              <h4>Expected result:</h4>
          </div>
          <div className={styles['example-code']}>

              <CodeBlock language="yaml" code={`# result:\n${(new Date()).toISOString()}`} showCopy={false}/>

          </div>
          </div>
          <div className={styles['coding-panel']}>
            <div>
            <CodeEditor ref={childRef} hidePreview={true} initialView={"JS"} hideOptions={false} executable={true}/>
            </div>
          </div>
      </div>
      <div className={styles['result']}>
        <button className={styles['check-code-btn']} onClick={debouncedValidateCode}>Check Code</button>
          {resultsContent}
      </div>
    </div>
  );
}

export default withPageAuthRequired(Problem);
